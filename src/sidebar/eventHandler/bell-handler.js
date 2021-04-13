function onClickBellIcon(keywordLiEl, keyword) {
  const bellOnIconEl = keywordLiEl.querySelector('.bell-on');
  const bellOffIconEl = keywordLiEl.querySelector('.bell-off');

  bellOnIconEl.addEventListener('click', () => {
    bellOnIconEl.classList.toggle('display-none');
    bellOffIconEl.classList.toggle('display-none');

    whale.runtime.sendMessage({
      type: 'UNFOLLOW_KEYWORD',
      payload: { keyword }
    });
  });

  bellOffIconEl.addEventListener('click', () => {
    bellOnIconEl.classList.toggle('display-none');
    bellOffIconEl.classList.toggle('display-none');

    whale.runtime.sendMessage({
      type: 'FOLLOW_KEYWORD',
      payload: { keyword }
    });
  });
}
