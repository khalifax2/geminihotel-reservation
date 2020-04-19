const express = require("express");
const {
  createBook,
  getBookNow,
  getBooks,
  cancelBook,
  getMyBook,
  checkIn,
  checkOut
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/start/:start/end/:end/capacity/:capacity", getBookNow);

router
  .route("/")
  .get(getBooks)
  .post(createBook);

router
  .route("/:id")
  .get(getMyBook)
  .delete(cancelBook);

router.patch("/checkIn/:id", checkIn);
router.patch("/checkOut/:id", checkOut);

module.exports = router;
