const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/protect");

const router = express.Router();

// Admin only
router.use(protect, authorize("admin"));

router
  .route("/")
  .get(getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
