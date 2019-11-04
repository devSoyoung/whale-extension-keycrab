whale.runtime.onInstalled.addListener(() => {
  whale.storage.sync.set({
    keywords: {},
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
  whale.storage.sync.get(['keywords'], ({ keywords }) => {
    if (!keywords[keywordName]) {
      whale.storage.sync.set({
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

function addLinkToKeyword(keyword, link) {
  whale.storage.sync.get(['keywords'], ({ keywords }) => {
    // TODO: 링크 중복검사

    // storage.sync 가 초기화 된 경우를 고려하여 예외처리
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
