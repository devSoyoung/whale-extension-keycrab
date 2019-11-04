(() => {
    // 현재 구글은 통합검색에서만 지원하도록 구현
    const isTabMenu = `${location.href}`.includes(`tbm`);
    if (isTabMenu) return;

    window.isTracking = false;
    const currentKeyword = document.querySelector('input[title = 검색]').value;

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
    // 일반 검색 결과
    const normalSearchResultEls = document.querySelectorAll('#rso a h3');
    normalSearchResultEls.forEach(resultEl => {
        const title = resultEl.innerText;
        const { href } = resultEl.parentNode;
        const result = getResultForm('google', title, href);

        resultEl.parentNode.addEventListener('click', () => {
            if (!window.isTracking) return;
            window.sendMessageForAddLink(currentKeyword, result);
        })
    });
    // 카드 검색 결과
    const cardSearchResultEls = document.querySelectorAll('g-inner-card');
    cardSearchResultEls.forEach( resultEl => {
        const titleEl = resultEl.querySelector('[role = "heading"]') || undefined;
        if (!titleEl) return;

        const title = titleEl.innerText;
        const { href } = resultEl.querySelector('div a');
        const result = getResultForm('google', title, href);

        resultEl.addEventListener('click', () => {
            if (!window.isTracking) return;
            window.sendMessageForAddLink(currentKeyword, result);
        })
    });

    function getResultForm(origin, title, url) {
        return {
            favorite: false,
            origin: origin,
            title: title,
            url: url
        }
    }
})();
