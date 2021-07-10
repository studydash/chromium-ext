console.log('>> GitHub Issues page detected! Run ext!', window.location.pathname)

// Write code that scans the DOM and replace all innerHTML of `<div class="edit-comment-hide"></div>` with
// our own custom rendered content.
if (document.getElementsByClassName('edit-comment-hide')[0]) {
  const url = `https://api.github.com/repos${window.location.pathname}`
  console.log('>> fetching:', url)
  const req = fetch(url).then(rs => {
    rs.json().then(dom =>{
      console.log('>> issue body:', dom.body)

      let newBody = dom.body.replace('\r\n', '<br /><br />')
      newBody = newBody.replaceAll('- [ ]', '<input type="checkbox">&nbsp;')
      newBody = newBody.replaceAll('[ ]', '<input type="checkbox">&nbsp;')

      document.getElementsByClassName('edit-comment-hide')[0].innerHTML = `<div style="padding: 20px">${newBody}</div>`
    })
  })
}

// This is code from the quickstart tutorial. Not part of my `GitHub Enhancer` extension
// https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/part2-content-scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  console.log(">> Running styledash extension!")

  const imgTop = document.createElement('div')
  imgTop.innerHTML = 
    `<img src="${request.url}" id="${request.imageDivId}" class="slide-image" />`
  document.body.prepend(imgTop)

  const styleAdd = document.createElement('style')
  styleAdd.innerHTML = 
    `.slide-image {
            height: 400px;
            width: 100vw;
      }`
  document.head.prepend(styleAdd)
  
  document.getElementById(request.imageDivId).onclick = () => {
    document.getElementById(request.imageDivId).remove()
  }
  sendResponse({ fromcontent: "This message is from content.js" })
})