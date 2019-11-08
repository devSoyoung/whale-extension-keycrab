(function () {
    // 키워드 찾기
    const currentKeyword = document.querySelector('#nx_query').value;

    // 검색 결과에 이벤트 리스너 달기
    const webResultEls = document.querySelectorAll(`div.sp_website.section ul.type01>li`);
    webResultEls.forEach(searchResultEl => {
        kinElementEventBinder('kin', searchResultEl, currentKeyword);
    });
})();
