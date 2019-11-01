// 페이지에 삽입 될 키워드 추적 버튼 관리하기
window.insertButton = function(keywordName) {
  const buttonEl = document.createElement('button');
  // 추적 여부에 따라 버튼 이름, 스타일 다르게
  buttonEl.innerText = getInnerText(window.isTracking);
  buttonEl.className = getClassName(window.isTracking);

  buttonEl.onclick = function() {
    // 스타일과 텍스트 수정
    buttonEl.innerText = getInnerText(!window.isTracking);
    buttonEl.className = getClassName(!window.isTracking);

    const tracking = !window.isTracking;
    window.isTracking = tracking;

    whale.storage.sync.get(['keywords'], ({ keywords }) => {
      const newKeywords = { ...keywords };
      if (!keywords[keywordName]) {
        newKeywords[keywordName] = {
          tracking: true,
          favorite: false,
          link: [],
        };
      } else {
        newKeywords[keywordName] = {
          ...keywords[keywordName],
          tracking: tracking,
        }
      }

      sendMessageForUpdateKeywords(newKeywords);
    });
  };

  document.querySelector('html').appendChild(buttonEl);
};

function sendMessageForUpdateKeywords(payload) {
  whale.runtime.sendMessage({
    type: 'UPDATE_KEYWORDS',
    payload
  });
}

function getInnerText(isTracking) {
  return isTracking ? '키워드 저장해제' : '키워드 저장';
}

function getClassName(isTracking) {
  return isTracking ? 'tracking-btn tracking-btn-active' : 'tracking-btn';
}
