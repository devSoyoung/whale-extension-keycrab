function onclickBellIcon(keywordLiEl) {
  const bellOnIconEl = keywordLiEl.querySelector('.bell-on');
  const bellOffIconEl = keywordLiEl.querySelector('.bell-off');

  bellOnIconEl.addEventListener('click', () => {
    bellOnIconEl.classList.toggle('display-none');
    bellOffIconEl.classList.toggle('display-none');
  });

  bellOffIconEl.addEventListener('click', () => {
    bellOnIconEl.classList.toggle('display-none');
    bellOffIconEl.classList.toggle('display-none');
  });
}

// 아래화살표 : fa-chevron-down
// 위화살표 : fa-chevron-up
function onclickFoldIcon(keywordLiEl) {
  const foldEl = keywordLiEl.querySelector('.fold-icon');
  foldEl.addEventListener('click', () => {
    foldEl.classList.toggle('unfold-active');

    const linkListEl = keywordLiEl.querySelector('.link-list');
    linkListEl.classList.toggle('display-none');
  });
}

function getKeywordItemEl(keywordName, keywordInfo) {
  const keywordLiEl = document.createElement('li');
  keywordLiEl.className = 'keyword-item';
  keywordLiEl.id = keywordName;
  keywordLiEl.setAttribute('keyword', keywordName);
  keywordLiEl.innerHTML = getKeywordLiHTML(keywordName, keywordInfo);

  onclickBellIcon(keywordLiEl);
  onclickFoldIcon(keywordLiEl);
  onClickTrashIcon(keywordLiEl, keywordName);
  addHandlerToChildEls(keywordLiEl, keywordName, keywordInfo);
  return keywordLiEl;
}

function addLinkLiElToList(keywordContent) {
  console.log('addLinkLiElToList called');
  const { keyword, link } = keywordContent;
  const keywordEl = document.body.querySelector(`.keyword-item[keyword="${keyword}"]`);
  const linkLiEl = document.createElement('li');
  linkLiEl.innerHTML = `${getLinkLiHTML(link)}`;
  addHandlerToTargetEl(linkLiEl, keyword, link);

  const linkListEl = keywordEl.querySelector('.link-list');
  if (!linkListEl.childElementCount) {
    linkListEl.appendChild(linkLiEl.querySelector('li')); // 아직 저장된 키워드가 없을 경우
  } else {
    if (link.favorite) {
      linkListEl.insertBefore(linkLiEl.querySelector('li'), linkListEl.firstChild); // 이미 자식 있는 경우 -> 맨첫번째 노드로 정렬
      return;
    }

    const pinnedEl = linkListEl.querySelector('li[favorite="false"]');
    console.log(pinnedEl);
    if (!pinnedEl) {
      linkListEl.appendChild(linkLiEl.querySelector('li'));
      return;
    }
    linkListEl.insertBefore(linkLiEl.querySelector('li'), pinnedEl);
  }
}

function addLinkLiToListWithNoOrder(keywordContent) {
  const { keyword, link } = keywordContent;
  const keywordEl = document.body.querySelector(`.keyword-item[keyword="${keyword}"]`);
  const linkLiEl = document.createElement('li');
  linkLiEl.innerHTML = `${getLinkLiHTML(link)}`;
  addHandlerToTargetEl(linkLiEl, keyword, link);

  const linkListEl = keywordEl.querySelector('.link-list');
  if (!linkListEl.childElementCount) {
    linkListEl.appendChild(linkLiEl.querySelector('li')); // 아직 저장된 키워드가 없을 경우
  } else {
    linkListEl.insertBefore(linkLiEl.querySelector('li'), linkListEl.firstChild); // 이미 자식 있는 경우 -> 맨첫번째 노드로 정렬
  }
}
