// 하위의 모든 pin 에 작업하는 경우
function addHandlerToChildEls(parentEl, keywordName, keywordInfo) {
  if (!keywordInfo) return;

  const { link } = keywordInfo;
  const fixedPinEls = parentEl.querySelectorAll('.pin-fixed');
  const unfixedPinEls = parentEl.querySelectorAll('.pin-unfixed');

  link.forEach((item, idx) => {
    addHandlerToPinEl(fixedPinEls[idx], unfixedPinEls[idx], {
      keywordName,
      link: item
    });
  })
}

// 특정 링크의 핀에만 작업하는 경우
function addHandlerToTargetEl(targetEl, keywordName, link) {
  const fixedPinEl = targetEl.querySelector('.pin-fixed');
  const unfixedPinEl = targetEl.querySelector('.pin-unfixed');
  addHandlerToPinEl(fixedPinEl, unfixedPinEl, {
    keywordName, link
  });
}

// 아래에는 외부에서 사용하지 않는 함수들
function addHandlerToPinEl(fixedPinEl, unfixedPinEl, info) {
  fixedPinEl.addEventListener('click', () => {
    handleClickPin(fixedPinEl, unfixedPinEl, info, false);
  });

  unfixedPinEl.addEventListener('click', () => {
    handleClickPin(fixedPinEl, unfixedPinEl, info, true);
  });
}

function toggleClassList(fixedPinEl, unfixedPinEl) {
  fixedPinEl.classList.toggle('display-none');
  unfixedPinEl.classList.toggle('display-none');
}

function handleClickPin(fixedPinEl, unfixedPinEl, info, favorite) {
  toggleClassList(fixedPinEl, unfixedPinEl);
  updatePinState({
    ...info,
    link: {
      ...info['link'],
      favorite: favorite,
    }
  });
}

function updatePinState({ keywordName, link }) {
  whale.storage.sync.get(['keywords'], ({ keywords }) => {
    keywords[keywordName].link.forEach((item, idx) => {
      if (item.title === link.title) {
        keywords[keywordName]['link'][idx] = link;
      }
    });

    whale.storage.sync.set({ keywords });
    rearrangeLinkEls(keywordName, keywords[keywordName]['link']);
  });
}

function rearrangeLinkEls(keywordName, newLinkOrder) {
  const liEl = document.body.querySelector(`.keyword-item[keyword="${keywordName}"] .link-list`);
  liEl.innerHTML = '';

  const favoriteEl = newLinkOrder.filter(linkItem => linkItem.favorite);
  const unfavoriteEl = newLinkOrder.filter(linkItem => !linkItem.favorite);
  unfavoriteEl.concat(favoriteEl).forEach(item => {
    addLinkLiElToList({ keyword: keywordName, link: item });
  })
}
