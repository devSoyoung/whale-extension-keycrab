// const keywords = [ {
//   keyword: '사과',
//   favoriteLink: [ { title: '사과 - 위키백과위키백과위키백과위키백과위위키백과', link: '#' }, { title: '사과 - 위키백과', link: '#' } ],
//   recentLink: [ { title: '사과2 - 위키백과', link: '#' }, { title: '사과2 - 위키백과', link: '#' }, {
//     title: '사과2 - 위키백과',
//     link: '#'
//   } ],
// }, {
//   keyword: '포도가 맛있는 곳',
//   favoriteLink: [ { title: '집포도 - 위키백과', link: '#' } ],
//   recentLink: [ { title: '초록색 포도 - 위키백과', link: '#' } ],
// } ];

(function () {
  whale.storage.sync.get(['keywords'], ({ keywords }) => {
    if (!keywords) {
      // 스토리지 초기화 하기
      return;
    }
    const ulEl = document.querySelector('.keyword-items-list');
    [...Object.keys(keywords)].forEach(keywordName => {
      ulEl.appendChild(window.getKeywordItemHTML(keywordName, keywords[keywordName]));
    });

    // TODO: 이벤트 리스너 달기
  });

  // 검색창 onchange 핸들러 추가
  document.querySelector('.search-input').addEventListener('keypress', window.handleSearchKeyword);

  // storage 변화 감지하여 사이드바 화면 업데이트
  whale.runtime.onMessage.addListener((msg, sender, sendRes) => {
    // TODO: ID 띄어쓰기 있는 경우 수정하기 매우급함!
    const { type, payload } = msg;
    if (type === 'ADD_LINK_TO_KEYWORD') {
      // 키워드 아래 링크 추가되는 곳
      const keywordContent = msg.payload;
      addLinkLiElToList(keywordContent);
    }
  });

  whale.storage.onChanged.addListener(function(changes, namespace) {
    const { keywordsOrder } = changes;
    if (keywordsOrder) {
      const { newValue, oldValue } = keywordsOrder;
      if (newValue.length > oldValue.length) {
        addKeywordLiToList(newValue[newValue.length - 1]);
      }
      return;
    }
  });
})();
