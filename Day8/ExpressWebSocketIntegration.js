const WebSocket = require("ws");
const express = require("express");
const http = require("http");
const path = require("path");

function setupWebSocket(server) {
  const app = express();

  app.get("/websocket", (req, res) => {
    res.sendFile(path.join(__dirname, "websocket.html"));
  });

  const wsServer = new WebSocket.Server({ server });

  wsServer.on("connection", (ws) => {
    console.log("WebSocket client connected");

    ws.on("message", (message) => {
      console.log("Received message:", message);
      ws.send(message);
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });
}

const server = http.createServer();
setupWebSocket(server);

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
