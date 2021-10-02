import { Link } from '../../sidebar-react/type/keywords';

(() => {
  // 현재 구글은 통합검색에서만 지원하도록 구현
  const currentKeywordEl: HTMLInputElement = document.querySelector(
    '#searchform [aria-label="검색"]'
  );
  const { value: currentKeyword = '' } = currentKeywordEl;

  // 검색 결과에 이벤트 리스너 달기
  // 일반 검색 결과
  const normalSearchResultEls = document.querySelectorAll('#rso a h3');
  normalSearchResultEls.forEach((resultEl: HTMLHeadingElement) => {
    const title = resultEl.innerText;
    const { href } = resultEl.parentNode as HTMLAnchorElement;
    const result = getResultForm('google', title, href);

    resultEl.parentNode.addEventListener('click', () => {
      if (!window.isTracking) return;
      window.sendMessageForAddLink(currentKeyword, result);
    });
  });
  /**
   * @desc 구글의 카드 형태 검색 결과
   * @example 주요 뉴스 카드
   */
  const cardSearchResultEls = document.querySelectorAll('g-inner-card');
  cardSearchResultEls.forEach((resultEl) => {
    const titleEl: HTMLDivElement = resultEl.querySelector(
      'div[role = "heading"]'
    );
    if (!titleEl) return;

    const title = titleEl.innerText;
    const { href } = resultEl.querySelector('div a') as HTMLAnchorElement;
    const result = getResultForm('google', title, href);

    resultEl.addEventListener('click', () => {
      if (!window.isTracking) return;
      window.sendMessageForAddLink(currentKeyword, result);
    });
  });

  function getResultForm(origin, title, url): Link {
    return {
      favorite: false,
      origin: origin,
      title: title,
      url: url,
    };
  }
})();
