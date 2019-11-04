(function () {
  // 키워드 찾기
  window.isTracking = false;
  const currentKeyword = document.querySelector('#nx_query').value;

  // storage 에서 키워드 추적 여부를 가져와서 버튼 삽입
  whale.storage.sync.get([ 'keywords' ], function ({ keywords }) {
    if (!keywords || !keywords[currentKeyword]) {
      window.insertButton(currentKeyword, false);
      return;
    }

    window.isTracking = keywords[currentKeyword].tracking;
    window.insertButton(currentKeyword, isTracking);
  });

  // 검색 결과에 이벤트 리스너 달기
  const searchResultEls = document.querySelectorAll('#elThumbnailResultArea li');
  searchResultEls.forEach(searchResultEl => {
    const title = searchResultEl.querySelector('.sh_cafe_title').innerText;
    const { href } = searchResultEl.querySelector('.url');
    const result = { favorite: false, origin: 'cafe', title: title, url: href };

    function onClickItem() {
      if (!window.isTracking) return;
      window.sendMessageForAddLink(currentKeyword, result);
    }

    searchResultEl.addEventListener('click', onClickItem);
  });
})();
