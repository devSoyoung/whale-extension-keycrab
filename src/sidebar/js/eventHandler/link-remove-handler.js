function onClickLinkRemoveButton(keywordLiEl,keywordName, keywordInfo) {
    const linklistEl = keywordLiEl.querySelector('ul.link-list');
    const linkEls = linklistEl.querySelectorAll('li');

    linkEls.forEach(link => {
        const button = link.querySelector('button');
        const {href} = link.querySelector('a');
        button.addEventListener('click', () => {
            console.log(keywordName, href, `removed!`);

            whale.runtime.sendMessage({
                type: 'REMOVE_LINK',
                payload: { keywordName, href }
            });
        });
    });
}
