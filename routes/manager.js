const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const Member = require("../models/member");
const Leave = require("../models/leave");

router.post("/managerreg", (req, res) => {
  Member.findOne({ ID: req.body.ID }).then(manager => {
    if (manager) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newProMan = new Member({
        ID: req.body.ID,
        Name: req.body.Name,
        OfficeID: req.body.OfficeID,
        Key: req.body.Key,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Department: req.body.Department,
        Role: req.body.Role
      });
      console.log(newProMan);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newProMan.Key, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          newProMan.Key = hash;
          newProMan
            .save()
            .then(admin => res.json(newProMan))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/managerlogin", (req, res) => {
  const ID = req.body.ID;
  const Key = req.body.Key;
  // Find admin by id
  Member.findOne({ ID: req.body.ID }).then(manager => {
    // Check if admin exists
    if (!manager) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    // Check password
    if (manager.Key === req.body.Key) {
      // Admin matched
      // Create JWT Payload
      const payload = {
        id: manager.id,
        ID: manager.ID
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

router.post("/getmanager", (req, res) => {
  Member.findOne({ ID: req.body.ID }, function(err, mem) {
    if (!mem) {
      return res.json({ message: "Manager not found" });
    } else {
      const result = {
        ID: req.body.ID,
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

router.post("/mapplyleave", (req, res) => {
  console.log(req.body);
  const newLeave = new Leave({
    Date: req.body.StartDate + " to " + req.body.EndDate,
    ID: req.body.ID,
    Reason: req.body.Reason,
    Department: req.body.Department,
    Name: req.body.FullName,
    Type: "",
    Status: "Pendding"
  });

  newLeave
    .save()
    .then(user => {
      res.json({ message: "Done" });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/getdepleaves", (req, res) => {
  var dep = "";
  Member.findOne({ ID: req.body.ID }, function(err, mem) {
    dep = mem.depopulate;
  });
  Leave.find({ Department: dep }, function(err, mem) {
    if (!mem) {
      return res.json({ message: "Manager not found" });
    } else {
      return res.json(mem);
    }
  });
});

router.post("/mgetleave", (req, res) => {
  Leave.find({ ID: req.body.ID }, function(err, leave) {
    if (leave.length < 1) {
      return res.json([{ Date: "None", Status: "None", RReason: "None" }]);
    } else {
      return res.json(leave);
    }
  });
});

router.post("/delmleave", (req, res) => {
  Leave.remove({ ID: req.body.ID, Date: req.body.Date }, function(err, obj) {
    console.log("There");
    if (err) throw err;
    console.log(" document(s) deleted");
  });
});

module.exports = router;
