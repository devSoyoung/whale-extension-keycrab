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
  onClickPinIcon(keywordLiEl, keywordInfo);

  return keywordLiEl;
}

function addLinkLiElToList(keywordContent) {
  const keywordEl = document.body.querySelector(`.keyword-item[keyword="${keywordContent.keyword}"]`);
  const linkLiEl = document.createElement('li');
  linkLiEl.innerHTML = `${getLinkLiHTML(keywordContent.link)}`;

  onClickPinIcon(linkLiEl);

  const linkListEl = keywordEl.querySelector('.link-list');
  if(!linkListEl.childElementCount) {
    linkListEl.appendChild(linkLiEl); // 아직 저장된 키워드가 없을 경우
  } else {
    linkListEl.insertBefore(linkLiEl, linkListEl.firstChild); // 이미 자식 있는 경우 -> 맨첫번째 노드로 정렬
  }
}

