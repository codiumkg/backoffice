import { Editor } from "@tiptap/react";
import cn from "classnames";
import styles from "./TextEditor.module.scss";
import { TOOLBAR_OPTIONS, ToolbarOption } from "./constants";

interface Props {
  editor: Editor | null;
  onYoutubeClick: () => void;
  onImageClick: () => void;
}

function EditorMenu({ editor, onYoutubeClick, onImageClick }: Props) {
  if (!editor) {
    return null;
  }

  const handleClick = (option: ToolbarOption) => {
    if (option.name === "youtube") {
      onYoutubeClick();
    } else if (option.name === "image") {
      onImageClick();
    }

    option.onClick(editor);
  };

  return (
    <div className={styles["menu-container"]}>
      {TOOLBAR_OPTIONS.map((option) => (
        <div
          className={cn(
            styles["menu-option"],
            option.getIsActive(editor) && styles["menu-option-active"]
          )}
          key={option.name}
          onClick={() => handleClick(option)}
        >
          {<option.icon />}
        </div>
      ))}
    </div>
  );
}

export default EditorMenu;
