import { Storage } from "../types/Storage";
import { Message } from "../types/Message";

whale.runtime.onInstalled.addListener((installDetails) => {
  const {reason} = installDetails;
  if(reason === 'install') {
    whale.storage.sync.set({
      keywords: {},
      keywordsOrder: [],
    });
  }
});

whale.runtime.onMessage.addListener(({ type, payload }: Message) => {
  if (type === 'REMOVE_KEYWORD') {
    const { keyword } = payload;
    removeKeyword(keyword);
  } else if (type === 'REMOVE_LINK') {
    const { keyword, link } = payload;
    removeLink(keyword, link);
  } else if (type === 'FOLLOW_KEYWORD') {
    const { keyword } = payload;
    followKeyword(keyword);
  } else if (type === 'UNFOLLOW_KEYWORD') {
    const { keyword } = payload;
    unfollowKeyword(keyword);
  } else if (type === 'ADD_LINK_TO_KEYWORD') {
    const { keyword, link } = payload;
    addLinkToKeyword(keyword, link);
  }
});

function removeKeyword(keyword: string) {
  whale.storage.sync.get(['keywords', 'keywordsOrder'], 
    ({ keywords, keywordsOrder }: Storage) => {
      if (!keywords || !keywords[keyword]) {
        return;
      }
  
      // keywordName 요소 삭제
      delete keywords[keyword];
      const idx = keywordsOrder.indexOf(keyword);
      if (idx > -1) keywordsOrder.splice(idx, 1);
  
      whale.storage.sync.set({
        keywordsOrder,
        keywords,
      });
    }
  );
}

function removeLink(keyword: string, href: string) {
  whale.storage.sync.get(['keywords'], ({ keywords }: Storage) => {
    if (!keywords || !keywords[keyword]) {
      return;
    }

    const links = keywords[keyword].link;
    const idx = links.findIndex((url) => url === href);
    if (idx > -1) links.splice(idx, 1);

    whale.storage.sync.set({ keywords });
  });
}

function followKeyword(keyword: string) {
  whale.storage.sync.get(['keywords', 'keywordsOrder'], 
    ({ keywords, keywordsOrder }: Storage) => {
      if (!keywords[keyword]) {
        whale.storage.sync.set({
          keywordsOrder: keywordsOrder.concat(keyword),
          keywords: {
            ...keywords,
            [keyword]: {
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
          [keyword]: {
            ...keywords[keyword],
            tracking: true,
          }
        }
      });
    }
  );
}

function unfollowKeyword(keyword: string) {
  whale.storage.sync.get(['keywords'], ({ keywords }: Storage) => {
    if (!keywords[keyword] || !keywords[keyword].tracking) {
      return;
    }

    whale.storage.sync.set({
      keywords: {
        ...keywords,
        [keyword]: {
          ...keywords[keyword],
          tracking: false,
        }
      }
    });
  });
}

function addLinkToKeyword(keyword: string, link: string) {
  whale.storage.sync.get(['keywords'], ({ keywords }: Storage) => {
    // storage.sync 가 초기화 된 경우를 고려하여 예외처리
    if (!keywords) {
      whale.storage.sync.set({
        keywords: {
          [keyword]: {
            tracking: true,
            link: [link],
          }
        },
        keywordsOrder: [keyword],
      });
      return;
    }

    // 저장
    whale.storage.sync.set({
      keywords: {
        ...keywords,
        [keyword]: {
          ...keywords[keyword],
          link: keywords[keyword].link.concat(link),
        }
      },
    });
  });
}
