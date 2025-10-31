import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import { useSocket } from "../../contexts/SocketContext";

export default function Sidebar({ documentId }: { documentId: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string|null>(null);
  const socket = useSocket();

  async function loadMore() {
    const { data } = await api.get("/annotations", { params: { documentId, cursor, limit: 200 }});
    setItems(prev => [...prev, ...data.items]);
    setCursor(data.nextCursor);
  }

  useEffect(() => { setItems([]); setCursor(null); loadMore(); }, [documentId]);

  useEffect(() => {
    socket.emit("room:join", documentId);
    const onNew = (ann:any) => setItems(prev => [ann, ...prev]);
    const onDel = ({ _id }:any) => setItems(prev => prev.filter(i => i._id !== _id));
    socket.on("annotation:new", onNew);
    socket.on("annotation:deleted", onDel);
    return () => { socket.off("annotation:new", onNew); socket.off("annotation:deleted", onDel); };
  }, [documentId]);

  return (
    <aside className="sidebar">
      <h3>Annotations ({items.length})</h3>
      <div className="list">
        {items.map((a) => (
  <div className="ann" key={a._id}>
    <div className="quote">“{a.quote}”</div>
    <div className="comment">{a.comment}</div>
    <div className="meta">
      by <b>{a.userId || "unknown"}</b> •{" "}
      {new Date(a.createdAt).toLocaleString()}
    </div>
  </div>
))}
      </div>
      {cursor && <button onClick={loadMore}>Load more</button>}
    </aside>
  );
}
