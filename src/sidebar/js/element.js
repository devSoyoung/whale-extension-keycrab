function getOriginName(type) {
  switch(type) {
    case 'total':
      return '통합검색';
    case 'blog':
      return '블로그';
    case 'cafe':
      return '카페';
    case 'google':
      return '구글';
    default:
      return '네이버';
  }
}

// 즐겨찾기 안한 별 : far fa-star grey
// 즐겨찾기 한 별 : fas fa-star yellow
function onClickStarIcon(keywordLiEl) {
  const starEl = keywordLiEl.querySelector('.star-icon');

  starEl.addEventListener('click', () => {
    starEl.classList.toggle('fas');
    starEl.classList.toggle('yellow');

    starEl.classList.toggle('grey');
    starEl.classList.toggle('far');
  })
}

// 아래화살표 : fa-chevron-down
// 위화살표 : fa-chevron-up
function onclickFoldIcon(keywordLiEl) {
  const foldEl = keywordLiEl.querySelector('.fold-icon');

  foldEl.addEventListener('click', () => {
    foldEl.classList.toggle('fa-chevron-down');
    foldEl.classList.toggle('fa-chevron-up');

    const linkListEl = foldEl.parentNode.parentNode.querySelector('.link-list');
    linkListEl.classList.toggle('display-none');
  });
}

function onClickTrashIcon(keywordLiEl,keywordName) {
  const trashEl = keywordLiEl.querySelector('.trash-icon');

  trashEl.addEventListener('click', () => {
    const confirmMessage = `${keywordName} 키워드를 삭제하시겠습니까?`;

    if(window.confirm(confirmMessage)) {
      keywordLiEl.remove();
      // TODO: storage 에서 삭제 구현 keywordName 보내
    }
  });
}

function getSearchButton(keywordName) {
  return `
    <ul class="search-platform">
      <a href="https://search.naver.com/search.naver?query=${keywordName}" target="_blank">
        <li class="naver-search">
          <img src="../../images/naver.png" alt="네이버로고">
            <span>네이버</span>
        </li>
      </a>
      <a href="https://www.google.com/search?q=${keywordName}" target="_blank">
        <li class="google-search">
          <img src="../../images/google.png" alt="구글로고">
          구글
        </li>
      </a>
      <a href="https://www.youtube.com/results?search_query=${keywordName}" target="_blank">
        <li class="youtube-search">
          <img src="../../images/youtube.png" alt="유튜로고">
          유튜브
        </li>
      </a>
    </ul>
  `;
}

window.getKeywordItemHTML = (keywordName, keywordInfo) => {
  const keywordLiEl = document.createElement('li');
  keywordLiEl.className = 'keyword-item';
  keywordLiEl.id = keywordName;

  keywordLiEl.innerHTML = `
     <i class="far fa-star star-icon grey"></i>
     <div class="keyword-item-content">
       <div class="keyword-title">${keywordName}</div>
       <div class="util-icon">
         <i class="far fa-trash-alt grey trash-icon"></i>
         <i class="fas fa-chevron-down grey fold-icon"></i>
       </div>
       ${getSearchButton(keywordName)}
       <ul class="link-list">
         ${keywordInfo.link.map(item => (
             `<li>
                <div class="link-origin">${getOriginName(item.origin)}</div>
                <div class="link-url">
                  <a target="_blank" href=${item.url}>${item.title}</a>
                </div>
             </li>`
          )).join('')}
       </ul>
     </div>
  `;

  onClickStarIcon(keywordLiEl);
  onclickFoldIcon(keywordLiEl);
  onClickTrashIcon(keywordLiEl,keywordName);

  return keywordLiEl;
};

// storage 변화 감지하여 사이드바 화면 업데이트
whale.runtime.onMessage.addListener((msg, sender, sendRes) => {
  if (msg.type === 'UPDATE_KEYWORDS') {
    // FIXME: 추가되는 키워드 찾는과정 필요
    // TODO: 길이 비교해서 추가되는 것만 추가되도록
    const newKeyword = '';
    addKeywordLiToList(newKeyword);
  }
  else if (msg.type === 'ADD_LINK_TO_KEYWORD') {
    // 키워드 아래 링크 추가되는 곳
    const keywordContent = msg.payload;
    addLinkLiElToList(keywordContent);
  }
});

function addKeywordLiToList(newKeyword) {
  const keywordListEl = document.body.querySelector('#keyword-items-list');

  const keywordLiEl = document.createElement('li');
  keywordLiEl.className = 'keyword-item';
  keywordLiEl.id = newKeyword;

  keywordLiEl.innerHTML = `
     <i class="far fa-star star-icon grey"></i>
     <div class="keyword-item-content">
       <div class="keyword-title">${newKeyword}</div>
       <div class="util-icon">
         <i class="far fa-trash-alt grey trash-icon"></i>
         <i class="fas fa-chevron-down grey fold-icon"></i>
       </div>
       ${getSearchButton(newKeyword)}
       <ul class="link-list">
       </ul>
     </div>
  `;

  onClickStarIcon(keywordLiEl);
  onclickFoldIcon(keywordLiEl);
  onClickTrashIcon(keywordLiEl,newKeyword);

  if(!keywordListEl.childElementCount) {
    // 아직 저장된 키워드가 없을 경우
    keywordListEl.appendChild(keywordLiEl);
  } else {
    // 이미 자식 있는 경우 -> 맨첫번째 노드로 정렬
    // TODO: 생각해보니 최신순일때만..? 최신순일땐 맨앞인데...ㅜㅜ
    keywordListEl.insertBefore(keywordLiEl, keywordListEl.firstChild);
  }
}

function addLinkLiElToList(keywordContent) {
    const keywordListEl = document.body.querySelector('#keyword-items-list');
    const keywordEl = keywordListEl.querySelector(`#${keywordContent.keyword}`);

    const linkLiEl = document.createElement('li');
    linkLiEl.innerHTML = `
        <div class="link-origin">${getOriginName(keywordContent.link.origin)}</div>
        <div class="link-url">
            <a target="_blank" href=${keywordContent.link.url}>${keywordContent.link.title}</a>
        </div>
    `;

    keywordEl.querySelector('.link-list').appendChild(linkLiEl);
}
