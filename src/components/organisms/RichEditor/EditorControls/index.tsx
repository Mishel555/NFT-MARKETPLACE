import { useMemo } from 'react';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import styles from './style.module.scss';

interface IProps {
  editorState: EditorState;
  toggleBlockType: (type: string) => void;
  toggleInlineStyle: (type: string) => void;
}

const BLOCK_TYPES = [
  {
    label: 'P',
    style: 'unstyled',
  },
  {
    label: 'H1',
    style: 'header-one',
  },
  {
    label: 'H2',
    style: 'header-two',
  },
  {
    label: 'H3',
    style: 'header-three',
  },
  {
    label: 'H4',
    style: 'header-four',
  },
  {
    label: 'H5',
    style: 'header-five',
  },
  {
    label: 'H6',
    style: 'header-six',
  },
  {
    label: 'Blockquote',
    style: 'blockquote',
  },
  {
    label: 'UL',
    style: 'unordered-list-item',
  },
  {
    label: 'OL',
    style: 'ordered-list-item',
  },
  {
    label: 'Code Block',
    style: 'code-block',
  },
];

const INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD',
  },
  {
    label: 'Italic',
    style: 'ITALIC',
  },
  {
    label: 'Underline',
    style: 'UNDERLINE',
  },
  {
    label: 'Monospace',
    style: 'CODE',
  },
];

const EditorControls = ({
  editorState,
  toggleBlockType,
  toggleInlineStyle,
}: IProps) => {
  const {
    blockType,
    inlineType,
  } = useMemo(() => {
    const selection = editorState.getSelection();
    const inlineType = editorState.getCurrentInlineStyle();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return {
      blockType,
      inlineType,
    };
  }, [editorState]);

  return (
    <div className={styles.root}>
      {BLOCK_TYPES.map(({
        label,
        style,
      }) => (
        <button
          key={`${label}${style}`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType(style);
          }}
          className={classNames(styles.root__action, blockType === style && styles.root__action_active)}
        >
          {label}
        </button>
      ))}
      {INLINE_STYLES.map(({
        label,
        style,
      }) => (
        <button
          key={`${label}${style}`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle(style);
          }}
          className={classNames(styles.root__action, inlineType.has(style) && styles.root__action_active)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default EditorControls;
