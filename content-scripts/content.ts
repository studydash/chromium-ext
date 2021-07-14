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
        const renderedContent = RenderCustom(elEditor.value)
        ;(window as any).PopulatePreview(renderedContent)
        e.preventDefault()
      }
    })
  }
}

// Write code that scans the DOM and replace all innerHTML of `<div class="edit-comment-hide"></div>` with
// our own custom rendered content.

const reLinks = /\[(.*?)\]\((.*?)\)/g

function RenderCustom(content: string): string {
  console.log('\t>> Calling renderCustom(string)')
  let body = content

  body = body.replaceAll('- [ ]', '<input type="checkbox">')
  body = body.replaceAll('[ ]', '<input type="checkbox">')

  // Perform markdown formatting
  // console.log('\t >>body:', body)
  body = body.replaceAll(/### .*?\n/g, m => `<h3>${m.slice(4, -2)}</h3>`)
  // body = body.replaceAll(/_.*_/g, '<em>$&</em>') // Almost works but doesn't eliminate the underscores
  body = body.replaceAll(/_.*?_/g, m => `<i>${m.slice(1, -1)}</i>`)
  body = body.replaceAll(/\*\*.*?\*\*/g, m => `<b>${m.slice(2, -2)}</b>`) // Use RegEx-- but need to escape!
  body = body.replaceAll(/\n/g, '<br />')

  body = body.replace('\n', '<br />')

  // Replace all links
  body = body.replaceAll(reLinks, "<a target='_blank' href='$2'>$1</a>")
  
  console.log('\t>> issue body after:', JSON.stringify(body))
  return body
}
