const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const PORT = 3000;

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("recieve-location", { id: socket.id, ...data });
  });
  console.log("New user connected");
  socket.on("disconnect", () => {
    io.emit("user-disconnect", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
