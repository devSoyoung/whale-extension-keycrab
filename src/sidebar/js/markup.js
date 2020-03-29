function getOriginName(type) {
  switch(type) {
    case 'total':
      return '통합검색';
    case 'blog':
      return '블로그';
    case 'cafe':
      return '카페';
    case 'shopping':
      return '쇼핑';
    case 'kin':
      return '지식iN';
    case 'post':
      return '포스트';
    case 'video':
      return '동영상';
    case 'news':
      return '뉴스';
    case 'website':
      return '사이트';
    case 'google':
      return '구글';
    default:
      return '네이버';
  }
}

function getSearchButtonHTML(keywordName) {
  return `
    <ul class="search-platform">
      <a href="https://search.naver.com/search.naver?query=${keywordName}" target="_blank">
        <li class="naver-search">
          <img src="../../images/naver.png" alt="네이버로고">
            <span>네이버</span>
        </li>
      </a>
      <a href="https://www.google.com/search?q=${keywordName}" target="_blank">
        <li class="google-search">
          <img src="../../images/google.png" alt="구글로고">
          구글
        </li>
      </a>
      <a href="https://www.youtube.com/results?search_query=${keywordName}" target="_blank">
        <li class="youtube-search">
          <img src="../../images/youtube.png" alt="유튜로고">
          유튜브
        </li>
      </a>
    </ul>
  `;
}

function getKeywordLiHTML(keywordName, keywordInfo) {
  // 새 키워드 추가 될 때, keywordInfo 안 보내주는 것 예외처리
  if (!keywordInfo) {
    keywordInfo = { tracking: true };
  }

  return `
    <div class="bell-icon">
        <img src="../../../images/icons/bell_off.png" alt="알림 해제 상태" class="bell-off ${keywordInfo.tracking && 'display-none'}">
        <img src="../../../images/icons/bell_on.png" alt="알림 설정 상태" class="bell-on ${!keywordInfo.tracking && 'display-none'}">
    </div>
    <div class="keyword-item-content">
      <div class="keyword-title">${keywordName}</div>
      <div class="util-icon">
        <img src="../../../images/icons/garbage.png" alt="키워드 삭제 버튼" class="trash-icon">
        <img src="../../../images/icons/fold.png" alt="키워드 내용 접기/펼치기" class="fold-icon">
      </div>
      ${getSearchButtonHTML(keywordName)}
      <ul class="link-list">
        ${keywordInfo ? (
          getOrderedLinkList(keywordInfo.link).map(linkItem => (
            getLinkLiHTML(linkItem)
          )).join('')
        ) : ''}
      </ul>
    </div>
  `;
}

function getOrderedLinkList(links) {
  if (!links) {
    return [];
  }
  const pinnedLink = links.filter(link => link.favorite);
  const unpinnedLink = links.filter(link => !link.favorite);
  return unpinnedLink.concat(pinnedLink).reverse();
}

function getLinkLiHTML(linkItem) {
  return  `
    <li favorite="${linkItem.favorite}">
      <div class="pin-icon">
        <img src="../../../images/icons/pin_fixed2.png" class="pin-fixed ${!linkItem.favorite && 'display-none'}" alt="고정된 핀">
        <img src="../../../images/icons/pin_unfixed.png" class="pin-unfixed ${linkItem.favorite && 'display-none'}" alt="고정된 핀">
      </div>
      <div class="link-origin">${getOriginName(linkItem.origin)}</div>
      <a target="_blank" href=${linkItem.url}>
        <div class="link-url">${linkItem.title}</div>
      </a>
      <button class="link-delete-button"><i class="far fa-times-circle"></i></button>
    </li>
  `;
}
