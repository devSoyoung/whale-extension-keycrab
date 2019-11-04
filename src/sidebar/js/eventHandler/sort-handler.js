const sortButtonEls = document.querySelectorAll('.sort-button-area button');
console.log(sortButtonEls);
window.handleClickSortButton = (e) => {
  const type = e.target.innerText;
  if (type === '최신순') {
    window.orderState = 'recent';
    sortButtonEls[0].className = 'sort-button selected';
    sortButtonEls[1].className = 'sort-button';
  } else {    // type === '이름순'
    window.orderState = 'name';
    sortButtonEls[1].className = 'sort-button selected';
    sortButtonEls[0].className = 'sort-button';
  }

  whale.storage.sync.get(['keywords', 'keywordsOrder'], ({ keywords, keywordsOrder }) => {
    if (!keywords) {
      return;
    }
    window.initKeywordListByType(window.orderState, keywords, keywordsOrder);
  });
};
