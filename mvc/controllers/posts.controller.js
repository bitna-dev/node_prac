const posts = require("../models/posts.model");

function getPosts(req, res) {
  res.send(posts);
}

module.exports = { getPosts };
