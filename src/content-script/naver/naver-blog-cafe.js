export default function elementEventBinder(origin, searchResultEl, currentKeyword) {
    const titleEl = searchResultEl.querySelector('dt');
    const thumbnailEl = searchResultEl.querySelector('.thumb') || undefined;
    const urlEl = searchResultEl.querySelector('.url') || undefined;

    const title = titleEl.querySelector('a').title
        || titleEl.querySelector('a').innerText;
    const { href } = urlEl;
    const result = getResultForm(origin, title, href);

    function onClickItem() {
        if (!window.isTracking) return;
        window.sendMessageForAddLink(currentKeyword, result);
    }

    if (titleEl) titleEl.addEventListener('click', onClickItem);
    if (thumbnailEl) thumbnailEl.addEventListener('click', onClickItem);
    if (urlEl) urlEl.addEventListener('click', onClickItem);
}
