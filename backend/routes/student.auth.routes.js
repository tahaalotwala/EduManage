const Student = require("../models/student.model");
const express = require("express");
const router = express.Router();

router.route("/signup").post(async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

router.route("/signin").post(async (req, res) => {
  const { email, password } = req.body;
  const user = await Student.findOne({ email });
  if (!user) return res.json({ msg: "Invalid Email" });
  if (user.password != password) return res.json({ msg: "Incorrect password" });
  res.json({ user });
});

module.exports = router;
