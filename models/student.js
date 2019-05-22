const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: {type:String, required:true},
  lastName: {type: String, required:true},
  permanentSchedule: [{dayInteger:Number, tutorName: String, tutorId:String, time: Array, sessionHours:Number}],
  creditPurchased: {type:Number},
  creditUsed: {type:Number},
  creditRemaining:{type:Number},
  checkedInArray:[{date:Date,tutor:String,checkedIn:Boolean,noShow:Boolean, sessionHours:Number}]

});

const Student = mongoose.model("Student",studentSchema);

module.exports = Student;