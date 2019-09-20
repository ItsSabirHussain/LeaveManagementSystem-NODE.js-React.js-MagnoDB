const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const Admin = require("../models/admin");
const Member = require("../models/member");

router.post("/adminreg", (req, res) => {
  Admin.findOne({ ID: req.body.ID }).then(admin => {
    if (admin) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newAdmin = new Admin({
        ID: req.body.ID,
        Name: req.body.Name,
        OfficeID: req.body.OfficeID,
        Key: req.body.Key,
        Email: req.body.Email,
        Phone: req.body.Phone
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.Key, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          newAdmin.Key = hash;
          newAdmin
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
router.post("/adminlogin", (req, res) => {
  const ID = req.body.ID;
  const Key = req.body.Key;
  Admin.findOne({ ID: req.body.ID }).then(admin => {
    if (!admin) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }

    if (admin.Key === req.body.Key) {
      const payload = {
        id: admin.id,
        ID: admin.ID
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
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res.status(400).json({ keyincorrect: "Key incorrect" });
    }
  });
});

router.post("/addmember", (req, res) => {
  Member.findOne({ ID: req.body.ID }).then(mem => {
    if (mem) {
      return res.status(400).json({ ID: "Member already exists" });
    } else {
      const newMember = new Member({
        ID: req.body.ID,
        Name: req.body.Name,
        OfficeID: req.body.OfficeID,
        Key: req.body.Key,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Department: req.body.Department,
        Role: req.body.Role,
        AvailLeave: 20,
        LeftOver: 0
      });

      newMember
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

router.route("/editmember").post(function(req, res) {
  Member.findOne({ ID: req.body.ID }, function(err, mem) {
    if (!mem) res.status(404).send("data is not found");
    else {
      mem.FullName = req.body.FullName;
      mem.OfficeID = req.body.OfficeID;
      mem.ID = req.body.ID;
      if (!req.body.Key === "") {
        mem.Key = req.body.Key;
      }
      mem.Email = req.body.Email;
      mem.Department = req.body.Department;
      mem.Role = req.body.Role;
      mem.Phone = req.body.Phone;
      if (!req.body.Key === "") {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(mem.Key, salt, (err, hash) => {
            console.log(err);
            if (err) throw err;
            mem.Key = hash;
            mem
              .save()
              .then(user => res.json({ message: "Member updated" }))
              .catch(err => console.log(err));
          });
        });
      }
      mem
        .save()
        .then(user => res.json({ message: "Member updated" }))
        .catch(err => console.log(err));
    }
  });
});

router.route("/updateprofile").post(function(req, res) {
  Admin.findOne({ ID: req.body.IDD }, function(err, admin) {
    if (!admin) res.status(404).send("data is not found");
    else {
      admin.Name = req.body.FullName;
      admin.OfficeID = req.body.OfficeID;
      admin.ID = req.body.ID;
      if (!req.body.Key === "") {
        admin.Key = req.body.Key;
      }
      admin.Email = req.body.Email;
      admin.Phone = req.body.Phone;
      if (!req.body.Key === "") {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(admin.Key, salt, (err, hash) => {
            console.log(err);
            if (err) throw err;
            admin.Key = hash;
            admin
              .save()
              .then(user => res.json({ message: "Admin updated" }))
              .catch(err => console.log(err));
          });
        });
      }
      admin
        .save()
        .then(user => res.json({ message: "Admin updated" }))
        .catch(err => console.log(err));
    }
  });
});
router.route("/getallemp").post(function(req, res) {
  Member.find(function(err, mem) {
    if (err) {
      console.log(err);
    } else {
      res.json(mem);
    }
  });
});

router.route("/getmember").post(function(req, res) {
  Member.findOne({ ID: req.body.ID }, function(err, mem) {
    if (!mem) res.status(404).send("data is not found");
    if (err) {
      console.log(err);
    } else {
      res.json(mem);
    }
  });
});

router.route("/getadmin").post(function(req, res) {
  Admin.findOne({ ID: req.body.ID }, function(err, admin) {
    if (err) {
      console.log(err);
    } else {
      console.log(admin);

      res.json(admin);
    }
  });
});

module.exports = router;
