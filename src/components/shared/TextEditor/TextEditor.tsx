import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import CodeBlock from "@tiptap/extension-code-block-lowlight";
import YouTube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
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
  const [showImageModal, setShowImageModal] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);

  const [youtubeLink, setYoutubeLink] = useState("");
  const [imageLink, setImageLink] = useState("");

  const editor = useEditor({
    extensions: [
      Placeholder.configure({ placeholder }),
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "rich-text-bullet-list" } },
      }),
      Underline,
      CodeBlock.configure({ lowlight, defaultLanguage: "python" }),
      YouTube.configure({
        allowFullscreen: true,
        interfaceLanguage: "ru",
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rich-text-image",
        },
        allowBase64: true,
      }),
      Heading,
    ],
    content: value,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  const handleImageClick = () => {
    editor?.commands.setImage({ src: imageLink });

    setImageLink("");
    setShowImageModal(false);
  };

  const handleYoutubeClick = () => {
    editor?.commands.setYoutubeVideo({
      src: youtubeLink,
    });

    setYoutubeLink("");

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
          onImageClick={() => setShowImageModal(true)}
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
          autoFocus
          onChangeCallback={(value) => setYoutubeLink(value)}
        />
      </Modal>

      <Modal
        title="Картинка"
        subtitle="Вставьте ссылку на картинку"
        show={showImageModal}
        onPrimaryClick={handleImageClick}
        onClose={() => setShowImageModal(false)}
      >
        <CustomInput
          name="image"
          autoFocus
          onChangeCallback={(value) => setImageLink(value)}
        />
      </Modal>
    </>
  );
});

export default TextEditor;
