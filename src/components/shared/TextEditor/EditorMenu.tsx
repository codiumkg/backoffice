import { Editor } from "@tiptap/react";
import cn from "classnames";
import styles from "./TextEditor.module.scss";
import { TOOLBAR_OPTIONS, ToolbarOption } from "./constants";

interface Props {
  editor: Editor | null;
}

function EditorMenu({ editor }: Props) {
  if (!editor) {
    return null;
  }

  const handleClick = (option: ToolbarOption) => {
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
          {option.icon}
        </div>
      ))}
    </div>
  );
}

export default EditorMenu;
