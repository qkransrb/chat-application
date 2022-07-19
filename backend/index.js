const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { config } = require("dotenv");

// Express Server
const app = express();

// Environment Variables
config();

// Express Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "uploads")));

// Routes
app.use("/", require("./routes/auth"));
app.use("/users", require("./routes/user"));
app.use("/chats", require("./routes/chat"));

// Server Port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
