import { Tabs } from "antd";

const items = [
  {
    key: 1,
    label: "Usuarios",
    children: <div>Usuarios</div>,
  },
  {
    key: 2,
    label: "Configuración",
    children: <div>Configuracion</div>,
  },
];

const AdminTabs = () => {
  return <Tabs items={items} />;
};

export default AdminTabs;
