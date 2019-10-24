const keywords = [{
  keyword: '사과',
  favoriteLink: [{ title: '사과 - 위키백과', link: '#' }, { title: '사과 - 위키백과', link: '#' }],
  recentLink: [{ title: '사과2 - 위키백과', link: '#' }, { title: '사과2 - 위키백과', link: '#' }, { title: '사과2 - 위키백과', link: '#' }],
}, {
  keyword: '포도가 맛있는 곳',
  favoriteLink: [{ title: '집포도 - 위키백과', link: '#' }],
  recentLink: [{ title: '초록색 포도 - 위키백과', link: '#' }],
}];

function getRecentLinkHTML(title, link) {
  return `
    <li class="link-item">
      <a class="link-item-title" href=${link}>${title}</a>
      <div class="link-item-button">
        <button>삭제</button>
        <button>즐겨찾기</button>
      </div>
    </li>
  `;
}

function getKeywordItemHTML(keyword) {
  const liEl = document.createElement('li');
  liEl.className = 'keyword-item';
  liEl.innerHTML = `
       <div class="keyword-item-title">
         <span>${keyword.keyword}</span>
         <button class="keyword-item-delete">삭제</button>
         <img alt="naver-icon" class="keyword-item-search" src="../images/naver.png">
         <img alt="google-icon" class="keyword-item-search" src="../images/google.png">
         <img alt="youtube-icon" class="keyword-item-search" src="../images/youtube.png">
       </div>
       <h4 class="link-type-info">즐겨찾는 검색결과</h4>
       <ul class="link-favorite-items">
         ${keyword.favoriteLink.map(link => getRecentLinkHTML(link.title, link.link)).join('')}
       </ul>
       <h4 class="link-type-info" style="margin-top: 20px;">최근 방문한 검색결과</h4>
       <ul class="link-recent-items">
         ${keyword.recentLink.map(link => getRecentLinkHTML(link.title, link.link)).join('')}
       </ul>
     `;

  return liEl;
}

(function() {
 const keywordItemsEl = document.querySelector('.keyword-items');
 keywords.forEach(keyword => {
   const keywordEl = getKeywordItemHTML(keyword);
   keywordItemsEl.appendChild(keywordEl);
 });
})();