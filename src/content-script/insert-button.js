(()=> {
    const isGoogle= `${location.href}`.includes(`google`);
    const isTabMenu = `${location.href}`.includes(`tbm`);
    // 구글 통검 이외에는 버튼 안달기
    if (isGoogle && isTabMenu) return;

    window.isTracking = false;
    const currentKeyword = isGoogle
        ? document.querySelector('input[title = 검색]').value
        : document.querySelector('#nx_query').value;


    // storage 에서 키워드 추적 여부를 가져와서 버튼 삽입
    whale.storage.sync.get([ 'keywords' ], function ({ keywords }) {
        if (!keywords || !keywords[currentKeyword]) {
            window.insertButton(currentKeyword, false);
            window.insertCrabIcon(window.isTracking, isGoogle);
            return;
        }

        window.isTracking = keywords[currentKeyword].tracking;
        window.insertButton(currentKeyword, isTracking);
        window.insertCrabIcon(window.isTracking, isGoogle);
    });

    whale.storage.onChanged.addListener((changes, changeArea) => {
        if (changeArea === 'sync') {
            const newValue = changes.keywords.newValue || undefined;
            if (!newValue[currentKeyword]) window.setButtonState(false);
            else window.setButtonState(newValue[currentKeyword]['tracking']);
        }
    });
})();
