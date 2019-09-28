const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const HR = require("../models/hr");
const Member = require("../models/member");
const Leave = require("../models/leave");
router.post("/hrreg", (req, res) => {
  HR.findOne({ ID: req.body.ID }).then(hr => {
    console.log(hr);
    if (hr) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newHR = new HR({
        ID: req.body.ID,
        Name: req.body.Name,
        OfficeID: req.body.OfficeID,
        Key: req.body.Key,
        Email: req.body.Email,
        Phone: req.body.Phone
      });
      bcrypt.genSalt(10, (err, salt) => {
        console.log(req.body.Key);

        bcrypt.hash(newHR.Key, salt, (err, hash) => {
          console.log(err);
          console.log(req.body.Key);

          if (err) throw err;
          newHR.Key = hash;
          newHR
            .save()
            .then(ceo => res.json(newHR))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/hrlogin", (req, res) => {
  if (!req.body.Role === "HR") {
    return res.status(400).json({ message: "Failed" });
  }
  const ID = req.body.ID;
  const Key = req.body.Key;
  // Find admin by id
  Member.findOne({ ID: req.body.ID }).then(hr => {
    // Check if admin exists
    if (!hr) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    // Check password
    if (hr.Key === req.body.Key && hr.Role === req.body.Role) {
      // Admin matched
      // Create JWT Payload
      const payload = {
        id: hr.id,
        ID: hr.ID
      };
      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: "Key incorrect" });
    }
  });
});

router.route("/aleave").post(function(req, res) {
  console.log(req.body.Date);
  const [s, e] = req.body.Date.toString().split("to");

  const date1 = new Date(s);
  const date2 = new Date(e);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  var type = "";

  Member.findOne({ ID: req.body.ID }, function(err, leave) {
    if (leave) {
      leave.AvailLeave -= diffDays;
      leave.LeftOver += diffDays;

      if (leave.AvailLeave < 0) {
        type = "UnPaid";
      } else {
        type = "Paid";
      }
    }
    leave.save();
  });
  Leave.findOne({ ID: req.body.ID, Date: req.body.Date }, function(err, leave) {
    if (!leave) res.status(404).send("data is not found");
    else {
      leave.Status = req.body.Status;
      leave.Type = type;
      leave
        .save()
        .then(todo => {
          res.json("Rejected");
        })
        .catch(err => {
          res.status(400).send("Error");
        });
    }
  });
});

router.route("/rleave").post(function(req, res) {
  const [s, e] = req.body.Date.split("to");
  var d1 = new Date(s);
  var d2 = new Date(e);
  var type = "";
  var Difference_In_Time = d2.getTime() - d1.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  Member.findOne({ ID: req.body.ID }, function(err, leave) {
    if (leave) {
      leave.AvailLeave += Difference_In_Days;
      leave.LeftOver -= Difference_In_Days;
      if (leave.AvailLeave < 0) {
        type = "UNPAID";
      } else {
        type = "PAID";
      }
      if (leave.AvailLeave < 0) {
        leave.Type = "UnPaid";
      } else {
        leave.Type = "Paid";
      }
    }
    leave.save();
  });

  Leave.findOne({ ID: req.body.ID, Date: req.body.Date }, function(err, leave) {
    if (!leave) res.status(404).send("data is not found");
    else {
      leave.Status = req.body.Status;
      leave.RReason = req.body.RReason;
      leave.Type = type;
      leave
        .save()
        .then(todo => {
          res.json("Rejected");
        })
        .catch(err => {
          res.status(400).send("Error");
        });
    }
  });
});

router.route("/getallleaves").post(function(req, res) {
  Leave.find(function(err, leave) {
    if (err) {
      console.log(err);
    } else {
      console.log(leave);
      res.json(leave);
    }
  });
});

module.exports = router;
