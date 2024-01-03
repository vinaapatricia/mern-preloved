const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const fs = require("fs/promises");
const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");
const passport = require("passport");
const flash = require("connect-flash");
const { ensureAuthenticated } = require("../config/auth");

//User Model
const User = require("../models/user");

//Image Model
const Image = require("../models/image");

//Multer
const upload = require("./multer");

// Konfigurasi Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://mern-preloved.appspot.com",
});

//Route Not Sign In
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

// Route Sign In
router.get("/home", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      console.error("User not found");
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    const { username, email } = user;
    res.render("home", { username, email });
  } catch (error) {
    console.error("Error fetching user:", error);
    req.flash("error", "Failed to fetch user");
    res.redirect("/login");
  }
});

router.get("/addproduct", ensureAuthenticated, (req, res) => {
  res.render("addproduct");
});

router.get("/editproduct", ensureAuthenticated, async (req, res) => {
  const productId = req.query.productId;

  try {
    const product = await Image.findById(productId);

    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/showproduct");
    }

    res.render("editproduct", { product });
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to load product");
    res.status(500).send("Internal Server Error");
  }
});

router.get("/showproduct", ensureAuthenticated, async (req, res) => {
  try {
    const products = await Image.find({ userId: req.user.id });

    res.render("showproduct", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//Post Image Data
router.post("/addproduct", ensureAuthenticated, upload.single("image"), async (req, res) => {
  try {
    const { name, description, condition, isOffer, price } = req.body;
    const imageFile = req.file;

    const userId = req.user._id;

    const bucket = admin.storage().bucket();
    const imageFileName = `${Date.now()}_${imageFile.originalname}`;
    const file = bucket.file(imageFileName);
    await file.createWriteStream().end(imageFile.buffer);

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${file.name}`;

    const newProduct = new Image({
      userId,
      name,
      description,
      condition,
      isOffer: isOffer === "offer",
      price,
      imageUrl,
    });

    const savedProduct = await newProduct.save();
    req.flash("success_msg", "Product Added successfully");
    res.redirect("/showproduct");
  } catch (error) {
    req.flash("error", "Failed to add Product");
    console.error(error);
    res.render("addproduct", { error: "Error uploading product. Please try again." });
  }
});

// Update Image Data
router.post("/editproduct", upload.single("image"), async (req, res) => {
  try {
    const { name, description, condition, isOffer, price } = req.body;
    const imageFile = req.file;
    const productId = req.body.productId;

    let updatedProduct;

    if (imageFile) {
      // Jika ada file gambar baru, hapus gambar lama dari Firebase Storage
      const product = await Image.findById(productId);
      const oldImageUrl = product.imageUrl;
      const oldFileName = oldImageUrl.split("/").pop();

      const bucket = admin.storage().bucket();
      const oldFile = bucket.file(oldFileName);
      await oldFile.delete();

      // Simpan gambar baru di Firebase Storage
      const imageFileName = `${Date.now()}_${imageFile.originalname}`;
      const newFile = bucket.file(imageFileName);
      await newFile.createWriteStream().end(imageFile.buffer);

      const newImageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${newFile.name}`;

      // Update data produk dengan gambar baru
      updatedProduct = await Image.findByIdAndUpdate(productId, { name, description, condition, isOffer: isOffer === "offer", price, imageUrl: newImageUrl }, { new: true });
    } else {
      // Jika tidak ada file gambar baru, hanya update data produk
      updatedProduct = await Image.findByIdAndUpdate(productId, { name, description, condition, isOffer: isOffer === "offer", price }, { new: true });
    }

    if (!updatedProduct) {
      return res.status(404).render("error", { message: "Product not found" });
    }

    req.flash("success_msg", "Product updated successfully");
    res.redirect("/showproduct");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to update product");
    res.redirect("/editproduct");
  }
});

// Delete Image Data
router.get("/deleteproduct/:id", ensureAuthenticated, async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Image.findById(productId);

    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/showproduct");
    }

    const imageUrl = product.imageUrl;

    if (!imageUrl) {
      req.flash("error", "Image URL not found in MongoDB");
      return res.redirect("/showproduct");
    }

    const fileName = imageUrl.split("/").pop();

    const bucket = admin.storage().bucket();
    const file = bucket.file(fileName);
    await file.delete();

    await Image.findByIdAndDelete(productId);

    req.flash("success_msg", "Product Deleted successfully");
    res.redirect("/showproduct");
  } catch (error) {
    req.flash("error", "Failed to delete Product");
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Register Handle
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  let errors = [];

  //check required fields
  if (!username || !email || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //Check pass length
  if (password.length < 8) {
    errors.push({ msg: "Password should be at least 8 characters" });
  }

  if (errors.length > 0) {
    res.render("signup", {
      errors,
      username,
      email,
      password,
    });
  } else {
    //Validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //User Exists
        errors.push({ msg: "Email is Already registered" });
        res.render("signup", {
          errors,
          username,
          email,
          password,
        });
      } else {
        const newUser = new User({
          username,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;

            // Save user
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "You are now register !");
                res.redirect("/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

//Logout Handle
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    req.flash("success_msg", "You are logged out!");
    res.redirect("/login");
  });
});

module.exports = router;
