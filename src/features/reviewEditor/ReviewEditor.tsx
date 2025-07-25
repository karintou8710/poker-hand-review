import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import { Placeholder, UndoRedo } from "@tiptap/extensions";
import CardNode from "./extensitons/card-node";
import HardBreak from "@tiptap/extension-hard-break";
import { transformPreLineHTML } from "./extensitons/paste";
import {
  REVIEW_CONTENT_KEY,
  useSyncLocalStorage,
} from "../../shares/hooks/useSyncLocalStorage";
import { useEffect } from "react";

import "./ReviewEditor.css";

const extensions = [
  Document,
  Text,
  Paragraph,
  CardNode,
  HardBreak,
  Placeholder.configure({
    placeholder: "Please enter your hand review here.",
  }),
  UndoRedo,
];

const ReviewEditor = () => {
  const [content, setContent] = useSyncLocalStorage(REVIEW_CONTENT_KEY, "");

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      transformPastedHTML: (html: string) => {
        return transformPreLineHTML(html);
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // contentが変更された時にエディターを更新
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [editor, content]);

  return <EditorContent editor={editor} />;
};

export default ReviewEditor;
