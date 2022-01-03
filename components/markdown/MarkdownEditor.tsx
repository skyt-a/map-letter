import { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

type MarkdownEditorProps = {
  content: string;
  setContent: (value: string) => void;
};

const MarkdownEditor: FC<MarkdownEditorProps> = ({ content, setContent }) => {
  return (
    <div>
      <ReactMde value={content} onChange={setContent} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export { MarkdownEditor };
