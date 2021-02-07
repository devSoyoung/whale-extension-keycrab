function newsElementEventBinder(searchResultEl, currentKeyword) {
    const titleEl = searchResultEl.querySelector('dt');
    const { title } = titleEl.querySelector('a');
    const thumbnailEl = searchResultEl.querySelector('.thumb') || undefined;
    const relationListEl = searchResultEl.querySelector('.relation_lst') || undefined;

    if (titleEl) titleHandler(titleEl, title, currentKeyword);
    if (thumbnailEl) thumbnailHandler(thumbnailEl, title, currentKeyword);
    if (relationListEl) listHandler(relationListEl, currentKeyword);
}
// 각 엘리먼트 있으면 안에 리스너 등록해주는 함수
function titleHandler (titleEl, title, currentKeyword) {
    const { href } = titleEl.querySelector('a');
    titleEl.addEventListener('click', () => {
        if (!window.isTracking) return;
        window.sendMessageForAddLink(currentKeyword, getResultForm('news', title, href));
    });
}
function thumbnailHandler (thumbnailEl, title, currentKeyword) {
    const { href } = thumbnailEl.querySelector('a');
    thumbnailEl.addEventListener('click', () => {
        if (!window.isTracking) return;
        window.sendMessageForAddLink(currentKeyword, getResultForm('news', title, href));
    });
}

function listHandler (relationListEl, currentKeyword) {
    const listEls = relationListEl.querySelectorAll('li');
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
