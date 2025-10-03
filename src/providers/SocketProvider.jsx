import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socketUri = import.meta.env.VITE_API_URL

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {
  const [socket] = useState(
    io(socketUri, {
      transports: ["websocket", "polling"],
    })
  );
  const [messages, setMessages] = useState({});
  const [progress, setProgress] = useState([])

  useEffect(() => {
    socket.on("connect", () => console.log("Conectado al servidor"));
    socket.on("disconnect", () => console.log("Desconectado del servidor"));

    socket.on("update_reports", (msg) =>
      setMessages({ ...messages, report: msg })
    );

    socket.on("progress", msg => setProgress([
      ...progress,
      JSON.parse(msg)
    ]))

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update_reports");
      socket.off("progress");
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        messages,
        progress
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };

export default SocketContext;
