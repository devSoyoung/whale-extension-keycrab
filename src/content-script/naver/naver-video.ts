import { sendMessageForAddLink } from "../utils/message";

export default function videoElementEventBinder(keyword: string) {
    const titleEls = document.querySelectorAll(".video_square_list .info_title");
    titleEls.forEach(titleEl => {
        if (!(titleEl instanceof HTMLAnchorElement)) return;
        const { href: url, textContent: title } = titleEl;
        titleEl.addEventListener("click", () => {
            if (!window.isTracking) return;
            sendMessageForAddLink(keyword, {
                url,
                title,
                origin: '',
                favorite: false
            });
        });
    });
}
