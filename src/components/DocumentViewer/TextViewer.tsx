import React, { useRef } from "react";

export default function TextViewer({
  text, onSelect
}: { text: string; onSelect: (s:{start:number,end:number,quote:string})=>void }) {
  const preRef = useRef<HTMLPreElement>(null);

  function onMouseUp() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!preRef.current || !preRef.current.contains(range.commonAncestorContainer)) return;

    const all = preRef.current.textContent || "";
    const selected = sel.toString();
    const start = all.indexOf(selected);
    if (start === -1) return;
    const end = start + selected.length;
    onSelect({ start, end, quote: selected });
  }

  return <pre className="viewer-pre" ref={preRef} onMouseUp={onMouseUp}>{text}</pre>;
}
