import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { convertMarkdownToHtml } from "./services/markdown-service.js";
import { marked } from "marked";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"],
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Markdown Editor Backend is Running 🚀");
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("markdown", (data) => {
    // const html = convertMarkdownToHtml(data);
    const html = marked(data);
    socket.broadcast.emit("markdownPreview", html);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
