// 페이지에 삽입 될 키워드 추적 버튼 관리하기
window.insertButton = function(keywordName) {
  const buttonEl = document.createElement('button');
  // 추적 여부에 따라 버튼 이름, 스타일 다르게
  buttonEl.innerText = getInnerText(window.isTracking);
  buttonEl.className = getClassName(window.isTracking);

  buttonEl.onclick = function() {
    window.isTracking = !window.isTracking;
    if (!window.isTracking) {
      sendMessageForUnfollowKeyword(keywordName);
    } else {
      sendMessageForFollowKeyword(keywordName);
    }

    // 스타일과 텍스트 수정
    buttonEl.innerText = getInnerText(window.isTracking);
    buttonEl.className = getClassName(window.isTracking);
  };

  document.querySelector('html').appendChild(buttonEl);
};

window.sendMessageForAddLink = (keywordName, link) => {
  // 중복검사를 background 에서 하면 사이드바에서 추가된 링크 찾기가 어려워서
  // content-script 에서 확인하고, 중복되면 메세지 전달을 안하도록 수정
  whale.storage.sync.get(['keywords'], ({ keywords }) => {
    let isDuplicated = false;
    if (keywords[keywordName]) {
      keywords[keywordName].link.forEach(linkItem => {
        if (linkItem.title === link.title) {
          isDuplicated = true;
        }
      });
    }

    if (isDuplicated) return;
    whale.runtime.sendMessage({
      type: 'ADD_LINK_TO_KEYWORD',
      payload: { keyword: keywordName, link }
    });
  });


};

function sendMessageForFollowKeyword(keywordName) {
  whale.runtime.sendMessage({
    type: 'FOLLOW_KEYWORD',
    payload: { keywordName }
  });
}

function sendMessageForUnfollowKeyword(keywordName) {
  whale.runtime.sendMessage({
    type: 'UNFOLLOW_KEYWORD',
    payload: { keywordName }
  });
}

function getInnerText(isTracking) {
  return isTracking ? '키워드 저장해제' : '키워드 저장';
}

function getClassName(isTracking) {
  return isTracking ? 'tracking-btn tracking-btn-active' : 'tracking-btn';
}
