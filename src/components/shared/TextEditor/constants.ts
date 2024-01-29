import { Editor } from "@tiptap/react";

import {
  FaCode,
  FaBold,
  FaItalic,
  FaYoutube,
  FaUnderline,
  FaStrikethrough,
} from "react-icons/fa";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { IconType } from "react-icons/lib";

export interface ToolbarOption {
  name: string;
  icon: IconType;
  getIsActive: (editor?: Editor) => boolean;
  onClick: (editor?: Editor) => void;
}

export const TOOLBAR_OPTIONS: ToolbarOption[] = [
  {
    name: "bold",
    icon: FaBold,
    getIsActive: (editor) => editor?.isActive("bold") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleBold().run(),
  },
  {
    name: "italic",
    icon: FaItalic,
    getIsActive: (editor) => editor?.isActive("italic") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleItalic().run(),
  },
  {
    name: "underline",
    icon: FaUnderline,
    getIsActive: (editor) => editor?.isActive("underline") ?? false,

    onClick: (editor) => editor?.chain().focus().toggleUnderline().run(),
  },
  {
    name: "strike",
    icon: FaStrikethrough,
    getIsActive: (editor) => editor?.isActive("strike") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleStrike().run(),
  },
  {
    name: "bullet-list",
    icon: GoListUnordered,
    getIsActive: (editor) => editor?.isActive("bulletList") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleBulletList().run(),
  },
  {
    name: "ordered-list",
    icon: GoListOrdered,
    getIsActive: (editor) => editor?.isActive("orderedList") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleOrderedList().run(),
  },
  {
    name: "code-block",
    icon: FaCode,
    getIsActive: (editor) => editor?.isActive("codeBlock") ?? false,
    onClick: (editor) => editor?.chain().focus().toggleCodeBlock().run(),
  },
  {
    name: "youtube",
    icon: FaYoutube,
    getIsActive: (editor) => editor?.isActive("youtube") ?? false,
    onClick: (editor) => {
      if (!editor) return;
    },
  },
];
