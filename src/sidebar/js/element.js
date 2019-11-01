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

window.getKeywordItemHTML = (keywordName, keywordInfo) => {
  const liEl = document.createElement('li');
  liEl.className = 'keyword-item';
  liEl.innerHTML = `
     <i class="fas fa-star star-icon yellow"></i>
     <div class="keyword-item-content">
       <div class="keyword-title">${keywordName}</div>
       <div class="util-icon">
         <i class="far fa-trash-alt grey"></i>
         <i class="fas fa-chevron-down grey" style="margin-left: 5px;"></i>
       </div>
       ${getSearchButton(keywordName)}
       <ul class="link-list">
         ${keywordInfo.link.map(item => (
            `<li>
              <div class="link-origin">${getOriginName(item.origin)}</div>
              <a target="_blank" href=${item.url}>${item.title}</a>
            </li>`  
         )).join('')}
       </ul>
     </div>
  `;
  return liEl;
};
