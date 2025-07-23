import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorProvider } from "@tiptap/react";
import HandInput from "./extensitons/hand-input";
import HardBreak from "@tiptap/extension-hard-break";

import "./ReviewEditor.css";

const extensions = [Document, Text, Paragraph, HandInput, HardBreak];

const content = "<p>Hello World!</p>";

const ReviewEditor = () => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      editorProps={{
        transformPastedHTML(html) {
          // text/htmlでは改行が\nだが、ProseMirrorは認識しないのでHTML改行に変換
          return html.replaceAll(/\n/g, "<br/>");
        },
      }}
    >
      {" "}
    </EditorProvider>
  );
};

export default ReviewEditor;
