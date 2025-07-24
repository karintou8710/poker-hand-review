import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorProvider } from "@tiptap/react";
import { Placeholder, UndoRedo } from "@tiptap/extensions";
import CardNode from "./extensitons/card-node";
import HardBreak from "@tiptap/extension-hard-break";
import { transformPreLineHTML } from "./extensitons/paste";

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

const content = "";

const ReviewEditor = () => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      editorProps={{
        transformPastedHTML: (html) => {
          html = transformPreLineHTML(html);
          return html;
        },
      }}
    ></EditorProvider>
  );
};

export default ReviewEditor;
