// 페이지에 삽입 될 키워드 추적 버튼 관리하기
window.insertButton = function(keywordName) {
  const isGoogle= `${location.href}`.includes(`google`);
  const buttonEl = document.createElement('button');
  // 추적 여부에 따라 버튼 이름, 스타일 다르게
  buttonEl.innerText = getInnerText(window.isTracking);
  buttonEl.className = getClassName(window.isTracking, isGoogle);

  buttonEl.onclick = function() {
    window.setButtonState(!window.isTracking);
    if (!window.isTracking) {
      sendMessageForUnfollowKeyword(keywordName);
    } else {
      sendMessageForFollowKeyword(keywordName);
    }
  };

  if (isGoogle) console.log(`google`);
  else document.querySelector('.search_area').appendChild(buttonEl);
};

window.insertCrabIcon = function(isTracking, isGoogle) {
  const crabDivEl= document.createElement('div');

  crabDivEl.className = getCrabClass(isTracking, isGoogle);

  document.querySelector('.search_area').appendChild(crabDivEl);
};

window.setButtonState = function(isTracking) {
  window.isTracking = isTracking;
  const isGoogle = `${location.href}`.includes(`google`);
  const buttonEl = document.querySelector('.tracking-btn');
  const crabIconEl = document.querySelector('.crab-area');

  buttonEl.innerText = getInnerText(window.isTracking);
  buttonEl.className = getClassName(window.isTracking, isGoogle);
  // tracking 중이면 crabIconEl 에 active 아니면 빼기
  crabIconEl.className = getCrabClass(window.isTracking, isGoogle);
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

function getClassName(isTracking, isGoogle) {
  let result = 'tracking-btn';
  result += isGoogle ? ' tracking-btn-google' : ' tracking-btn-naver';
  result += isTracking ? ' tracking-btn-active' : '';
  return result;
}

function getCrabClass(isTracking, isGoogle) {
  let result = 'crab-area';
  result += isGoogle ? ' crab-google' : ' crab-naver';
  result += isTracking ? ' crab-area-active' : '';
  return result;
}

function getResultForm(origin, title, url) {
  return {
    favorite: false,
    origin: origin,
    title: title,
    url: url
  }
}
