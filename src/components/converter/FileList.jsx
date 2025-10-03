// FileList.js
import React from "react";
import { FileItem } from "./FileItem";

export const FileList = ({ files, fileStates, onSend, onRemove }) => {
  if (!files.length) return null;
  return (
    <ul className="space-y-2">
      {files.map((file) => (
        <FileItem
          key={file.name}
          file={file}
          state={fileStates[file.name] || { stage: "upload", progress: 0 }}
          onSend={onSend}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}