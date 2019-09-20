const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Leave = new Schema({
  Date: {
    type: String
  },
  ID: {
    type: String
  },
  Name: {
    type: String
  },
  Status: {
    type: String
  },
  Reason: {
    type: String
  },
  RReason: {
    type: String
  },
  Department: {
    type: String
  },
  Type: {
    type: String
  }
});
module.exports = User = mongoose.model("Leave", Leave);
