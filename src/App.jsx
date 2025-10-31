import React, { useEffect, useState } from "react";
import { api } from "./api/client";
import SocketProvider from "./contexts/SocketContext";
import Uploader from "./components/Uploader";
import DocumentList from "./components/DocumentList";
import DocumentPage from "./pages/DocumentPage";
import "./styles.css";

export default function App() {
  const [docs, setDocs] = useState([]);
  const [current, setCurrent] = useState(null);

  async function refresh() {
    const { data } = await api.get("/documents");
    setDocs(data.data);
    
    if (!current && data[0]?._id) setCurrent(data[0]._id);
  }

  useEffect(() => { refresh(); }, []);

  return (
    <SocketProvider>
      <div className="app">
        <h2>Collaborative Annotation</h2>
        <Uploader onCreated={refresh} />
        <DocumentList docs={docs} current={current} onPick={setCurrent} />
        {current && <DocumentPage id={current} />}
      </div>
    </SocketProvider>
  );
}
