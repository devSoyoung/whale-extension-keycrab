whale.runtime.onInstalled.addListener(() => {
  whale.storage.sync.set({
    keywords: {},
    keywordsOrder: [],
  });
});

whale.runtime.onMessage.addListener((msg, sender, sendRes) => {
  if (msg.type === 'FOLLOW_KEYWORD') {
    const { keywordName } = msg.payload;
    followKeyword(keywordName);
  }
  else if (msg.type === 'UNFOLLOW_KEYWORD') {
    const { keywordName } = msg.payload;
    unfollowKeyword(keywordName);
  }
  else if (msg.type === 'ADD_LINK_TO_KEYWORD') {
    const { keyword, link } = msg.payload;
    addLinkToKeyword(keyword, link);
  }
});

function followKeyword(keywordName) {
  whale.storage.sync.get(['keywords', 'keywordsOrder'], ({ keywords, keywordsOrder }) => {
    if (!keywords[keywordName]) {
      whale.storage.sync.set({
        keywordsOrder: keywordsOrder.concat(keywordName),
        keywords: {
          ...keywords,
          [keywordName]: {
            tracking: true,
            link: [],
          }
        }
      });
      return;
    }

    whale.storage.sync.set({
      keywords: {
        ...keywords,
        [keywordName]: {
          ...keywords[keywordName],
          tracking: true,
        }
      }
    });
  });
}

function unfollowKeyword(keywordName) {
  whale.storage.sync.get(['keywords'], ({ keywords }) => {
    if (!keywords[keywordName] || !keywords[keywordName].tracking) {
      return;
    }

    whale.storage.sync.set({
      keywords: {
        ...keywords,
        [keywordName]: {
          ...keywords[keywordName],
          tracking: false,
        }
      }
    });
  });
}

function addLinkToKeyword(keywordName, link) {
  whale.storage.sync.get(['keywords'], ({ keywords }) => {
    // storage.sync 가 초기화 된 경우를 고려하여 예외처리
    if (!keywords) {
      whale.storage.sync.set({
        keywords: {
          [keywordName]: {
            tracking: true,
            link: [link],
          }
        },
        keywordsOrder: [keywordName],
      });
      return;
    }

    // 저장
    whale.storage.sync.set({
      keywords: {
        ...keywords,
        [keywordName]: {
          ...keywords[keywordName],
          link: keywords[keywordName].link.concat(link),
        }
      },
    });
  });
}
