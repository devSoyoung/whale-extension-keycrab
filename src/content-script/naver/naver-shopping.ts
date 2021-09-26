import { getResultForm } from '../common';

export default function shoppingElementEventBinder(
  origin,
  searchResultEl,
  currentKeyword
) {
  const titleEl = searchResultEl.querySelector('.product_info a.title');
  const thumbnailEl = searchResultEl.querySelector('.thumb') || undefined;

  const title = titleEl.innerText;
  const { href } = titleEl;
  const result = getResultForm(origin, title, href);

  function onClickItem() {
    if (!window.isTracking) return;
    window.sendMessageForAddLink(currentKeyword, result);
  }

  if (titleEl) titleEl.addEventListener('click', onClickItem);
  if (thumbnailEl) thumbnailEl.addEventListener('click', onClickItem);
}
