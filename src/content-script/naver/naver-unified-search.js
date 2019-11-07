(function () {
    // 키워드 찾기
    const currentKeyword = document.querySelector('#nx_query').value;

    // 검색 결과에 이벤트 리스너 달기
    // 뉴스
    const newsResultEls = document.querySelectorAll(`div.news.section ul.type01>li`);
    newsResultEls.forEach(searchResultEl => {
        newsElementEventBinder(searchResultEl, currentKeyword);
    });
    // 블로그
    // 쇼핑
    // 웹사이트
    // 카페
    // 지식인
    // 포스트
    // 뮤직
    // 학술정보
    // 동영상
    // 이미지
})();
