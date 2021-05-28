const express = require("express");
const router = express.Router();
const queries = require("../db/queries");

router.post("/login", (req, res) => {
  queries.auth.authLogin(req.body).then((user) => {
    if (user.password == req.body.password) {
      return res.status(200).json({ message: "complete", user });
    } else {
      console.log(user.password);
      return res.status(500).json({ message: "fail" });
    }
  });
});

router.post("/register", (req, res) => {
  queries.auth
    .registerMember({
      username: req.body.username,
      password: req.body.password,
    })
    .then((response) =>
      queries.user
        .setPersonalData({
          student_id: req.body.student_id,
          f_name: req.body.f_name,
          l_name: req.body.l_name,
          faculty: req.body.faculty,
          department: req.body.department,
          mobile_no: req.body.mobile_no,
          email: req.body.email,
          other_contact: req.body.other_contact,
        })
        .then((profile) => res.status(200).json({ response, profile }))
    );
});

module.exports = router;
