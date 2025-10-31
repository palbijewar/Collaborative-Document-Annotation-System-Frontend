import React, { useState } from "react";
import { api } from "../api/client";

export default function Uploader({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [linearText, setLinearText] = useState("");
  const [file, setFile] = useState<File | null>(null);

 async function submit(e: React.FormEvent) {
  e.preventDefault();

  if (!title) return alert("Title required");

  try {
   if (file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);

  formData.append("linearText", linearText || "Placeholder text");

  await api.post("/documents/pdf", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
} else {
      if (!linearText.trim()) return alert("Enter text for non-PDF upload");
      await api.post("/documents/text", { title, linearText });
    }

    setTitle("");
    setLinearText("");
    setFile(null);
    onCreated();
  } catch (err: any) {
    console.error("Upload error:", err.response?.data || err.message);
    alert(err.response?.data?.error || "Upload failed. Check console.");
  }
}

  return (
    <form onSubmit={submit} className="uploader">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <textarea rows={4} value={linearText} onChange={e=>setLinearText(e.target.value)} placeholder="Paste text (optional for PDF)"/>
      <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files?.[0] || null)} />
      <button type="submit">Create Document</button>
    </form>
  );
}
