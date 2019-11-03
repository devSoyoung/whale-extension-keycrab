whale.runtime.onInstalled.addListener(() => {
  whale.storage.sync.set({
    keywords: {},
  });
});

whale.runtime.onMessage.addListener((msg, sender, sendRes) => {
  if (msg.type === 'UPDATE_KEYWORDS') {
    whale.storage.sync.set({ keywords: msg.payload });
  }
  else if (msg.type === 'ADD_LINK_TO_KEYWORD') {
    const { keyword, link } = msg.payload;
    whale.storage.sync.get(['keywords'], ({ keywords }) => {
      // TODO: 중복검사
      if (!keywords) keywords = {};
      // 저장
      whale.storage.sync.set({
        keywords: {
          ...keywords,
          [keyword]: {
            ...keywords[keyword],
            link: keywords[keyword].link.concat(link),
          }
        }
      });
    });
  }
});
