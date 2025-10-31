import React from "react";

export default function DocumentList({
  docs, current, onPick
}: { docs: any[]; current: string|null; onPick: (id:string)=>void }) {
  return (
    <div className="doc-list">
      {docs.map(d => (
        <button key={d._id} className={current===d._id ? "active" : ""} onClick={()=>onPick(d._id)}>
          {d.title} <small>({d.type})</small>
        </button>
      ))}
    </div>
  );
}
