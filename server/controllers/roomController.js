const Room = require("../models/roomModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createRoom = catchAsync(async (req, res, next) => {
  const room = await Room.create(req.body);

  res.status(201).json({
    status: "sucess",
    data: room
  });
});

exports.getRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find();

  res.status(200).json({
    status: "sucess",
    results: rooms.length,
    data: rooms
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new AppError("Room not found", 404));
  }

  res.status(200).json({
    status: "sucess",
    data: room
  });
});

exports.editRoom = catchAsync(async (req, res, next) => {
  const room = Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!room) {
    return next(new AppError("Room not found", 404));
  }

  res.status(201).json({
    status: "sucess",
    data: room
  });
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndDelete(req.params.id);

  if (!room) {
    return next(new AppError("Room not found", 404));
  }

  res.status(200).json({
    status: "sucess",
    message: "Room Deleted"
  });
});
