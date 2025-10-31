import React, { useState } from "react";
import { api } from "../../api/client";
import { getGuestId } from "../../utils/quest";

export default function NewAnnotationForm({
  documentId,
  selection,
  onDone,
}: {
  documentId: string;
  selection: { start: number; end: number; quote: string } | null;
  onDone: () => void;
}) {
  const [comment, setComment] = useState("");

  if (!selection) return <div className="hint">Select some text to annotate.</div>;
  const sel = selection; // ✅ narrowed type

 async function submit(e: React.FormEvent) {
  e.preventDefault();
  const guestId = getGuestId();

  await api.post("/annotations", {
    documentId,
    start: sel.start,
    end: sel.end,
    comment,
    userId: guestId,
  });

  setComment("");
  onDone();
}

  return (
    <form onSubmit={submit} className="new-ann">
      <div className="sel">
        Selected: “{sel.quote.slice(0, 120)}
        {sel.quote.length > 120 ? "…" : ""}”
      </div>
      <textarea
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment"
      />
      <button type="submit">Add Annotation</button>
    </form>
  );
}
