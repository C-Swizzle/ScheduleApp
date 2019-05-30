const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: {type:String, required:true},
  lastName: {type: String, required:true},
  checkedInArray:[{dateCheckedIn:Date,tutorId:{
    type: Schema.Types.ObjectId,
    ref: "Tutor"
  },checkedIn:Boolean,noShow:Boolean, dayString:String,sessionTimes:Array}]

});

const Student = mongoose.model("Student",studentSchema);

module.exports = Student;