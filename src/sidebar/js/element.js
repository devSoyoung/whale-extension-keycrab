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

    const linkListEl = keywordLiEl.querySelector('.link-list');
    console.log(linkListEl);
    linkListEl.classList.toggle('display-none');
  });
}

function onClickPinIcon(keywordLiEl) {
  const fixedPinEl = keywordLiEl.querySelector('.pin-fixed');
  const unfixedPinEl = keywordLiEl.querySelector('.pin-unfixed');

  if(!fixedPinEl || !unfixedPinEl) {
    return;
  }

  // TODO: favorite 설정 관련 API 추가
  // 메세지 전달 후 storage의 onchange 감지로 바꾸기
  fixedPinEl.addEventListener('click', () => {
    fixedPinEl.classList.toggle('display-none');
    unfixedPinEl.classList.toggle('display-none');
    // favorite true > false
  })
  unfixedPinEl.addEventListener('click', () => {
    fixedPinEl.classList.toggle('display-none');
    unfixedPinEl.classList.toggle('display-none');
    // favorite false > true
  })
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

function getLinkLiEl(linkItem) {
  return  `
    <li>
        <div class="pin-icon">
            <img src="../../../images/icons/pin_fixed2.png" class="pin-fixed display-none" alt="고정된 핀">
            <img src="../../../images/icons/pin_unfixed.png" class="pin-unfixed" alt="고정된 핀">
        </div>
        <div class="link-origin">${getOriginName(linkItem.origin)}</div>
        <a target="_blank" href=${linkItem.url}>
            <div class="link-url">${linkItem.title}</div>
        </a>
    </li>
`
}

function getKeywordItemEl(keywordName, keywordInfo) {
  const keywordLiEl = document.createElement('li');
  keywordLiEl.className = 'keyword-item';
  keywordLiEl.id = keywordName;
  keywordLiEl.setAttribute('keyword', keywordName);

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
         ${keywordInfo ? keywordInfo.link.map(linkItem => (
          getLinkLiEl(linkItem)
        )).join('') : ''}
       </ul>
     </div>
  `;

  onClickStarIcon(keywordLiEl);
  onclickFoldIcon(keywordLiEl);
  onClickTrashIcon(keywordLiEl, keywordName);
  onClickPinIcon(keywordLiEl);

  return keywordLiEl;
}

function addLinkLiElToList(keywordContent) {
  const keywordEl = document.body.querySelector(`.keyword-item[keyword="${keywordContent.keyword}"]`);
  console.log('keywordEl:', keywordEl);
  const linkLiEl = document.createElement('li');

  linkLiEl.innerHTML = `${getLinkLiEl(keywordContent.link)}`;

  onClickPinIcon(linkLiEl);

  const linkListEl = keywordEl.querySelector('.link-list');

  if(!linkListEl.childElementCount) {
    linkListEl.appendChild(linkLiEl); // 아직 저장된 키워드가 없을 경우
  } else {
    linkListEl.insertBefore(linkLiEl, linkListEl.firstChild); // 이미 자식 있는 경우 -> 맨첫번째 노드로 정렬
  }
}

