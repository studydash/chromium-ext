console.log('>> hello from harness.js!!!!')

function PopulatePreview(renderedContent) {
  console.log(">> Populate the preview div in harness!", renderedContent)
  document.getElementById('previewPane').innerHTML = renderedContent
}

AttachCustomHandlers()

/////////////////////////////////////////////////////
// Auto-load; use only in dev
const elEditor = document.getElementsByName('issue[body]')?.[0]
PopulatePreview(RenderIntoHtml(elEditor.value))