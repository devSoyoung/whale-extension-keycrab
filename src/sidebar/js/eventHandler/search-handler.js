function handleSearchKeyword(e) {
  const ulEl = document.querySelector('.keyword-items-list');
  const searchKeyword = e.target.value;

  if (!searchKeyword) {
    // 검색어가 없는 경우
    ulEl.classList.remove('search-mode');
  } else {
    ulEl.classList.add('search-mode');
  }

  whale.storage.sync.get(['keywords'], ({ keywords }) => {
    const result = [...Object.keys(keywords)].filter(keyword => keyword.includes(searchKeyword));
    document.querySelectorAll('.keyword-item').forEach(el => {
      const found = result.find(item => item === el.getAttribute('keyword'));
      if (found) {
        el.classList.add('show');
      } else {
        el.classList.remove('show');
      }
    });
  });
}
