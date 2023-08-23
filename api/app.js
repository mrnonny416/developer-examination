const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./configs/config")
const ApiRouter = require("./routes/router");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", ApiRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
