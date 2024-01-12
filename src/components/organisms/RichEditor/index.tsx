import { useCallback, useRef, useState } from 'react';
import { RichUtils, Editor, EditorState, EditorCommand, ContentState } from 'draft-js';
import EditorControls from './EditorControls';

import 'draft-js/dist/Draft.css';
import styles from './style.module.scss';

interface IProps {
  defaultState?: ContentState;
  onSave: (state: ContentState) => void;
}

const RichEditor = ({
  defaultState,
  onSave,
}: IProps) => {
  const editorRef = useRef<Editor | null>(null);
  const [editorState, setEditorState] = useState<EditorState>(() =>
    defaultState ? EditorState.createWithContent(defaultState) : EditorState.createEmpty());

  const focus = useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    editorRef.current.focus();
  }, []);

  const toggleBlockType = useCallback((type: string) => {
    const newState = RichUtils.toggleBlockType(editorState, type);

    setEditorState(newState);
  }, [editorState]);

  const toggleInlineStyle = useCallback((type: string) => {
    const newState = RichUtils.toggleInlineStyle(editorState, type);

    setEditorState(newState);
  }, [editorState]);

  // ctrl+b / ctrl+i...
  const handleKeyCommand = useCallback((command: EditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }, []);

  const saveContent = useCallback(async () => {
    try {
      const contentState = editorState.getCurrentContent();

      onSave(contentState);
    } catch (e) {
      console.log(e);
    }
  }, [onSave, editorState]);

  return (
    <div className={styles.root}>
      <EditorControls
        editorState={editorState}
        toggleBlockType={toggleBlockType}
        toggleInlineStyle={toggleInlineStyle}
      />
      <div onClick={focus} className={styles.root__wrapper}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder="Write content..."
          spellCheck
        />
      </div>
      <div className={styles.root__actions}>
        <button onClick={saveContent} className={styles.root__actions_save}>
          SAVE
        </button>
      </div>
    </div>
  );
};

export default RichEditor;
