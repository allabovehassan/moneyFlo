const express = require("express");
const app = express();
const { connection } = require("./config/db");
const {
  authenticator
} = require("./middleware/authentication");
const rateLimit = require("express-rate-limit");
const {
  userRouter
} = require("./routes/userRoutes");

const {
  productRouter
} = require("./routes/productRoutes");
const {
  invoiceRouter
} = require("./routes/invoiceRoutes");

require("dotenv").config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message:
      "Too many requests, please try again later.",
    data: null
  }
});

// Apply rate limiter to all requests
app.use(limiter);

app.use(express.json());


app.use("/api/user", userRouter);

app.use(authenticator);

app.use("/api/product", productRouter);
app.use("/api/invoice", invoiceRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
    console.log(`Connected To DataBase`);
  } catch (error) {
    console.log({ Error: error.message });
  }
  console.log(
    `server is running at ${process.env.PORT || 3000}`
  );
});
