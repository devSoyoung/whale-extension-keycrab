import elementEventBinder from './naver-blog-cafe';
import kinElementEventBinder from './naver-kin';
import newsElementEventBinder from './naver-news';
import shoppingElementEventBinder from './naver-shopping';
import videoElementEventBinder from './naver-video';

// sp_nshop : 네이버 쇼핑
// sp_nnews : 네이버 뉴스
// sp_nreview : 네이버 뷰
// sp_nkin : 네이버 지식인
// sp_ncafe : 네이버 카페
// sp_ncafe_used : 네이버 카페
// sp_ntotal : 네이버 전체 검색결과???
// sp_nbook : 네이버 책
// sp_nsite : ??
// sp_nvideo : 비디오

(function () {
  const currentKeywordEl: HTMLInputElement = document.querySelector(
    '#nx_query'
  );
  const { value: currentKeyword = '' } = currentKeywordEl;

  // 뉴스
  const newsSectionEl = document.querySelector('#main_pack>section.sp_nnews');
  if (newsSectionEl) {
    const searchResultEls = newsSectionEl.querySelectorAll('ul.list_news>li');
    searchResultEls.forEach((searchResultEl: HTMLLIElement) => {
      newsElementEventBinder(searchResultEl, currentKeyword);
    });
  }
  // 비디오
  const videoResultEls = document.querySelectorAll(`section.sp_nvideo ul li`);
  videoResultEls?.forEach((searchResultEl) => {
    videoElementEventBinder('video', searchResultEl, currentKeyword);
  });

  // 블로그
  const blogResultEls = document.querySelectorAll(`section.sp_nblog ul li`);
  blogResultEls?.forEach((searchResultEl) => {
    elementEventBinder('blog', searchResultEl, currentKeyword);
  });

  // 카페
  const cafeResultEls = document.querySelectorAll(`section.sp_ncafe ul li`);
  cafeResultEls?.forEach((searchResultEl) => {
    elementEventBinder('cafe', searchResultEl, currentKeyword);
  });

  // 쇼핑
  const shoppingResultEls = document.querySelectorAll(`section.sp_nshop ul li`);
  shoppingResultEls?.forEach((searchResultEl) => {
    shoppingElementEventBinder('shopping', searchResultEl, currentKeyword);
  });

  // 지식인
  const kinResultEls = document.querySelectorAll(`section.sp_nkin ul li`);
  kinResultEls.forEach((searchResultEl) => {
    kinElementEventBinder('kin', searchResultEl, currentKeyword);
  });

  // view
  const viewResultEls = document.querySelectorAll(`section.sp_nreview ul li`);
  viewResultEls.forEach((searchResultEl) => {
    elementEventBinder('view', searchResultEl, currentKeyword);
  });
})();
