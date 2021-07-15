function AttachCustomHandlers() {
  // Get the textarea element of the issue editor
  const elEditor = document.getElementsByName('issue[body]')?.[0] as HTMLTextAreaElement
  if (elEditor) {
    console.log('>> elEditor detected! Attach keydown listener')
    elEditor.addEventListener('keydown', e => {
      // const selectedText = window.getSelection()?.toString() ?? ''
      if ((e.ctrlKey && e.key === 'k')) {
        // elEditorView.setRangeText(`[${selectedText}](url)`)
        // elEditorView.setSelectionRange(elEditorView.selectionStart + selectedText.length + 3,
        //   elEditorView.selectionStart + selectedText.length + 6)
        // e.preventDefault()
      } else if (e.ctrlKey && e.key === 's') {
        console.log('\t>> trigger saveArticle()', JSON.stringify(elEditor.value))
        const renderedContent = RenderIntoHtml(elEditor.value)
        ;(window as any).PopulatePreview(renderedContent)
        e.preventDefault()
      }
    })
  }
}

// Write code that scans the DOM and replace all innerHTML of `<div class="edit-comment-hide"></div>` with
// our own custom rendered content.
const reImgs = /\!\[(.*?)\]\((.*?)\)/g
const reLinks = /\[(.*?)\]\((.*?)\)/g

// Accepts raw text and renders into markdown
function renderIntoMarkdown(contentMarkdown: string): string {
  let markdown = contentMarkdown
    .replaceAll('::gif/picard::', 
      '![image](https://media.tenor.com/images/cf284bb8e2b9e68ee642fc8a4801a670/tenor.gif)')
    .replaceAll('::gif/leo::', 
      '![image](https://thumbs.gfycat.com/CarefreeFlamboyantJackal-size_restricted.gif)')
    .replaceAll(/\:\:.*?(?:(?:be\/)|(?:v=)|(?:watch\/))(.*)\:\:/g,
      '<iframe width="533px" height="300px" src="https://www.youtube.com/embed/$1" \
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" \
      allowfullscreen></iframe>')

  return markdown
}


function RenderIntoHtml(contentRaw: string): string {
  console.log('\t>> Calling RenderIntoHtml(string)')
  let html = renderIntoMarkdown(contentRaw)

  html = 
    html.replaceAll('- [ ]', '<label class="customCb"><input type="checkbox" /></label>')
      .replaceAll('[ ]', '<label class="customCb"><input type="checkbox" /></label>')
      .replaceAll('- [x]', '<label class="customCb"><input type="checkbox" checked /></label>')

  // Perform markdown formatting
  // console.log('\t >>body:', body)
  html = 
    html.replaceAll(/### .*?\n/g, m => `<h3>${m.slice(4, -2)}</h3><br />`)
      .replaceAll(/_(.*)_/g, '<em>$1</em>') // Almost works but doesn't eliminate the underscores
      .replaceAll(/_.*?_/g, m => `<i>${m.slice(1, -1)}</i>`)
      .replaceAll(/\*\*.*?\*\*/g, m => `<b>${m.slice(2, -2)}</b>`) // Use RegEx-- but need to escape!
      .replaceAll(/\n/g, '<br />')

  html = html.replace('\n', '<br />')

  // Replace all images and links
  html = 
    html.replaceAll(reImgs, "<img src='$2' alt='$1' />")
      .replaceAll(reLinks, "<a target='_blank' href='$2'>$1</a>")
  
  console.log('\t>> issue body after:', JSON.stringify(html))
  return html
}
