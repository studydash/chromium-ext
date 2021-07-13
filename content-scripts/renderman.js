let renderWindow
function openRenderMan() {
  renderWindow =
    // @ts-ignore
    window.open(chrome.runtime.getURL("popup/render.html"), 'renderTarget', 'height=600,width=600,status=yes,toolbar=no,menubar=no,location=no')
}

/**
 * This event hander will listen for messages from ALL child windows.
 * It fires exactly ONCE when the Renderman window is initially opened.
 */
 window.addEventListener('message', event => {
  // console.log('^^^^^^^^^ child message received!', event)
  if (event.data === 'Trigger from Renderman!') {
    console.log('>> Trigger from Renderman preview window!')
  }
}, false)
// Currently commented. During dev, I frequently reload the 'render' page for testing.
// Uncomment for production.
window.onunload = () => {
  console.log('>> closing children window if open.')
  renderWindow?.close()
}