const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const globalErrorHandler = require("./middleware/error");
const AppError = require("./utils/appError");

// Load env vars
dotenv.config({ path: "./config.env" });

// Connect Database
connectDB();

const app = express();

// Route files
const roomRouter = require("./routes/roomRoutes");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const authRouter = require("./routes/authRoutes");

// Body parser
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use((req, res, next) => {
//   console.log(req.cookies);
// });

// Mount Routes
app.use("/api/room", roomRouter);
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App running on port .. ${PORT}`);
});
