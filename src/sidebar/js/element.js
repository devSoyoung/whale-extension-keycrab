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

function onClickTrashIcon(keywordLiEl) {
  // 삭제 구현
}

window.getKeywordItemHTML = (keywordName, keywordInfo) => {
  const keywordLiEl = document.createElement('li');
  keywordLiEl.className = 'keyword-item';
  keywordLiEl.innerHTML = `
     <i class="far fa-star star-icon grey"></i>
     <div class="keyword-item-content">
       <div class="keyword-title">${keywordName}</div>
       <div class="util-icon">
         <i class="far fa-trash-alt grey trash-icon"></i>
         <i class="fas fa-chevron-down grey fold-icon" style="margin-left: 5px;"></i>
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
  onClickTrashIcon(keywordLiEl);

  return keywordLiEl;
};

