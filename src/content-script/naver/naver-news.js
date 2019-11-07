(function () {
    const currentKeyword = document.querySelector('#nx_query').value;
    // 검색 결과에 이벤트 리스너 달기
    const searchResultEls = document.querySelectorAll('ul.type01>li');
    searchResultEls.forEach(searchResultEl => {
        const titleEl = searchResultEl.querySelector('dt');
        const title = titleEl.querySelector('a').title;
        const thumbnailEl = searchResultEl.querySelector('.thumb') || undefined;
        const relationListEl = searchResultEl.querySelector('.relation_lst') || undefined;

        if (titleEl) titleHandler(titleEl, title);
        if (thumbnailEl) thumbnailHandler(thumbnailEl, title);
        if (relationListEl) listHandler(relationListEl);
    });

    // 각 엘리먼트 있으면 안에 리스너 등록해주는 함수
    function titleHandler (titleEl, title) {
        const { href } = titleEl.querySelector('a');
        titleEl.addEventListener('click', () => {
            if (!window.isTracking) return;
            window.sendMessageForAddLink(currentKeyword, getResultForm('news', title, href));
        });
    }
    function thumbnailHandler (thumbnailEl, title) {
        const { href } = thumbnailEl.querySelector('a');
        thumbnailEl.addEventListener('click', () => {
            if (!window.isTracking) return;
            window.sendMessageForAddLink(currentKeyword, getResultForm('news', title, href));
        });
    }

    function listHandler (relationListEl) {
        const listEls = relationListEl.querySelectorAll('li');
        console.log(listEls);
        listEls.forEach(listEl => {
            const listTitleLink = listEl.querySelector('a');
            const title = listTitleLink.title;
            listEl.querySelectorAll('a').forEach(anchorEl => {
                const { href } = anchorEl;
                anchorEl.addEventListener('click', () => {
                    if(!window.isTracking) return;
                    window.sendMessageForAddLink(currentKeyword, getResultForm('news', title, href));
                });
            })
        });
    }

    function getResultForm(origin, title, url) {
        return {
            favorite: false,
            origin: origin,
            title: title,
            url: url
        }
    }
})();
