import {Label} from 'reactstrap'
// ** Third Party Components
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import '@src/@core/scss/react/libs/editor/editor.scss'
import {useEffect, useState} from 'react'

function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType()

  if (type === 'atomic') {
    return {
      component: () => <></>,
      editable: false,
    }
  }
}

const EditorField = ({
  label,
  required,
  onChange = () => {},
  value,
  maximum = 10000,
}) => {
  // ** State

  const [state, setState] = useState(() => {
    if (value) {
      const blocksFromHtml = htmlToDraft(value)
      const {contentBlocks, entityMap} = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      )
      return EditorState.createWithContent(contentState)
    }
    return EditorState.createEmpty()
  })

  useEffect(() => {
    if (state) {
      const html = draftToHtml(convertToRaw(state.getCurrentContent()))
      if (html !== '<p></p>') {
        onChange(html)
      }
    }
  }, [state])

  return (
    <>
      {label && (
        <Label className="form-label fw-bolder">
          {label}{' '}
          {required && (
            <sup
              style={{
                color: '#FF0000',
                fontSize: '1rem',
                top: '0',
              }}
            >
              *
            </sup>
          )}
        </Label>
      )}
      <Editor
        editorState={state}
        onEditorStateChange={data => setState(data)}
        blockRendererFn={myBlockRenderer}
      />
      {required && (
        <small className="text-muted w-100 mt-1">
          (Maximum {maximum} characters)
        </small>
      )}
    </>
  )
}

export default EditorField
