const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;
const jwt = require("jsonwebtoken");
require("dotenv").config();
let refreshTokens = [];
app.use(express.json());
app.use(cookieParser());

//포스트 배열
const posts = [
  { username: "Jhon", title: "Post1" },
  { username: "Erin", title: "Post2" },
];

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { username: username };

  //초기토큰
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });

  //리프레쉬토큰
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  refreshTokens.push(refreshToken);

  //리프레쉬토큰 유효시간 추가
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, //하루
  });

  res.json({ accessToken: accessToken });
});

//getPosts
app.get("/posts", authMiddleware, (req, res) => {
  res.json(posts.filter((post) => post.username == req.user.username));
});

//미들웨어 auth
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // 미들웨어를 통과 후 getPosts에서 이 유저에 해당하는 정보를 쓸 수 있도록 하는 것.
    req.user = user;

    next();
  });
}
app.get("/refresh", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
