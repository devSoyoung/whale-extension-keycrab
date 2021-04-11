function onClickTrashIcon(keywordLiEl, keyword) {
  const trashEl = keywordLiEl.querySelector('.trash-icon');

  trashEl.addEventListener('click', () => {
    const confirmMessage = `${keyword} 키워드를 삭제하시겠습니까?`;

    if (window.confirm(confirmMessage)) {
      keywordLiEl.remove();
      whale.runtime.sendMessage({
        type: 'REMOVE_KEYWORD',
        payload: { keyword }
      });

      const keywordItemAreaEl = document.body.querySelector('.keyword-items-area');
      if(!keywordItemAreaEl.querySelector('.keyword-items-list').childElementCount) {
        keywordItemAreaEl.querySelector('#intro-area').classList.remove('display-none');
      }
    }
  });
}
