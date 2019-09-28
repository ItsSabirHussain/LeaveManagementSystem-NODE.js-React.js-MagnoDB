const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const Member = require("../models/member");
const MemberLeave = require("../models/memberleave");

const Leave = require("../models/leave");

router.post("/empreg", (req, res) => {
  Member.findOne({ ID: req.body.ID }).then(emp => {
    if (emp) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newMember = new Member({
        ID: req.body.ID,
        Name: req.body.Name,
        OfficeID: req.body.OfficeID,
        Key: req.body.Key,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Department: req.body.Department,
        Role: req.body.Role
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newMember.Key, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          newMember.Key = hash;
          newMember
            .save()
            .then(user => res.json(user))
            .catch();
        });
      });
    }
  });
});

router.post("/emplogin", (req, res) => {
  if (!req.body.Role === "Employee") {
    return res.status(400).json({ message: "Failed" });
  }
  const ID = req.body.ID;
  const Key = req.body.Key;
  Member.findOne({ ID: req.body.ID }).then(mem => {
    if (!mem) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    if (mem.Key === req.body.Key && mem.Role === req.body.Role) {
      const payload = {
        id: mem.id,
        ID: mem.ID
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
            Department: mem.Department
          });
        }
      );
    } else {
      return res.status(400).json({ keyincorrect: "Key incorrect" });
    }
  });
});

router.post("/getenotifications", (req, res) => {
  const ID = req.body.ID;
  console.log(ID);

  Leave.find({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    return res.json(user);
  });
});

router.post("/deletenotification", (req, res) => {
  Leave.deleteOne({ _id: req.body._id }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
  });
});

router.post("/eapplyleave", (req, res) => {
  const newLeave = new Leave({
    Date: req.body.StartDate + " to " + req.body.EndDate,
    ID: req.body.ID,
    Reason: req.body.Reason,
    Department: req.body.Department,
    Name: req.body.FullName,
    Status: "Pending"
  });
  console.log("There");
  newLeave.save().then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "Error" });
    } else {
      return res.json({ message: "Done" });
    }
  });
});
router.post("/getemp", (req, res) => {
  Member.findOne({ ID: req.body.ID }, function(err, mem) {
    if (!mem) {
      return res.json({ message: "Member not found" });
    } else {
      const result = {
        FullName: mem.Name,
        OfficeID: mem.OfficeID,
        Department: mem.Department,
        AvailLeave: mem.AvailLeave,
        LeftOver: mem.LeftOver
      };
      console.log(result);
      return res.json(result);
    }
  });
});
router.post("/egetleave", (req, res) => {
  Leave.find({ ID: req.body.ID }, function(err, leave) {
    if (leave.length < 1) {
      console.log("There");
      return res.json([{ Date: "None", Status: "None", RReason: "None" }]);
    } else {
      return res.json(leave);
    }
  });
});
router.post("/getleaveinfo", (req, res) => {
  MemberLeave.findOne({ ID: req.body.ID }, function(err, leave) {
    if (!leave) {
      return res.json({ message: "Leave not found" });
    } else {
      const result = {
        AvailLeaves: leave.OfficeID,
        LeftOver: leave.Department
      };
      return res.json(result);
    }
  });
});

router.post("/deleleave", (req, res) => {
  Leave.remove({ ID: req.body.ID, Date: req.body.Date }, function(err, obj) {
    console.log("There");
    if (err) throw err;
    return res.json({ message: "Done" });
  });
});

module.exports = router;
