const express = require("express");

const {
  signup,
  login,
  logout,
  getMe,
  updateMe,
  forgotPassword,
  resetPassword,
  updatePassword
} = require("../controllers/authController");

const { protect } = require("../middleware/protect");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// Logged in users only
router.use(protect);

router.get("/me", getMe);
router.patch("/updateMe", updateMe);
router.patch("/updatePassword", updatePassword);
module.exports = router;
