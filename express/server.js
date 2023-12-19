const express = require("express");
const PORT = 3000;
const app = express();
// body parsing middleware
app.use(express.json());
const Users = [
  {
    id: 0,
    name: "Jack",
  },
  {
    id: 1,
    name: "Erin",
  },
];

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(diffTime);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/users", (req, res) => {
  res.send(Users);
});
app.get("/users/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const user = Users[userId];
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

// POST
app.post("/users", (req, res) => {
  console.log("params===", req.body.name);
  const newUser = {
    name: req.body.name,
    id: Users.length,
  };
  Users.push(newUser);
  res.json(newUser);
});
app.listen(PORT, () => {
  console.log(`Express ${PORT} conducted`);
});
