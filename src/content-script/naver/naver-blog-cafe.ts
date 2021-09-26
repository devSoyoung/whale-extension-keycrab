import { getResultForm } from '../common';

export default function elementEventBinder(
  origin,
  searchResultEl,
  currentKeyword
) {
  const titleEl = searchResultEl.querySelector('.total_area>a');
  const thumbnailEl =
    searchResultEl.querySelector('.thumb_single') || undefined;

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
