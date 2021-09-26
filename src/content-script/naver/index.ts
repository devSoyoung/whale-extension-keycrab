import elementEventBinder from './naver-blog-cafe.js';
import kinElementEventBinder from './naver-kin.js';
import newsElementEventBinder from './naver-news';
import postElementEventBinder from './naver-post.js';
import shoppingElementEventBinder from './naver-shopping';
import videoElementEventBinder from './naver-video.js';

// sp_nshop : 네이버 쇼핑
// sp_nnews : 네이버 뉴스
// sp_nreview : 네이버 뷰
// sp_nkin : 네이버 지식인
// sp_ncafe : 네이버 카페
// sp_ncafe_used : 네이버 카페
// sp_ntotal : 네이버 전체 검색결과???
// sp_nbook : 네이버 책

(function () {
  const classList = [...document.body.classList];

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

  // // 웹사이트
  // if (classList.includes('tabsch_website')) {
  //   const currentKeyword = document.querySelector('#nx_query').value;
  //   const webResultEls = document.querySelectorAll(`div.sp_website.section ul.type01>li`);
  //   webResultEls.forEach(searchResultEl => {
  //     kinElementEventBinder('website', searchResultEl, currentKeyword);
  //   });
  //   return;
  // }
  //
  // // 비디오
  // if (classList.includes('tabsch_video')) {
  //   const currentKeyword = document.querySelector('#nx_query').value;
  //   const videoResultEls = document.querySelectorAll(`div.sp_video.section ul>li`);
  //   videoResultEls.forEach(searchResultEl => {
  //     videoElementEventBinder('video',searchResultEl, currentKeyword);
  //   });
  //   return;
  // }
  //
  // // 이미지
  // if (classList.includes('tabsch_image')) {
  //   console.log('여기는 이미지 탭');
  //   return;
  // }
  //
  // // 블로그
  // if (classList.includes('tabsch_blog')) {
  //   const currentKeyword = document.querySelector('#nx_query').value;
  //   const blogResultEls = document.querySelectorAll(`div.blog.section ul.type01>li`);
  //   blogResultEls.forEach(searchResultEl => {
  //     elementEventBinder('blog',searchResultEl, currentKeyword);
  //   });
  //   return;
  // }
  //
  // // 지식인
  // if (classList.includes('tabsch_kin')) {
  //   const currentKeyword = document.querySelector('#nx_query').value;
  //   const kinResultEls = document.querySelectorAll(`div.kinn.section ul.type01>li`);
  //   kinResultEls.forEach(searchResultEl => {
  //     kinElementEventBinder('kin', searchResultEl, currentKeyword);
  //   });
  //   return;
  // }
  //
  // // 카페
  // if (classList.includes('tabsch_cafe')) {
  //   const currentKeyword = document.querySelector('#nx_query').value;
  //   const searchResultEls = document.querySelectorAll('#elThumbnailResultArea li');
  //   searchResultEls.forEach(searchResultEl => {
  //     elementEventBinder('cafe', searchResultEl, currentKeyword);
  //   });
  //   return;
  // }

  // // 통합검색
  // if (!classList.length) {
  //   // 키워드 찾기
  //   const currentKeyword = document.querySelector('#nx_query').value;
  //
  //   // 검색 결과에 이벤트 리스너 달기
  //   // 뉴스
  //   const newsResultEls = document.querySelectorAll(`div.news.section ul.type01>li`);
  //   newsResultEls.forEach(searchResultEl => {
  //     newsElementEventBinder(searchResultEl, currentKeyword);
  //   });
  //   // 블로그
  //   const blogResultEls = document.querySelectorAll(`div.blog.section ul.type01>li`);
  //   blogResultEls.forEach(searchResultEl => {
  //     elementEventBinder('blog',searchResultEl, currentKeyword);
  //   });
  // 쇼핑
  const shoppingResultEls = document.querySelectorAll(`section.sp_nshop ul li`);
  console.log('selected shopping');
  shoppingResultEls?.forEach((searchResultEl) => {
    shoppingElementEventBinder('shopping', searchResultEl, currentKeyword);
  });

  //   // 웹사이트
  //   const webResultEls = document.querySelectorAll(`div.sp_website.section ul.type01>li`);
  //   webResultEls.forEach(searchResultEl => {
  //     kinElementEventBinder('website', searchResultEl, currentKeyword);
  //   });
  //   // 카페
  //   const cafeResultEls = document.querySelectorAll(`div.cafe.section ul.type01>li`);
  //   cafeResultEls.forEach(searchResultEl => {
  //     elementEventBinder('cafe', searchResultEl, currentKeyword);
  //   });
  //   // 지식인
  //   const kinResultEls = document.querySelectorAll(`div.kinn.section ul.type01>li`);
  //   kinResultEls.forEach(searchResultEl => {
  //     kinElementEventBinder('kin', searchResultEl, currentKeyword);
  //   });
  //   // 포스트
  //   const postResultEls = document.querySelectorAll(`div.sp_post.section ul.type01>li`);
  //   postResultEls.forEach(searchResultEl => {
  //     postElementEventBinder('post', searchResultEl, currentKeyword);
  //   });
  //   // 뮤직
  //   // 동영상
  //   const videoResultEls = document.querySelectorAll(`div.sp_video.section ul>li`);
  //   videoResultEls.forEach(searchResultEl => {
  //     videoElementEventBinder('video',searchResultEl, currentKeyword);
  //   });
  // }
})();
