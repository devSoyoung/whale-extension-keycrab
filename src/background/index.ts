whale.runtime.onInstalled.addListener((installInfo) => {
  const {reason} = installInfo;
  if(reason === 'install') {
    whale.storage.sync.set({
      keywords: {},
      keywordsOrder: [],
    });
  }
});

whale.runtime.onMessage.addListener((msg, sender, sendRes) => {
  if (msg.type === 'REMOVE_KEYWORD') {
    const { keywordName } = msg.payload;
    removeKeyword(keywordName);
  }
  else if (msg.type === 'REMOVE_LINK') {
    const { keywordName, href } = msg.payload;
    removeLink(keywordName, href);
  }
  else if (msg.type === 'FOLLOW_KEYWORD') {
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

function removeKeyword(keywordName: string) {
  whale.storage.sync.get(['keywords', 'keywordsOrder'], ({ keywords, keywordsOrder }) => {
    if (!keywords || !keywords[keywordName]) {
      return;
    }

    // keywordName 요소 삭제
    delete keywords[keywordName];
    const idx = keywordsOrder.indexOf(keywordName);
    if (idx > -1) keywordsOrder.splice(idx, 1);

    whale.storage.sync.set({
      keywordsOrder,
      keywords,
    });
  });
}

function removeLink(keywordName: string, href: string) {
  whale.storage.sync.get(['keywords'], ({keywords}) => {
    if (!keywords || !keywords[keywordName]) {
      return;
    }

    const links = keywords[keywordName].link;
    const idx = links.findIndex(({url}) => url === href);
    if (idx > -1) links.splice(idx, 1);

    whale.storage.sync.set({
      keywords
    });
  });
}

function followKeyword(keywordName: string) {
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

function unfollowKeyword(keywordName: string) {
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

function addLinkToKeyword(keywordName: string, link: string) {
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
