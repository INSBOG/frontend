/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { UserOutlined } from "@ant-design/icons";
import { Alert, Breadcrumb, Button, Dropdown, Space } from "antd";
import dayjs from "dayjs";
import { Key, Lock, LogOut, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import useSignOut from "../../hooks/auth/useSignOut";
import useUserData from "../../hooks/auth/useUserData";

import "dayjs/locale/es";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import useAccessKey from "../../hooks/useAccessKey";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale("es");

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children, breadcrumbs }) => {
  const { user, isAdmin } = useUserData();
  const signOut = useSignOut();
  const { register } = useAccessKey({})

  const daysRemaiingUntilPasswordExpires = dayjs().diff(
    dayjs.unix(user?.password_exp),
    "day"
  )

  const items = [
    {
      label: (
        <Link to={isAdmin() ? "/admin" : "#"}>
          <Space>
            <Shield size={15} />
            Administrador
          </Space>
        </Link>
      ),
      disabled: !isAdmin(),
      key: 0,
    },
    {
      label: (
        <Link to="/change-password">
          <Space>
            <Lock size={15} />
            Cambiar contraseña
          </Space>
        </Link>
      ),
      key: 1,
    },
    {
      label: <a onClick={register}>
        <Space>
          <Key size={15} />
          Registrar llave de acceso
        </Space>
      </a>,
      key: 2,

    },
    {
      type: "divider",
    },
    {
      label: (
        <a
          onClick={() => signOut()}
          style={{
            color: "red",
          }}
        >
          <Space>
            <LogOut size={15} />
            Salir
          </Space>
        </a>
      ),
      key: 3,
    },
  ];

  return (
    <main className="h-screen flex flex-col">
      <header className="bg-white text-center px-4 flex items-center justify-between">
        <Space size="large" className="min-w-[190px]">
          <img src="/ins.png" className="w-[100px]" />
          {/* <img src="/logo-ops.png" className="w-[100px]" /> */}
        </Space>
        <h1 className="text-2xl font-bold text-gray-700">
          Sistema de control de información (SICOIN)
        </h1>
        <div className="min-w-[190px]">
          {user && (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button size="large" type="link" icon={<UserOutlined />}>
                {user?.name}
              </Button>
            </Dropdown>
          )}
        </div>
      </header>
      {breadcrumbs && (
        <Breadcrumb className="p-4 bg-gray-100" items={breadcrumbs} />
      )}
      {daysRemaiingUntilPasswordExpires >= -3 && (
        <Alert
          message={`Su contraseña expirará el ${dayjs
            .unix(user?.password_exp)
            .format(
              "DD/MM/YYYY [a las] hh:mm A"
            )}, recuerde cambiarla antes de que expire.
          `}
          type="warning"
          showIcon
          closable
        />
      )}
      <div className="flex-1 flex flex-col p-4 bg-gray-200 overflow-y-auto">
        {children}
      </div>
    </main>
  );
};

export default DefaultLayout;
