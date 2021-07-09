const sendMessageId = document.getElementById("sendmessageid")
if (sendMessageId) {
    sendMessageId.onclick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    url: chrome.extension.getURL("images/books2.png"),
                    imageDivId: `${guidGenerator()}`,
                    tabId: tabs[0].id
                },
                (response) => {
                    window.close()
                }
            )
            function guidGenerator() {
                const S4 = () => {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }
                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            }
        })
    }
}
