import { getResultForm } from '../common';

export default function kinElementEventBinder(
  origin,
  searchResultEl,
  currentKeyword
) {
  const titleEl = searchResultEl.querySelector(
    '.question_area .question_group a'
  );
  const answerEl = searchResultEl.querySelector('.answer_area .answer_group a');

  const { href, innerText: title } = titleEl;
  const result = getResultForm(origin, title, href);

  function onClickItem() {
    if (!window.isTracking) return;
    window.sendMessageForAddLink(currentKeyword, result);
  }

  if (titleEl) titleEl.addEventListener('click', onClickItem);
  if (answerEl) answerEl.addEventListener('click', onClickItem);
}
