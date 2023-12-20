const posts = require("../models/posts.model");
const path = require("path");

function getPosts(req, res) {
  //res.send(posts);
  //res.sendFile(path.join(__dirname, "..", "public", "images", "bitna.jpg"));
  res.render("posts", {
    templateName: "post",
  });
}

module.exports = { getPosts };
