const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberLeave = new Schema({
  ID: {
    type: String
  },
  AvailLeave: {
    type: Number
  },
  LeftOver: {
    type: Number
  }
});
module.exports = User = mongoose.model("MemberLeave", MemberLeave);
