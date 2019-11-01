const keywords = [{
  keyword: '사과',
  favoriteLink: [{ title: '사과 - 위키백과위키백과위키백과위키백과위위키백과', link: '#' }, { title: '사과 - 위키백과', link: '#' }],
  recentLink: [{ title: '사과2 - 위키백과', link: '#' }, { title: '사과2 - 위키백과', link: '#' }, { title: '사과2 - 위키백과', link: '#' }],
}, {
  keyword: '포도가 맛있는 곳',
  favoriteLink: [{ title: '집포도 - 위키백과', link: '#' }],
  recentLink: [{ title: '초록색 포도 - 위키백과', link: '#' }],
}];

(function() {
 const keywordItemsEl = document.querySelector('.keyword-items');
 keywords.forEach(keyword => {
   const keywordEl = getKeywordItemHTML(keyword);
   const result = keywordItemsEl.appendChild(keywordEl);
   result.querySelector('.keyword-item-show-more').addEventListener('click', window.onClickDownArrow);
 });
})();