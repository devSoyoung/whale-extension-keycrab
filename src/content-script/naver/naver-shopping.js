function shoppingElementEventBinder(origin, searchResultEl, currentKeyword) {
    const titleEl = searchResultEl.querySelector('.detail .tit');
    const thumbnailEl = searchResultEl.querySelector('.thumb_area') || undefined;

    const title = titleEl.querySelector('a').title
        || titleEl.querySelector('a').innerText;
    const { href } = titleEl.querySelector('a');
    const result = getResultForm(origin, title, href);

    function onClickItem() {
        if (!window.isTracking) return;
        window.sendMessageForAddLink(currentKeyword, result);
    }

    if (titleEl) titleEl.addEventListener('click', onClickItem);
    if (thumbnailEl) thumbnailEl.addEventListener('click', onClickItem);
}
