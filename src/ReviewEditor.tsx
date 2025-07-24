import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorProvider } from "@tiptap/react";
import { Placeholder, UndoRedo } from "@tiptap/extensions";
import HandInput from "./extensitons/hand-input";
import HardBreak from "@tiptap/extension-hard-break";

import "./ReviewEditor.css";

const extensions = [
  Document,
  Text,
  Paragraph,
  HandInput,
  HardBreak,
  Placeholder.configure({
    placeholder: "Please enter your hand review here.",
  }),
  UndoRedo,
];

const content = "";

const ReviewEditor = () => {
  return (
    <EditorProvider extensions={extensions} content={content}></EditorProvider>
  );
};

export default ReviewEditor;
