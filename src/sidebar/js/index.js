// 스토리지 초기화 하기
const ulEl = document.querySelector('.keyword-items-list');

window.initKeywordListByType = (type, keywords, keywordsOrder) => {
  // 최신순/이름순 클릭했을 때를 위하여 초기화
  ulEl.innerHTML = '';

  if (type === 'recent') {
    keywordsOrder.reverse().forEach(keywordName => {
      ulEl.appendChild(getKeywordItemHTML(keywordName, keywords[keywordName]));
    });
  } else {
    [...Object.keys(keywords)].forEach(keywordName => {
      ulEl.appendChild(getKeywordItemHTML(keywordName, keywords[keywordName]));
    });
  }
};

(function () {
  window.orderState = 'recent';   // recent, name
  whale.storage.sync.get(['keywords', 'keywordsOrder'], ({ keywords, keywordsOrder }) => {
    if (!keywords) {
      return;
    }
    window.initKeywordListByType(window.orderState, keywords, keywordsOrder);
  });

  // 검색창 onchange 핸들러 추가
  document.querySelector('.search-input').addEventListener('keypress', window.handleSearchKeyword);
  document.querySelectorAll('.sort-button').forEach(sortButtonEl => {
    sortButtonEl.addEventListener('click', window.handleClickSortButton);
  });

  // storage 변화 감지하여 사이드바 화면 업데이트
  whale.runtime.onMessage.addListener((msg, sender, sendRes) => {
    const { type, payload } = msg;
    if (type === 'ADD_LINK_TO_KEYWORD') {
      const keywordContent = msg.payload;
      addLinkLiElToList(keywordContent);
    }
  });

  whale.storage.onChanged.addListener(function(changes, namespace) {
    const { keywordsOrder } = changes;
    if (keywordsOrder) {
      const { newValue, oldValue } = keywordsOrder;
      if (newValue.length > oldValue.length) {
        ulEl.appendChild(getKeywordItemHTML(newValue[newValue.length - 1]));
      }
    }
  });
})();
