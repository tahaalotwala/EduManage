const express = require("express");
const Student = require("../models/student.model");
const router = express.Router();

router.route("/all").get(async (req, res) => {
  const students = await Student.find({});
  res.send(students);
});

module.exports = router;
