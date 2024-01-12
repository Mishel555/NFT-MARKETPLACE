import { useState } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

interface IProps {
  content: ContentState;
}

const RichContent = ({ content }: IProps) => {
  const [editorState, setEditorState] = useState<EditorState>(
    () => EditorState.createWithContent(content),
  );

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      readOnly
    />
  );
};

export default RichContent;
