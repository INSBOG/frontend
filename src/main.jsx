import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import "./index.css";
import router from "./router";

import { ConfigProvider } from "antd";
import esES from "antd/es/locale/es_ES";
import { SocketProvider } from "./providers/SocketProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ConfigProvider locale={esES}>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </ConfigProvider>
  </AuthProvider>
);
