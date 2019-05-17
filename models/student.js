const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: {type:String, required:true},
  lastName: {type: String, required:true},
  permanentSchedule: [{dayInteger:Number, tutor: String, time: Array}],
  creditPurchased: {type:Number},
  creditUsed: {type:Number},
  creditRemaining:{type:Number},
  checkedInArray:[{date:Date,tutor:String,checkedIn:Boolean,noShow:Boolean, hoursUsed:Number}]

});

const Student = mongoose.model("Student",studentSchema);

module.exports = Student;