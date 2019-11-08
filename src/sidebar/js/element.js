// 즐겨찾기 안한 별 : far fa-star grey
// 즐겨찾기 한 별 : fas fa-star yellow
function onClickStarIcon(keywordLiEl) {
  const starEl = keywordLiEl.querySelector('.star-icon');

  starEl.addEventListener('click', () => {
    starEl.classList.toggle('fas');
    starEl.classList.toggle('yellow');

    starEl.classList.toggle('grey');
    starEl.classList.toggle('far');
  })
}

// 아래화살표 : fa-chevron-down
// 위화살표 : fa-chevron-up
function onclickFoldIcon(keywordLiEl) {
  const foldEl = keywordLiEl.querySelector('.fold-icon');

  foldEl.addEventListener('click', () => {
    foldEl.classList.toggle('fa-chevron-down');
    foldEl.classList.toggle('fa-chevron-up');

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

  onClickStarIcon(keywordLiEl);
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
