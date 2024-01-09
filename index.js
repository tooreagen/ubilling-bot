const express = require("express");
const http = require("http");
const io = require("./server/io");

const app = express();
const server = http.createServer(app);
io.default(server);

server.listen(3000, () => console.log("Express server started"));

app.use(express.static("public"));

process.on("SIGINT", () => {
  console.log("Server is shutting down...");
  server.close(() => {
    console.log("Server is closed.");
    process.exit(0);
  });
});
