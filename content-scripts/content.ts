function attachCustomHandlers() {
  console.log('>> fire: attachCustomHandlers!')
  // Get the textarea element of the issue editor
  let elEditor = document.getElementsByName('issue[body]')?.[0] as HTMLTextAreaElement
  if (elEditor) {
    elEditor.addEventListener('keydown', e => {
      // const selectedText = window.getSelection()?.toString() ?? ''
      if ((e.ctrlKey && e.key === 'k')) {
        // elEditorView.setRangeText(`[${selectedText}](url)`)
        // elEditorView.setSelectionRange(elEditorView.selectionStart + selectedText.length + 3,
        //   elEditorView.selectionStart + selectedText.length + 6)
        // e.preventDefault()
      } else if (e.ctrlKey && e.key === 's') {
        console.log('\t>> trigger saveArticle()', JSON.stringify(elEditor.value))
        // renderWindow?.postMessage(JSON.stringify(elEditor.value), '*')
        e.preventDefault()
      }
    })
  }
}

// Write code that scans the DOM and replace all innerHTML of `<div class="edit-comment-hide"></div>` with
// our own custom rendered content.

const reLinks = /\[(.*?)\]\((.*?)\)/g

function renderCustom(cardNo: number) {
  console.log('>> Calling renderCustom()', cardNo)
  console.log("\t>> document.getElementsByClassName('edit-comment-hide')", document.getElementsByClassName('edit-comment-hide'))

  // Get the textarea element of the issue editor
  const elEditor = document.getElementsByName('issue[body]')[0]
  console.log('\t>> elEditor.innerHTML before:', JSON.stringify(elEditor.innerHTML))
  let body = elEditor.innerHTML

  body = body.replaceAll('- [ ]', '<input type="checkbox">&nbsp;')
  body = body.replaceAll('[ ]', '<input type="checkbox">&nbsp;')

  // Perform markdown formatting
  // console.log('\t >>body:', body)
  body = body.replaceAll(/### .*?\n/g, m => `<h3>${m.slice(4, -2)}</h3><br />`)
  // body = body.replaceAll(/_.*_/g, '<em>$&</em>') // Almost works but doesn't eliminate the underscores
  body = body.replaceAll(/_.*?_/g, m => `<i>${m.slice(1, -1)}</i>`)
  body = body.replaceAll(/\*\*.*?\*\*/g, m => `<b>${m.slice(2, -2)}</b>`) // Use RegEx-- but need to escape!
  body = body.replaceAll(/\n/g, '<br />')

  body = body.replace('\n', '<br />')

  // Replace all links
  body = body.replaceAll(reLinks, "<a target='_blank' href='$2'>$1</a>")
  
  console.log('\t>> issue body after:', JSON.stringify(body))

  document.getElementsByClassName('edit-comment-hide')[0].innerHTML = `<div style="padding: 20px">${body}</div>`
}
