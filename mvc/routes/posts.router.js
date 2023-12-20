const express = require("express");
const postsRouter = express.Router();
const postsController = require("../controllers/posts.controller");

postsRouter.get("/", postsController.getPosts);

module.exports = postsRouter;
