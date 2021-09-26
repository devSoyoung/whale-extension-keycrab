import { getResultForm } from '../common';

export default function newsElementEventBinder(searchResultEl, currentKeyword) {
  const titleEl = searchResultEl.querySelector('a.news_tit');
  const { title } = titleEl;
  const thumbnailEl = searchResultEl.querySelector('.dsc_thumb');
  const relationListEl = searchResultEl.querySelector('.list_cluster');

  if (titleEl) titleHandler(titleEl, title, currentKeyword);
  if (thumbnailEl) thumbnailHandler(thumbnailEl, title, currentKeyword);
  if (relationListEl) listHandler(relationListEl, currentKeyword);
}
// 각 엘리먼트 있으면 안에 리스너 등록해주는 함수
function titleHandler(titleEl, title, currentKeyword) {
  const { href } = titleEl;
  titleEl.addEventListener('click', () => {
    if (!window.isTracking) return;
    window.sendMessageForAddLink(
      currentKeyword,
      getResultForm('news', title, href)
    );
  });
}
function thumbnailHandler(thumbnailEl, title, currentKeyword) {
  const { href } = thumbnailEl;
  thumbnailEl.addEventListener('click', () => {
    if (!window.isTracking) return;
    window.sendMessageForAddLink(
      currentKeyword,
      getResultForm('news', title, href)
    );
  });
}

function listHandler(relationListEl, currentKeyword) {
  const listEls = relationListEl.querySelectorAll('li');
  listEls.forEach((listEl) => {
    const linkEl = listEl.querySelector('a.sub_tit');
    const { title } = linkEl;

    linkEl?.addEventListener('click', () => {
      if (!window.isTracking) return;
      const { href: linkHref } = linkEl;

      window.sendMessageForAddLink(
        currentKeyword,
        getResultForm('news', title, linkHref)
      );
    });

    // 제목 옆에 네이버뉴스 로 클릭 시
    const naverLinkEl = listEl.querySelector('a.sub_txt');
    naverLinkEl?.addEventListener('click', () => {
      if (!window.isTracking) return;
      const { href: naverLinkHref } = linkEl;

      window.sendMessageForAddLink(
        currentKeyword,
        getResultForm('news', title, naverLinkHref)
      );
    });
  });
}
