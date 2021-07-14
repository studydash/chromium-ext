let renderWindow
function openRenderMan() {
  renderWindow =
    window.open(chrome.runtime.getURL("popup/render.html"), 'renderTarget', 'height=600,width=600,status=yes,toolbar=no,menubar=no,location=no')
}

/**
 * This event hander will listen for messages from ALL child windows.
 * It fires exactly ONCE when the Renderman window is initially opened.
 */
 window.addEventListener('message', event => {
  // console.log('^^^^^^^^^ child message received!', event)
  if (event.data === 'Trigger finished-loading from Renderman!') {
    console.log('>> Trigger finished-loading from Renderman! Fire initial load')
    const elEditor = document.getElementsByName('issue[body]')?.[0]
    const content = RenderCustom(elEditor.value)
    renderWindow?.postMessage(content, '*')
  }
}, false)
// Currently commented. During dev, I frequently reload the 'render' page for testing.
// Uncomment for production.
window.onunload = () => {
  console.log('>> closing children window if open.')
  renderWindow?.close()
}

function PopulatePreview(renderedContent) {
  if (!renderWindow) {
    openRenderMan() // Open Renderman popup if it isn't already open
  } else {
    console.log(">> Populate the preview div in Renderman popup!")
    renderWindow?.postMessage(renderedContent, '*') // Don't fire this the first time if Renderman popup just opened
  }
}
