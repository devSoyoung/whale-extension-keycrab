function addRemoverToLinks(keywordLiEl, keywordName) {
    const linkEls = keywordLiEl.querySelectorAll('ul.link-list > li');

    linkEls.forEach(linkEl =>
        addRemoverToLink(linkEl, keywordName)
    );
}

function addRemoverToLink(linkEl, keyword) {
    const buttonEl = linkEl.querySelector('button');
    const { href: link } = linkEl.querySelector('a');
    buttonEl.addEventListener('click', () => {
        whale.runtime.sendMessage({
            type: 'REMOVE_LINK',
            payload: { keyword , link }
        });

        const buttonParentEl = buttonEl.parentElement;
        buttonParentEl.parentElement.removeChild(buttonParentEl);
    });
}
