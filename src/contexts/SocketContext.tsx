import React, { createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

const SocketCtx = createContext<Socket | null>(null);
export const useSocket = () => {
  const s = useContext(SocketCtx);
  if (!s) throw new Error("Socket not ready");
  return s;
};

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const socket = useMemo(
    () => io(import.meta.env.VITE_WS_URL || "https://collaborative-document-annotation-system.onrender.com/api"),
    []
  );
  return <SocketCtx.Provider value={socket}>{children}</SocketCtx.Provider>;
}
