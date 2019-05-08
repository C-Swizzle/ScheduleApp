const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studSchema = new Schema({
  name: { type: String, required: true },
  hoursPurchased:{type:Number},
  hoursUsed:{type:Number}
});

const Student = mongoose.model("Student", studSchema);

module.exports = Student;
