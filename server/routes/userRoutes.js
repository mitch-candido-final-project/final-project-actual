const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const passport = require("passport");
const uploadCloud = require("../config/cloudinary.js");

router.post("/signup", (req, res, next) => {
  const userNameVar = req.body.username;
  const password = req.body.password;
  const emailVar = req.body.email;
  if (
    !userNameVar ||
    !password ||
    !req.body.email ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    res.status(400).json({ message: "Provide all the required info" });
    return;
  }

  // if(password.length < 7){
  //     res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
  //     return;
  // }
  // this is not for testing only add something like this after the featurw works correctly

  User.findOne(
    { $or: [{ username: userNameVar }, { email: emailVar }] },
    (err, foundUser) => {
      if (err) {
        res.status(500).json({ message: "Username check went bad." });
        return;
      }

      if (foundUser) {
        if (foundUser.username === userNameVar) {
          res
            .status(400)
            .json({ message: "Username taken. Choose another one." });
          return;
        } else {
          res.status(400).json({ message: "email taken. Choose another one." });
          return;
        }
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        username: userNameVar,
        password: hashPass,
        email: emailVar,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: ""
      });

      aNewUser.save(err => {
        if (err) {
          res
            .status(400)
            .json({ message: "Saving user to database went wrong." });
          return;
        }

        // Automatically log in user after sign up
        // .login() here is actually predefined passport method
        req.login(aNewUser, err => {
          if (err) {
            res.status(500).json({ message: "Login after signup went bad." });
            return;
          }

          res.status(200).json({ message: "successfully logged in" });
        });
      });
    }
  );
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      console.log("---123456789098765432345678---", req.user);
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

router.get("/getcurrentuser", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.user) {
    let newObject = {};
    newObject.username = req.user.username;
    newObject._id = req.user._id;
    newObject.followers = req.user.followers;
    newObject.following = req.user.following;
    newObject.email = req.user.email;
    newObject.firstName = req.user.firstName;
    newObject.lastName = req.user.lastName;
    newObject.image = req.user.image;

    res.status(200).json(newObject);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

router.post("/update/:id", uploadCloud.single("image"), (req, res, next) => {
  let updateData = {};
  updateData.username = req.body.username;
  // updateData.password = req.body.password;
  updateData.firstName = req.body.firstName;
  updateData.lastName = req.body.lastName;
  updateData.email = req.body.email;
  console.log("-=-=-=--=-=update--=-=-=-=-", updateData);
  if (req.file) {
    updateData.image = req.file.url;
  }
  User.findByIdAndUpdate(req.params.id, updateData)
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
