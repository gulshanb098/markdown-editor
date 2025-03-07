import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import "../styles/global.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const socket = useRef<Socket>(null);

  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      transports: ["websocket"],
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    console.log("coming into tjis");
    if (!socket.current) {
      console.log("returning from here");
      return;
    }
    socket.current.on("markdownPreview", (data) => {
      console.log("📩 Received data:", data);
      setHtml(data);
    });
  }, [html]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!socket.current) {
      return;
    }
    const text = e.target.value;
    setMarkdown(text);
    socket.current.emit("markdown", text);
  };

  return (
    <div className="editor-container">
      <textarea
        value={markdown}
        onChange={handleInputChange}
        placeholder="Type Markdown here..."
        className="editor-textarea"
      />
      <div
        className="editor-preview"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} // Render received HTML
      />
    </div>
  );
};

export default MarkdownEditor;
