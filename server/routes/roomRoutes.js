const express = require("express");
const {
  createRoom,
  getRooms,
  getRoom,
  editRoom,
  deleteRoom
} = require("../controllers/roomController");

const { protect, authorize } = require("../middleware/protect");

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoom);

// Authorized only
router.use(protect, authorize("admin"));

router.post("/", createRoom);
router
  .route("/:id")
  .patch(editRoom)
  .delete(deleteRoom);

module.exports = router;
