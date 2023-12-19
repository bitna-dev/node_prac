const express = require("express");
const userController = require("./controllers/users.controller");
const postController = require("./controllers/posts.controller");
const PORT = 3000;
const app = express();
// body parsing middleware
app.use(express.json());

app.get("/users", userController.getUsers);
app.get("/user/:id", userController.getUser);
app.post("/users", userController.postUser);
app.get("/posts", postController.getPosts);

app.listen(PORT, () => {
  console.log(`Express ${PORT} conducted`);
});
