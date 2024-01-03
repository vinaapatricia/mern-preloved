const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = require("./router/user");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const app = express();
const PORT = 4000;

// Passport config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").MongoURI;

// Image Model
const Image = require("./models/image");

// Connect to MongoDB
mongoose.connect(db).then(() => {
  console.log('Connected to MongoDB!');
})
.catch((err) => {
  console.log(err);
});

// Express middleware
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Express session middleware
const sessionMiddleware = session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    httpOnly: true,
  },
});

app.use(sessionMiddleware);

// Connect Flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Route
app.use(router);

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/search", async (req, res) => {
  try {
    const searchResult = await Image.find();
    res.render("search", { searchResult });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.use((req, res, next) => {
  res.status(404).render("error.ejs", { errorMessage: "Page not found!" });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("Already Header Sent. There was a problem.");
  } else {
    if (err.message) {
      res.status(500).render("error.ejs", { errorMessage: err.message });
    } else {
      res.render("error.ejs", { errorMessage: "There was an error!" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
