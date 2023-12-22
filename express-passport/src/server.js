require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const PORT = 3000;
const User = require("./models/users.model");
const passport = require("passport");

app.use(express.json());
app.use(cookieParser());
//index.html에서 전달해주는 value값을 받으려면 필요한 것.
app.use(express.urlencoded({ extended: false }));

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "public")));
//mongoDB
mongoose
  .connect(
    `mongodb+srv://bitnadev:bitnadev@db.hadwn2t.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("Hello");
});

//login
app.get("/login", (req, res, next) => {
  res.render("login");
});
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("no user found");
      return res.json({ msg: info });
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, info);
});

//signup
app.get("/signup", (req, res, next) => {
  res.render("signup");
});
app.post("/signup", async (req, res, next) => {
  //user객체 생성
  const user = new User(req.body);
  console.log(user);
  //user 컬렉션에 객체 저장
  try {
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

//listening
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
