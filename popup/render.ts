window.onload = () => {
  console.log('render loaded! Trigger from Renderman!')
  window.opener!.postMessage('Trigger from Renderman!', '*')
}

window.addEventListener('message', event => {
  // console.log('^^^^^^^^^ child message received!', event)
  if ((event.currentTarget as Window).name === 'renderTarget') {
    console.log('>> Message from GitHub parent window:', event.data)
    document.getElementById('feed')!.innerHTML = event.data
  }
}, false)