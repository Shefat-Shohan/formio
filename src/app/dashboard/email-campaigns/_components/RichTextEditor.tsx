import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./Toolbar";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import { useEffect } from "react";
type TextEditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export default function RichTextEditor({
  onChange,
  initialContent,
}: TextEditorProps) {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      Heading.configure({ levels: [1,2,3] }),
    ],
    content: initialContent || " <p>Please select a form.</p> ",

    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-60 max-h-96 overflow-y-auto cursor-text rounded-b-md border p-4 border-white/15 p-2",
      },
    },
    immediatelyRender: true,
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div>
      <Toolbar editor={editor} content={initialContent} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
}
