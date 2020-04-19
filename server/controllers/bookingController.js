const Room = require("../models/roomModel");
const Book = require("../models/bookingModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getBookNow = catchAsync(async (req, res, next) => {
  const { start, end, capacity } = req.params;
  console.log("START", start);
  console.log("END", end);
  const books = await Book.find({
    $or: [
      { dateStart: { $lte: start }, dateEnd: { $gte: start } },
      { dateStart: { $lte: end }, dateEnd: { $gte: end } },
      { dateStart: { $gte: start }, dateEnd: { $lte: end } }
    ]
  });

  const rooms = await Room.find({
    capacity: { $eq: capacity }
  });

  let available;
  // eslint-disable-next-line no-restricted-syntax
  if (books.length > 0) {
    for (const book of books) {
      available = rooms.filter(room => String(book.room) !== String(room._id));
    }
  } else {
    available = rooms;
  }

  res.status(200).json({
    data: available
  });
});

exports.getBooks = catchAsync(async (req, res, next) => {
  const bookRecord = await Book.find();

  res.status(200).json({
    data: bookRecord
  });
});

exports.getMyBook = catchAsync(async (req, res, next) => {
  const myBooked = await Book.find({ user: req.params.id });

  res.status(200).json({
    status: "sucess",
    data: myBooked
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const { dateStart, dateEnd, status, amount, events, user, room } = req.body;
  const book = await Book.create({
    dateStart,
    dateEnd,
    status,
    amount,
    events,
    user,
    room
  });

  res.status(201).json({ status: "sucess", data: book });
});

exports.cancelBook = catchAsync(async (req, res, next) => {
  const bookId = await Book.findByIdAndDelete(req.params.id);

  if (!bookId) {
    return next(new AppError("Book id not found.", 404));
  }

  res.status(200).json({
    status: "sucess",
    message: "Book Deleted."
  });
});

exports.checkIn = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError("Book id not found.", 404));
  }

  book.events.checkIn = req.body.events.checkIn;
  book.save();

  res.status(200).json({
    status: "success",
    data: book
  });
});

exports.checkOut = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError("Book id not found.", 404));
  }

  book.events.checkOut = req.body.events.checkOut;
  book.save();

  res.status(200).json({
    status: "success",
    data: book
  });
});

exports.recurring = catchAsync(async (req, res, next) => {});
