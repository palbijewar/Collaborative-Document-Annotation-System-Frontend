## 📝 **Collaborative Document Annotation System — Frontend**

### 🚀 Overview

This is the **React (Vite) frontend** for the Collaborative Document Annotation System — built using the **MERN stack**.
It allows users to upload documents, view text content, select text ranges, and add comments (annotations) that are synced in **real-time** with other users.

The app demonstrates strong **frontend architecture, real-time collaboration, and efficient UI rendering** even with 1000+ annotations.

---

### 🧠 **Key Features**

* **📄 Document Upload:**
  Supports uploading text and PDF documents (via REST API).

* **🖊 Annotation UI:**
  Users can select text portions and add comments. Each annotation is stored with the selected text range, timestamp, and guest user ID.

* **💬 Real-Time Collaboration:**
  Multiple users can annotate the same document at once.
  Annotations appear instantly for all connected clients via **Socket.IO**.

* **⚡ Performance Optimizations:**

  * Uses memoized components for large document rendering.
  * Virtualized annotation lists (`react-window`) for smooth scrolling with 1000+ entries.
  * Efficient API pagination to prevent UI lag.

* **👤 Guest User Identity (No Auth Needed):**
  Each browser generates a persistent unique `guestId` stored in `localStorage`.
  This ensures multi-user differentiation even without authentication.

---

### 🧩 **Tech Stack**

| Layer            | Technology                 |
| ---------------- | -------------------------- |
| Framework        | React + TypeScript + Vite  |
| Real-time        | Socket.IO Client           |
| State Management | React Context              |
| HTTP Client      | Axios                      |
| Styling          | Basic CSS (custom classes) |
| Build Tool       | Vite                       |

---

### ⚙️ **Environment Variables**

Create a `.env` file in the project root:

```env
VITE_API_URL=https://collaborative-document-annotation-system.onrender.com/api
VITE_WS_URL=https://collaborative-document-annotation-system.onrender.com
```

---

### 🧱 **Folder Structure**

```
src/
│
├── api/                # Axios client setup
├── components/         # React components
│   ├── annotations/    # Annotation sidebar & form
│   ├── documents/      # Upload & document list
│   └── viewer/         # Document viewer & highlight rendering
│
├── context/
│   └── SocketProvider.tsx   # Real-time Socket.IO connection
│
├── utils/
│   └── guest.ts        # Generates unique guestId
│
└── App.tsx             # Root component, main routes
```

---

### 🧩 **Design Choices**

* **Socket.IO Context:**
  A single socket connection is shared app-wide via React Context.
  This avoids redundant connections and makes real-time updates predictable.

* **Guest User Tracking:**
  Instead of authentication, a simple `guestId` (`guest-xxxxxxx`) is created once per browser session and reused across annotations.

* **Annotation Linking:**
  Each annotation references:

  ```
  {
    documentId, userId, start, end, quote, comment, createdAt
  }
  ```

  ensuring precise text-range association.

* **Efficient Rendering:**

  * Document text is rendered with highlight overlays using spans based on annotation ranges.
  * Large lists of annotations are rendered with `react-window` virtualization.

* **Error Handling:**
  Frontend gracefully handles:

  * Missing file uploads (400)
  * Duplicate annotation attempts (409)
  * Server errors (500)
    using user-friendly alerts.

---

### 🧠 **Performance Optimizations**

1. **Pagination for annotations** (cursor-based loading).
2. **Virtualized lists** for smooth scrolling with 1000+ annotations.
3. **Memoized rendering** of document text and highlights.
4. **Efficient socket event updates** (only changed annotation sent).

---

### 🧩 **Edge Case Handling**

| Scenario                 | Handling                                                              |
| ------------------------ | --------------------------------------------------------------------- |
| Duplicate annotation     | Backend enforces unique `(userId, start, end)` index → handled as 409 |
| Overlapping highlights   | Rendered visually stacked with distinct color tones                   |
| Large documents          | Uses chunked rendering and memoization                                |
| Missing title / file     | Validated before upload                                               |
| Simultaneous annotations | Live-updated via Socket.IO across clients                             |

---

### 💻 **Run Locally**

```bash
# install dependencies
npm install

# run the development server
npm run dev
```

Then open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

### 🧑‍💻 **Deployment**

You can deploy the frontend easily using any static hosting:

* **Vercel**
* **Netlify**
* **Render (static site)**

Make sure the `.env` API URLs point to your **deployed backend**.

---

### 🧩 **Future Improvements**

* JWT-based authentication (optional upgrade)
* PDF rendering via `pdfjs-dist`
* Improved highlight overlay UI
* Undo/Delete annotation buttons
* Toast-style error notifications

---

### 🏁 **Conclusion**

This frontend provides a full working UI for the collaborative annotation system — demonstrating **text selection, annotation management, and real-time synchronization** with a clear architecture and scalable design.

---

Would you like me to make this README even more **GitHub-friendly** (with emojis, section dividers, and shields like `![Vite](...)`, `![Socket.IO](...)`)?
It’ll make your repo stand out nicely when you publish it.
