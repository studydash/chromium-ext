window.onload = () => {
  console.log('Renderman finished loading; send message back to parent window')
  window.opener!.postMessage('Trigger finished-loading from Renderman!', '*')
}

window.addEventListener('message', event => {
  console.log('^^^^^^^^^ child message received!', event)
  if ((event.currentTarget as Window).name === 'renderTarget') {
    console.log('>> Message from GitHub parent window:', event.data)
    document.getElementById('feed')!.innerHTML = event.data
  }
}, false)