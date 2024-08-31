const express = require("express");
const teacherAuthRouter = require("./routes/teacher.auth.routes");
const studentAuthRouter = require("./routes/student.auth.routes");
const studentRouter = require("./routes/student.routes");
const connectDB = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/teacher", teacherAuthRouter);
app.use("/student", studentAuthRouter);
app.use("/student/data", studentRouter);

const start = () => {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log("Listening on port ", PORT + "...");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
start();
