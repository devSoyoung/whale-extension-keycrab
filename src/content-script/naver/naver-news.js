(function () {
    const currentKeyword = document.querySelector('#nx_query').value;
    // 검색 결과에 이벤트 리스너 달기
    const searchResultEls = document.querySelectorAll('ul.type01>li');
    searchResultEls.forEach(searchResultEl => {
        newsElementEventBinder(searchResultEl, currentKeyword);
    });
})();
