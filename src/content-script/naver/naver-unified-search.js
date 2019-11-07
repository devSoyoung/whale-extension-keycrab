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
    const blogResultEls = document.querySelectorAll(`div.blog.section ul.type01>li`);
    blogResultEls.forEach(searchResultEl => {
        elementEventBinder('blog',searchResultEl, currentKeyword);
    });
    // 쇼핑
    const shoppingResultEls = document.querySelectorAll(`div.sp_shop_default.section ul>li`);
    shoppingResultEls.forEach(searchResultEl => {
        shoppingElementEventBinder('shopping', searchResultEl, currentKeyword);
    });
    // 웹사이트
    // 카페
    const cafeResultEls = document.querySelectorAll(`div.cafe.section ul.type01>li`);
    cafeResultEls.forEach(searchResultEl => {
        elementEventBinder('cafe', searchResultEl, currentKeyword);
    });
    // 지식인
    const kinResultEls = document.querySelectorAll(`div.kinn.section ul.type01>li`);
    kinResultEls.forEach(searchResultEl => {
        kinElementEventBinder('kin', searchResultEl, currentKeyword);
    });
    // 포스트
    const postResultEls = document.querySelectorAll(`div.sp_post.section ul.type01>li`);
    postResultEls.forEach(searchResultEl => {
        postElementEventBinder('post', searchResultEl, currentKeyword);
    });
    // 뮤직
    // 동영상
    const videoResultEls = document.querySelectorAll(`div.sp_video.section ul>li`);
    videoResultEls.forEach(searchResultEl => {
        videoElementEventBinder('video',searchResultEl, currentKeyword);
    });
    // 이미지
})();
