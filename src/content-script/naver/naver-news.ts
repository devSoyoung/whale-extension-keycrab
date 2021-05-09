import { sendMessageForAddLink } from "../utils/message";

export default function newsElementEventBinder(searchResultEl: HTMLLIElement, keyword: string) {
    // 뉴스 아이템 메인 영역
    const contentEl: HTMLDivElement = searchResultEl.querySelector(".news_wrap");
    if (!contentEl) return;
    const titleEl: HTMLAnchorElement = contentEl.querySelector(".news_tit");
    const { title, href: url } = titleEl;
    contentEl.addEventListener("click", () => {
        if (!window.isTracking) return;
        sendMessageForAddLink(keyword, {
            url,
            title,
            origin: 'news',
            favorite: false
        });
    });

    // 연관 뉴스 영역
    const relatedEl: HTMLDivElement = searchResultEl.querySelector(".news_cluster");
    if (!relatedEl) return;
    relatedEl.addEventListener("click", ({ target }) => {
        if (!(target instanceof HTMLAnchorElement) || !window.isTracking) return;
        const { title, href: url } = target;
        sendMessageForAddLink(keyword, {
            url,
            title,
            origin: 'news',
            favorite: false
        });
    });
}
