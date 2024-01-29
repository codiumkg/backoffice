import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { FC, forwardRef, useEffect } from "react";

import Typography from "../Typography/Typography";
import EditorMenu from "./EditorMenu";

import styles from "./TextEditor.module.scss";

interface Props {
  value: string;
  label?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: string;
  editable?: boolean;
}

const TextEditor: FC<Props> = forwardRef<any, Props>(function InputComponent(
  { value, label, onChange, editable = true, placeholder = "" },
  ref
) {
  const editor = useEditor({
    extensions: [Placeholder.configure({ placeholder }), StarterKit, Underline],
    content: value,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (value === editor?.getHTML()) return;

    editor?.commands.setContent(value);
  }, [value, editor]);

  return (
    <>
      {label && <Typography variant="body3">{label}</Typography>}
      <div className={styles.container}>
        <EditorMenu editor={editor} />
        <EditorContent editor={editor} ref={ref} />
      </div>
    </>
  );
});

export default TextEditor;
