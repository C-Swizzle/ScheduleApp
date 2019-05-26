const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
  firstName: {type:String, required:true},
  lastName: {type: String, required:true},
  subjectsTaught:[{type:String}],
  permSchedule: {
    type: Schema.Types.ObjectId,
    ref: "scheduleObj"
  }


});

const Tutor = mongoose.model("Tutor",tutorSchema);

module.exports = Tutor;