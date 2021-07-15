console.log('>> Initial load: GitHub Issues page detected; run ext', window.location.pathname)

// Select the node that will be observed for mutations
const targetNode = document.getElementById('js-repo-pjax-container')

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true }

// Callback function to execute when mutations are observed
let currentPath

// If the targetNode is detected on this page, start observing it
if (targetNode) {
  const observer = new MutationObserver(
    (mutationsList, observer) => {
      if (currentPath !== window.location.pathname) {
        currentPath = window.location.pathname
        console.log('>> `location.pathname` has changed!', currentPath)
    
        // Check to see if this is a `GitHub issue`. If it is, trigger custom rendering logic
        const m = window.location.pathname.match(/^\/(.*?)\/(.*?)\/issues\/(\d*)$/)
        if (m?.[1]) {
          console.log('\t>> This is a GitHub issue page:', m[1], m[2], m[3])
          
          const elEditor = document.getElementsByName('issue[body]')?.[0]
          populateIssueDiv(RenderIntoHtml(elEditor.innerHTML))

          // Add custom handlers to the editor textarea
          AttachCustomHandlers()
        }
      }
    })
  observer.observe(targetNode, config)
}

function populateIssueDiv(renderedContent) {
  document.getElementsByClassName('edit-comment-hide')[0].innerHTML =
    `<div style="padding: 20px">${renderedContent}</div>`
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
