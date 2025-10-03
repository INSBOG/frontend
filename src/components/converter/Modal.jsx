// App.js
import { useFileUpload } from "../../hooks/useFileUpload";
import { FileUpload } from "./FileUpload";
import { Modal } from "antd";

export const ModalConverter = ({open, onClose}) => {
  const {
    files,
    fileStates,
    addFiles,
    removeFile,
    handleDrop,
    handleSend,
  } = useFileUpload();

  return (
    <Modal
        title="Convertir Archivos"
        width={600}
        open={open}
        onCancel={onClose}
        footer={null}
        destroyOnClose={true}
    >
    <FileUpload
      files={files}
      fileStates={fileStates}
      addFiles={addFiles}
      removeFile={removeFile}
      handleDrop={handleDrop}
      handleSend={handleSend}
    />
    </Modal>
  );
}