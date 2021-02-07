function addRemoverToLinks(keywordLiEl, keywordName) {
    const linkEls = keywordLiEl.querySelectorAll('ul.link-list > li');

    linkEls.forEach(linkEl =>
        addRemoverToLink(linkEl, keywordName)
    );
}

function addRemoverToLink(linkEl, keywordName) {
    const buttonEl = linkEl.querySelector('button');
    const {href} = linkEl.querySelector('a');
    buttonEl.addEventListener('click', () => {
        whale.runtime.sendMessage({
            type: 'REMOVE_LINK',
            payload: {keywordName, href}
        });

        const buttonParentEl = buttonEl.parentElement;
        buttonParentEl.parentElement.removeChild(buttonParentEl);
    });
}
