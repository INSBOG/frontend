/* eslint-disable react/prop-types */
import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Modal, Select, Upload } from "antd";
import dayjs from "dayjs";
import useUpload from "../hooks/useUpload";

const ModalUpload = ({
  open = false,
  form = null,
  loading = false,
  context = null,
  onClose = () => {},
  handleSubmit = () => {},
  handleBeforeUpload = () => {},
}) => {
  const { dptos } = useUpload();
  return (
    <Modal
      title="Subir data"
      width={400}
      open={open}
      onClose={onClose}
      onCancel={onClose}
      footer={null}
    >
      {context}
      <Form onFinish={handleSubmit} layout="vertical" form={form}>
        <Form.Item
          label="Departamento"
          name="department"
          rules={[
            {
              required: true,
              message: "Por favor seleccione un departamento",
            },
          ]}
        >
          <Select placeholder="Seleccione departamento">
            {dptos?.map(({ _id, dpto }) => (
              <Select.Option key={_id}>{dpto}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Mes"
          name="month"
          rules={[
            {
              required: true,
              message: "Por favor seleccione un mes",
            },
          ]}
        >
          <DatePicker
            picker="month"
            className="w-full"
            maxDate={dayjs().add(-1, "month")}
            minDate={dayjs().add(-3, "years")}
          />
        </Form.Item>
        <Form.Item
          label="Archivo"
          name="file"
          rules={[
            {
              required: true,
              message: "Por favor seleccione un archivo",
            },
          ]}
        >
          <Upload
            className="w-full"
            beforeUpload={handleBeforeUpload}
            multiple={false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Button type="primary" block htmlType="submit" loading={loading}>
          Enviar
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalUpload;
