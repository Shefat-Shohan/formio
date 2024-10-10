import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

type ToolbarProps = {
  editor: Editor | null;
  content: string | undefined;
};
export default function Toolbar({ editor, content }: ToolbarProps) {
  if (!editor) return null;
  return (
    <div className="border border-white/20 p-2 rounded-t">
      <div className="flex justify-start items-center gap-3 w-full  overflow-x-scroll md:overflow-x-hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-gray-700 text-white p-2 rounded-lg"
              : "p-2"
          }
        >
          <Bold className="size-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-gray-700 text-white p-2 rounded-lg"
              : "p-2"
          }
        >
          <Italic className="size-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-gray-700 text-white p-2 rounded-lg"
              : "p-2"
          }
        >
          <Underline className="size-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-gray-700 text-white p-2 rounded-lg"
              : "p-2"
          }
        >
          <Strikethrough className="size-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("Heading", { level: 2 })
              ? "bg-gray-700 text-white p-2 rounded-lg"
              : "p-2"
          }
        >
          <Heading2 className="size-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-gray-700 text-white p-2 rounded-lg"
              : "p-2"
          }
        >
          <List className="size-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-gray-700 text-white p-2 rounded-lg"
              : "p-2"
          }
        >
          <ListOrdered className="size-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={editor.isActive("blockquote") ? "bg-gray-700 text-white p-2 rounded-lg" : "p-2"}
        >
          <Quote className="size-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-gray-700 text-white p-2 rounded-lg"
              : "p-2"
          }
        >
          <Code className="size-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo") ? "bg-gray-700 text-white rounded-lg" : "p-2"
          }
        >
          <Undo className="size-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-gray-700 text-white p-2 rounded-lg"
              : "p-2"
          }
        >
          <Redo className="size-4" />
        </button>
      </div>
    </div>
  );
}
