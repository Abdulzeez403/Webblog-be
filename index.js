const express = require("express");
const app = express();
const dbase = require("./config/db");
const ErrorHandle = require("./middleware/errorHandle");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(express.json({ extend: true }));
app.use(ErrorHandle);
app.use("/api/blog", require("./routes/crud"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/comment", require("./routes/comment"));
dbase();
app.listen(PORT, (req, res) => {
  console.log(`This Server is running on port ${PORT}`);
});
