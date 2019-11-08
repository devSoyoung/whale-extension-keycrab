function onClickPinIcon(keywordLiEl, keywordInfo) {
  const fixedPinEl = keywordLiEl.querySelector('.pin-fixed');
  const unfixedPinEl = keywordLiEl.querySelector('.pin-unfixed');

  if(!fixedPinEl || !unfixedPinEl) {
    return;
  }

  fixedPinEl.addEventListener('click', () => {
    console.log(keywordInfo);
    fixedPinEl.classList.toggle('display-none');
    unfixedPinEl.classList.toggle('display-none');
    // favorite true > false
  });

  unfixedPinEl.addEventListener('click', () => {
    console.log(keywordInfo);
    fixedPinEl.classList.toggle('display-none');
    unfixedPinEl.classList.toggle('display-none');
    // favorite false > true
  });
}
