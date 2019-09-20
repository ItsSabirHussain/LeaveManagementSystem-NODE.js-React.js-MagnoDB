const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpLeaves = new Schema({
  ID: {
    type: String
  },
  AvailLeaves: {
    type: String
  },
  LeftOver: {
    type: String
  }
});
module.exports = User = mongoose.model("Empleaves", EmpLeaves);
