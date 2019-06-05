const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: {type:String, required:true},
  lastName: {type: String, required:true},
  checkedInArray:[{dateCheckedIn:String,tutorId:{
    type: Schema.Types.ObjectId,
    ref: "Tutor"
  },checkedIn:Boolean,noShow:{type:Boolean,default:false}, dayString:String,sessionTimes:Array,hasBeenLogged:{type:Boolean,default:false}}]
});

const Student = mongoose.model("Student",studentSchema);

module.exports = Student;