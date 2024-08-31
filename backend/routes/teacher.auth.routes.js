const Teacher = require("../models/teacher.model");
const express = require("express");
const router = express.Router();

router.route("/signup").post(async (req, res) => {
  const teacher = await Teacher.create(req.body);
  res.json({ teacher });
});

router.route("/signin").post(async (req, res) => {
  const { email, password } = req.body;
  const user = await Teacher.findOne({ email });
  if (!user) return res.json({ msg: "Invalid Email" });
  if (user.password != password) return res.json({ msg: "Incorrect password" });
  res.json({ user });
});

module.exports = router;
