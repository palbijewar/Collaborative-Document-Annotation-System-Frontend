import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import TextViewer from "../components/DocumentViewer/TextViewer";
import Sidebar from "../components/annotations/Sidebar";
import NewAnnotationForm from "../components/annotations/NewAnnotationForm";

export default function DocumentPage({ id }: { id: string }) {
  const [doc, setDoc] = useState<any>(null);
  const [selection, setSelection] = useState<{start:number,end:number,quote:string}|null>(null);

  useEffect(() => { (async () => {
    const { data } = await api.get(`/documents/${id}`);
    setDoc(data);
  })(); }, [id]);

  if (!doc) return <div>Loading…</div>;

  return (
    <div className="doc-page">
      <div className="viewer">
        <TextViewer text={doc.linearText} onSelect={setSelection} />
        <NewAnnotationForm documentId={id} selection={selection} onDone={()=>setSelection(null)} />
      </div>
      <Sidebar documentId={id} />
    </div>
  );
}
