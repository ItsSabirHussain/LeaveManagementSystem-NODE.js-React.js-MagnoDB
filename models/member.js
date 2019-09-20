const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Member = new Schema({
  ID: {
    type: String
  },
  Role: {
    type: String
  },
  Key: {
    type: String
  },
  Name: {
    type: String
  },
  OfficeID: {
    type: String
  },
  Email: {
    type: String
  },
  Phone: {
    type: String
  },
  Department: {
    type: String
  },
  AvailLeave: {
    type: Number
  },
  LeftOver: {
    type: Number
  }
});
module.exports = User = mongoose.model("Member", Member);
