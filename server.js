const express = require("express");
const postsRouter = require("./posts/posts-router");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Denton's Posts API</h2>`);
});

module.exports = server;
