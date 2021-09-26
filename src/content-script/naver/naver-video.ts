import { getResultForm } from '../common';

export default function videoElementEventBinder(
  origin,
  searchResultEl,
  currentKeyword
) {
  const titleEl = searchResultEl.querySelector('a.info_title');
  const thumbnailEl = searchResultEl.querySelector('.thumb_area') || undefined;

  const title = titleEl?.querySelector('span').innerText;
  const { href } = titleEl;
  const result = getResultForm(origin, title, href);

  function onClickItem() {
    if (!window.isTracking) return;
    window.sendMessageForAddLink(currentKeyword, result);
  }

  if (titleEl) titleEl.addEventListener('click', onClickItem);
  if (thumbnailEl) thumbnailEl.addEventListener('click', onClickItem);
}
