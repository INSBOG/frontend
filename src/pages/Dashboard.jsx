import {
  CloudUploadOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { Button, Card, Divider, Popconfirm, Space, Table } from "antd";
import { DownloadCloud, FileDown, Repeat2Icon, RotateCw } from "lucide-react";
import ModalUpload from "../components/ModalUpload";
import useDashboard from "../hooks/useDashboard";
import useDisclosure from "../hooks/useDisclosure";
import useStore from "../store/app";
import DefaultLayout from "./layouts/default";
import { ModalConverter } from "../components/converter/Modal";

const Dashboard = () => {
  const {
    open: openUpload,
    onClose: onCloseUpload,
    onOpen: onOpenUpload,
  } = useDisclosure();
  const {
    open: openConvert,
    onClose: onCloseConvert,
    onOpen: onOpenConvert,
  } = useDisclosure();
  const {
    form,
    handleBeforeUpload,
    handleSubmit,
    context,
    data,
    setSelected,
    selected,
    columns,
    handleDownload,
    handleDelete,
    canDownload,
    getData,
  } = useDashboard({
    onCloseUpload,
  });

  const { loading } = useStore();

  return (
    <DefaultLayout
      breadcrumbs={[
        {
          title: "Inicio",
        },
      ]}
    >
      {context}
      <Card className="w-full h-auto">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          {/* <Button type="primary" icon={<Repeat2Icon size={14} />} onClick={onOpenConvert} loading={loading}>
            <span>Conversor de archivos</span>
          </Button> */}
          <Space.Compact>
            <Button
              type="primary"
              icon={<RotateCw size={14} />}
              onClick={getData}
              loading={loading}
            />
            <Popconfirm
              title="¿Estás seguro de eliminar este conjunto de datos?"
              onConfirm={() => handleDelete(selected)}
              okText="Sí"
              cancelText="No"
            >
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                disabled={!selected || !(selected?.length > 0) || loading}
                danger
              >
                Eliminar
              </Button>
            </Popconfirm>
            {/* <Button
              type="primary"
              icon={<FileWordFilled />}
              disabled={!selected || loading}
            >
              Generar word
            </Button> */}
            <Button
              type="primary"
              icon={<FileDown size={15} />}
              onClick={handleDownload}
              disabled={!selected || !canDownload()}
              loading={loading}
            >
              Descargar
            </Button>
            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              onClick={onOpenUpload}
              disabled={loading}
            >
              Subir data
            </Button>
          </Space.Compact>
        </div>
        <Table
          loading={loading}
          bordered
          dataSource={data}
          columns={columns}
          size="small"
          pagination={{
            pageSize: 10,
          }}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selected,
            onChange: (selectedRowKeys) => setSelected(selectedRowKeys),
          }}
        />
      </Card>
      <ModalUpload
        open={openUpload}
        onClose={onCloseUpload}
        form={form}
        context={context}
        loading={loading}
        handleSubmit={handleSubmit}
        handleBeforeUpload={handleBeforeUpload}
      />
      <ModalConverter
        open={openConvert}
        onClose={onCloseConvert}
      />
    </DefaultLayout>
  );
};

export default Dashboard;
