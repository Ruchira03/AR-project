var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var db = require("./models/index");
var authRouter = require("./routes/auth");
var categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const errorHandler = require('./middleware/errorHandler')
var port = process.env.PORT || 3001;
console.log(port);

require("dotenv").config();
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

db.mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo DB");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);

//catch error
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("hello there!");
});
app.listen(process.env.PORT || "3001", () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
