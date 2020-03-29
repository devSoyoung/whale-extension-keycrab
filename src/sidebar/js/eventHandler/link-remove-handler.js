function addRemoverToLinks(keywordLiEl, keywordName, keywordInfo) {
    const linklistEl = keywordLiEl.querySelector('ul.link-list');
    const linkEls = linklistEl.querySelectorAll('li');

    linkEls.forEach(link =>
        addRemoverToLink(link, keywordName)
    );
}

function addRemoverToLink(link, keywordName) {
    const button = link.querySelector('button');
    const {href} = link.querySelector('a');
    button.addEventListener('click', () => {
        whale.runtime.sendMessage({
            type: 'REMOVE_LINK',
            payload: {keywordName, href}
        });

        const buttonParentEl = button.parentElement;
        buttonParentEl.parentElement.removeChild(buttonParentEl);
    });
}
