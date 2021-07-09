chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  console.log(">> Running styledash extension!!!!!")

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
});