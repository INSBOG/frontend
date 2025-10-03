// useFileUpload.js
import { useState, useEffect } from "react";

export const useFileUpload = () => {
  const [files, setFiles] = useState([]);
  const [fileStates, setFileStates] = useState({});

  useEffect(() => {
    files.forEach((file) => {
      if (!fileStates[file.name]) {
        setFileStates((prev) => ({
          ...prev,
          [file.name]: { stage: "upload", progress: 0 },
        }));
      } else {
        const { stage, progress } = fileStates[file.name];
        if (stage === "upload" && progress < 100) {
          const interval = setInterval(() => {
            setFileStates((prev) => {
              const curr = prev[file.name];
              if (!curr || curr.stage !== "upload") return prev;
              let next = Math.min(100, curr.progress + Math.random() * 20);
              if (next >= 100) {
                return {
                  ...prev,
                  [file.name]: { stage: "convert", progress: 0 },
                };
              }
              return {
                ...prev,
                [file.name]: { ...curr, progress: Math.floor(next) },
              };
            });
          }, 300);
          return () => clearInterval(interval);
        }
        if (stage === "convert" && progress < 100) {
          const interval = setInterval(() => {
            setFileStates((prev) => {
              const curr = prev[file.name];
              if (!curr || curr.stage !== "convert") return prev;
              let next = Math.min(100, curr.progress + Math.random() * 25);
              if (next >= 100) {
                return {
                  ...prev,
                  [file.name]: { stage: "done", progress: 100 },
                };
              }
              return {
                ...prev,
                [file.name]: { ...curr, progress: Math.floor(next) },
              };
            });
          }, 350);
          return () => clearInterval(interval);
        }
      }
    });
  }, [files, fileStates]);

  const addFiles = (newFiles) => {
    setFiles((prev) => {
      const names = prev.map((f) => f.name);
      return [...prev, ...newFiles.filter((f) => !names.includes(f.name))];
    });
  };

  const removeFile = (name) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
    setFileStates((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleSend = (file) => {
    alert(`Validando archivo: ${file.name}`);
  };

  return {
    files,
    fileStates,
    addFiles,
    removeFile,
    handleDrop,
    handleSend,
  };
}