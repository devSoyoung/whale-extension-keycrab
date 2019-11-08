(function () {
    // 키워드 찾기
    const currentKeyword = document.querySelector('#nx_query').value;

    // 검색 결과에 이벤트 리스너 달기
    const kinResultEls = document.querySelectorAll(`div.kinn.section ul.type01>li`);
    kinResultEls.forEach(searchResultEl => {
        kinElementEventBinder('kin', searchResultEl, currentKeyword);
    });
})();