export const sendMessageForAddLink = (keywordName: string, link) => {
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