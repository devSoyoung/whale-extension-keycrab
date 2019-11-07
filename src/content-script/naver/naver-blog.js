(function () {
  // 키워드 찾기
  const currentKeyword = document.querySelector('#nx_query').value;

  // 검색 결과에 이벤트 리스너 달기
  const searchResultEls = document.querySelectorAll('#elThumbnailResultArea li');
  searchResultEls.forEach(searchResultEl => {
    const { title } = searchResultEl.querySelector('.sh_blog_title');
    const { href } = searchResultEl.querySelector('.url');
    const result = { favorite: false, origin: 'blog', title: title, url: href };

    function onClickItem() {
      if (!window.isTracking) return;
      window.sendMessageForAddLink(currentKeyword, result);
    }

    searchResultEl.addEventListener('click', onClickItem);
  });
})();
