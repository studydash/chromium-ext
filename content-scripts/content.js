console.log('>> Initial load: GitHub Issues page detected! Run ext!', window.location.pathname)

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
          // console.log('>> discussions_bucket', document.getElementById('discussion_bucket'))
          // console.log('>> mutationsList:', mutationsList)
          // renderCustom(m[3])
        }
      }
    })
  observer.observe(targetNode, config)
}

// Write code that scans the DOM and replace all innerHTML of `<div class="edit-comment-hide"></div>` with
// our own custom rendered content.

const reLinks = /\[(.*?)\]\((.*?)\)/g

function renderCustom(cardNo) {
  console.log('>> Calling renderCustom()', cardNo)
  console.log("\t>> document.getElementsByClassName('edit-comment-hide')", document.getElementsByClassName('edit-comment-hide'))

  if (document.getElementsByClassName('edit-comment-hide')[0]) {
    const url = `https://api.github.com/repos${window.location.pathname}`
    console.log('>> fetching:', url)
    const req = fetch(url).then(rs => {
      rs.json().then(dom =>{
        console.log('>> issue body before:', JSON.stringify(dom.body))

        let body = dom.body

        body = body.replaceAll('- [ ]', '<input type="checkbox">&nbsp;')
        body = body.replaceAll('[ ]', '<input type="checkbox">&nbsp;')

        // Perform markdown formatting
        // console.log('\t >>body:', body)
        body = body.replaceAll(/### .*?\r\n/g, m => `<h3>${m.slice(4, -2)}</h3><br />`)
        // body = body.replaceAll(/_.*_/g, '<em>$&</em>') // Almost works but doesn't eliminate the underscores
        body = body.replaceAll(/_.*?_/g, m => `<i>${m.slice(1, -1)}</i>`)
        body = body.replaceAll(/\*\*.*?\*\*/g, m => `<b>${m.slice(2, -2)}</b>`) // Use RegEx-- but need to escape!
        body = body.replaceAll(/\n/g, '<br />')
      
        body = body.replace('\n', '<br />')

        // Replace all links
        body = body.replaceAll(reLinks, "<a target='_blank' href='$2'>$1</a>")
        
        console.log('>> issue body after:', JSON.stringify(body))

        document.getElementsByClassName('edit-comment-hide')[0].innerHTML = `<div style="padding: 20px">${body}</div>`
      })
    })
  }
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