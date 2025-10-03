import { Form, Progress, Tag } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import apiInstance from "../instances";
import SocketContext from "../providers/SocketProvider";
import useStore from "../store/app";
import { ReportStatus } from "../types/report";
import useUserData from "./auth/useUserData";
import useAlert from "./useAlert";
import useLocation from "./useLocation";

const useDashboard = ({
  onCloseReport = () => {},
  onCloseUpload = () => {},
}) => {
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const { setLoading } = useStore();
  const { showSuccessMessage, context, showErrorMessage } = useAlert();
  const { user } = useUserData();
  const [reportData, setReportData] = useState([]);
  const [selected, setSelected] = useState(null);
  const { data } = useLocation();
  const { messages, progress } = useContext(SocketContext);

  const columns = [
    {
      title: "Departamento",
      dataIndex: "dpto",
      key: "dpto",
      sorter: (a, b) => a.department.localeCompare(b.department), // Ordena alfabéticamente por el nombre del departamento
      render: ({ dpto }) => dpto,
    },
    {
      title: "Mes",
      dataIndex: "month",
      key: "month",
      sorter: (a, b) => a.month.localeCompare(b.month), // Ordena alfabéticamente por el nombre del mes
    },
    {
      title: "Usuario",
      dataIndex: "usr",
      key: "usr",
      render: (usr) => usr?.username || "Anónimo",
      sorter: (a, b) => a.usr?.username.localeCompare(b.usr?.username), // Ordena por el nombre del usuario
    },
    {
      title: "Fecha de subida",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(), // Ordena por la fecha de subida (numérico)
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"), // Formato de fecha opcional
    },
    {
      title: "Progreso",
      dataIndex: "progress",
      key: "progress",
      render: (progress) => <Progress percentPosition={{
        align: "center",
        type: "inner"
      }} size={["100%", 20]} percent={progress} />,
    },
    {
      title: "Estado del reporte",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.filename.localeCompare(b.filename),
      align: "center",
      width: "160px",
      render: (status) => {
        const { color, text, icon } = ReportStatus[status];
        return (
          <Tag
            className="inline-flex gap-1 items-center"
            icon={icon}
            color={color}
          >
            {text}
          </Tag>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      const { error, message } = messages.report;
      if (error) return showErrorMessage(message);
      showSuccessMessage(message);
    }
    getData();
  }, [messages]);

  useEffect(() => {
    if (progress && progress.length > 0) { 
      const [{ report, step }] = progress;
      if (report) {
        const index = reportData.findIndex((r) => r._id === report);
        if (index !== -1) {
          reportData[index].progress = parseInt(step * 100);
          setReportData([...reportData]);
        }
      }
    }
  }, [progress]);

  const canDownload = () => {
    const found = reportData.find((r) => r._id == selected[0]);
    return selected.length > 0 && found?.status === 2;
  };

  const handleSubmit = (values) => {
    const fd = new FormData();

    values.month = values.month.format("YYYY-MM");
    values.user = user.id;
    delete values.file;

    fd.append("file", file);
    fd.append("data", JSON.stringify(values));

    setLoading(true);

    apiInstance
      .post("/api/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        showSuccessMessage(data.message);
        form.resetFields();
        getData();
        onCloseUpload();
      })
      .catch(({ response }) => {
        showErrorMessage(
          response.data?.error || response.data?.message || response.data
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBeforeUpload = (file) => {
    setFile(file);
    return false;
  };

  const handleDelete = () =>
    apiInstance
      .post(`/api/delete-reports`, {
        selected,
      })
      .then(({ data }) => {
        showSuccessMessage(data.message);
        getData();
        setSelected(null);
        getData();
      })
      .catch(({ response }) => {
        showErrorMessage(
          response.data?.error || response.data?.message || response.data
        );
      });

  const getData = () => {
    setLoading(true);
    apiInstance
      .get("/api/reports")
      .then(({ data }) => {
        setReportData(
          data.map((report) => ({
            ...report,
            date: dayjs(report.date).format("YYYY-MM-DD HH:mm:ss"),
            key: report._id,
            progress: report.status === 2 ? 100 : 0,
          }))
        );
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const { data } = await apiInstance.post(`/api/download`, selected);
  
      let blob, filename;
  
      if (data.single_file) {
        // Procesar archivo individual
        const { filename: originalName, content } = data.data;
        const bytesString = atob(content);
        const bytes = new Uint8Array(bytesString.length);
        for (let i = 0; i < bytesString.length; i++) {
          bytes[i] = bytesString.charCodeAt(i);
        }
        const fileExtension = originalName.split('.').pop();
        const mimeType = fileExtension === 'xlsx' 
          ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          : 'application/octet-stream';
        
        blob = new Blob([bytes], { type: mimeType });
        filename = originalName;
      } else {
        // Procesar archivo ZIP
        const bytesString = atob(data.data);
        const bytes = new Uint8Array(bytesString.length);
        for (let i = 0; i < bytesString.length; i++) {
          bytes[i] = bytesString.charCodeAt(i);
        }
        blob = new Blob([bytes], { type: "application/zip" });
        filename = `download_${dayjs().format("YYYY-MM-DD")}.zip`;
      }
  
      // Descargar el archivo
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  
      // Limpiar y mostrar mensaje
      setSelected(null);
      showSuccessMessage(data.message);
      onCloseReport();
    } catch (error) {
      const response = error.response;
      showErrorMessage(
        response?.data?.error || 
        response?.data?.message || 
        response?.data || 
        "Error al descargar los archivos"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    columns,
    data: reportData,
    open,
    context,
    form,
    selected,
    departments: data,
    handleSubmit,
    handleBeforeUpload,
    handleDownload,
    handleDelete,
    setSelected,
    canDownload,
    getData,
  };
};

export default useDashboard;
