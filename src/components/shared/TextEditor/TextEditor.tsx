import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import CodeBlock from "@tiptap/extension-code-block-lowlight";
import YouTube from "@tiptap/extension-youtube";
import { createLowlight } from "lowlight";
import { FC, forwardRef, useEffect, useState } from "react";

import Typography from "../Typography/Typography";
import EditorMenu from "./EditorMenu";

import styles from "./TextEditor.module.scss";
import Modal from "../Modal/Modal";
import CustomInput from "../CustomInput/CustomInput";

const lowlight = createLowlight();

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
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);

  const [youtubeLink, setYoutubeLink] = useState("");

  const editor = useEditor({
    extensions: [
      Placeholder.configure({ placeholder }),
      StarterKit,
      Underline,
      CodeBlock.configure({ lowlight, defaultLanguage: "python" }),
      YouTube.configure({
        allowFullscreen: true,
        interfaceLanguage: "ru",
      }),
    ],
    content: value,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  const handleYoutubeClick = () => {
    editor?.commands.setYoutubeVideo({
      src: youtubeLink,
    });

    setShowYoutubeModal(false);
  };

  useEffect(() => {
    if (value === editor?.getHTML()) return;

    editor?.commands.setContent(value);
  }, [value, editor]);

  return (
    <>
      {label && <Typography variant="body3">{label}</Typography>}
      <div className={styles.container}>
        <EditorMenu
          editor={editor}
          onYoutubeClick={() => setShowYoutubeModal(true)}
        />
        <EditorContent editor={editor} ref={ref} />
      </div>

      <Modal
        title="Youtube видео"
        subtitle="Вставьте ссылку на Youtube видео"
        show={showYoutubeModal}
        onPrimaryClick={handleYoutubeClick}
        onClose={() => setShowYoutubeModal(false)}
      >
        <CustomInput
          name="video"
          onChangeCallback={(value) => setYoutubeLink(value)}
        />
      </Modal>
    </>
  );
});

export default TextEditor;
