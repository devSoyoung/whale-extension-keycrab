// 스토리지 초기화 하기
const ulEl = document.querySelector('.keyword-items-list');

window.initKeywordListByType = (type, keywords, keywordsOrder) => {
  if(Object.keys(keywords).length) {
    checkIntroAvailable();
  }

  // 최신순/이름순 클릭했을 때를 위하여 초기화
  ulEl.innerHTML = '';

  if (type === 'recent') {
    keywordsOrder.reverse().forEach(keywordName => {
      ulEl.appendChild(getKeywordItemEl(keywordName, keywords[keywordName]));
    });
  } else {
    [...Object.keys(keywords)].forEach(keywordName => {
      ulEl.appendChild(getKeywordItemEl(keywordName, keywords[keywordName]));
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
  const searchInputEl = document.querySelector('.search-input');
  searchInputEl.addEventListener('keyup', handleSearchKeyword);
  // searchInputEl.addEventListener('focus', handleFocusSearch);
  // searchInputEl.addEventListener('focusout', handleFocusOutSearch);
  document.querySelectorAll('.sort-button').forEach(sortButtonEl => {
    sortButtonEl.addEventListener('click', window.handleClickSortButton);
  });

  // storage 변화 감지하여 사이드바 키워드의 "링크" 업데이트
  whale.runtime.onMessage.addListener((msg, sender, sendRes) => {
    const { type, payload } = msg;
    if (type === 'ADD_LINK_TO_KEYWORD') {
      const keywordContent = msg.payload;
      addLinkLiElToList(keywordContent);
    }
  });

  whale.storage.onChanged.addListener(function(changes, namespace) {
    // 키워드 순서에 변화: 새로운 "키워드" 추가되는 것
    const { keywordsOrder } = changes;
    if (!keywordsOrder) {
      return;
    }

    const { newValue, oldValue } = keywordsOrder;
    const keywordName = newValue[newValue.length - 1];
    const keywordEl = getKeywordItemEl(keywordName);

    if (newValue.length > oldValue.length) {
      if (window.orderState === 'recent') {
        appendKeywordRecent(keywordEl);
        return;
      }

      // 이름순 정렬
      appendKeywordName(keywordName, keywordEl);
    }
  });
})();


function appendKeywordRecent(keywordEl) {
  checkIntroAvailable();

  if(!ulEl.childElementCount) {
    // 아직 저장된 키워드가 없을 경우
    ulEl.appendChild(keywordEl);
  } else {
    ulEl.insertBefore(keywordEl, ulEl.firstChild);
  }
}

function appendKeywordName(keywordName, keywordEl) {
  checkIntroAvailable();

  whale.storage.sync.get(['keywords'], ({ keywords }) => {
    const idx = [...Object.keys(keywords)].indexOf(keywordName);
    const liEls = document.querySelectorAll('.keyword-item');
    if (!liEls || !liEls[idx]) {
      // 하나도 없는 경우 or 마지막에 넣어야 하는 경우
      ulEl.appendChild(keywordEl);
      return;
    }

    ulEl.insertBefore(keywordEl, liEls[idx]);
  });
}
window.checkIntroAvailable = () => {
  const introAreaEl = document.body.querySelector('#intro-area');
  if(introAreaEl) {
    introAreaEl.classList.add('display-none');
  }
};

// 사이드바로 드래그앤 드롭해 페이지 전환 막기
window.addEventListener(`dragover`, (evt = event) => {
  evt.preventDefault();
  evt.dataTransfer.effectAllowed = `none`;
  evt.dataTransfer.dropEffect = `none`;
}, false);

window.addEventListener(`drop`, (evt = event) => {
  evt.preventDefault();
  evt.dataTransfer.effectAllowed = `none`;
  evt.dataTransfer.dropEffect = `none`;
}, false);
