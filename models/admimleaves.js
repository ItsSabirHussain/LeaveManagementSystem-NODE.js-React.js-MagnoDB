const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Adminleaves = new Schema({
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
module.exports = User = mongoose.model("Adminleaves", Adminleaves);
