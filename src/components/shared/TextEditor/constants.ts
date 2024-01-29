import { Editor } from "@tiptap/react";
import { ReactElement } from "react";

export interface ToolbarOption {
  name: string;
  icon: ReactElement<SVGElement> | string;
  getIsActive: (editor?: Editor) => boolean;
  onClick: (editor?: Editor) => void;
}

export const TOOLBAR_OPTIONS: ToolbarOption[] = [
  {
    name: "bold",
    icon: "B",
    getIsActive: (editor) => editor?.isActive("bold") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleBold().run(),
  },
  {
    name: "italic",
    icon: "I",
    getIsActive: (editor) => editor?.isActive("italic") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleItalic().run(),
  },
  {
    name: "underline",
    icon: "U",
    getIsActive: (editor) => editor?.isActive("underline") ?? false,

    onClick: (editor) => editor?.chain().focus().toggleUnderline().run(),
  },
  {
    name: "strike",
    icon: "S",
    getIsActive: (editor) => editor?.isActive("strike") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleStrike().run(),
  },
  {
    name: "bullet-list",
    icon: "BL",
    getIsActive: (editor) => editor?.isActive("bulletList") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleBulletList().run(),
  },
  {
    name: "ordered-list",
    icon: "OL",
    getIsActive: (editor) => editor?.isActive("orderedList") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleOrderedList().run(),
  },
];
