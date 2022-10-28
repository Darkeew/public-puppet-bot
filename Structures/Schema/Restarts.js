const { mongoose } = require("mongoose");

const AllRestarts = new mongoose.Schema({
  restarts: "Number",
  allguilds: "Array",
  pages: `Number`,
  id: `Number`,
  cases: `Number`,
  verification: "Boolean",
  imageFilter: "Boolean",
});

const RestartsModel = mongoose.model("AllRestarts", AllRestarts);

module.exports = RestartsModel;
