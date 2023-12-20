const express = require("express");
const path = require("path");
const postsRouter = require("./routes/posts.router");
const usersRouter = require("./routes/users.router");

const PORT = 3000;
const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`Start ${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`end: ${req.method} ${req.baseUrl} ${req.url} ${diffTime}`);
});
// body parsing middleware
app.use(express.json());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

//template engine과 결합
app.get("/", (req, res) => {
  res.render("index", {
    imageTitle: "This is Node.js Application",
  });
});

app.listen(PORT, () => {
  console.log(`Express ${PORT} conducted`);
});
