console.log('>> hello from harness.js!!!!')

function PopulatePreview(renderedContent) {
  console.log(">> Populate the preview div in harness!", renderedContent)
  document.getElementById('previewPane').innerHTML = renderedContent
}

AttachCustomHandlers()