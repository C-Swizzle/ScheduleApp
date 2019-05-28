const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleObjSchema = new Schema({
  Sunday:{
    type: Schema.Types.ObjectId,
    ref: "scheduleDay"
  },
  // Monday:{
  //   type: Schema.Types.ObjectId,
  //   ref: "scheduleDay"
  // },
  // Tuesday:{
  //   type: Schema.Types.ObjectId,
  //   ref: "scheduleDay"
  // },
  // Wednesday:{
  //   type: Schema.Types.ObjectId,
  //   ref: "scheduleDay"
  // },
  // Thursday:{
  //   type: Schema.Types.ObjectId,
  //   ref: "scheduleDay"
  // },
  // Friday:{
  //   type: Schema.Types.ObjectId,
  //   ref: "scheduleDay"
  // },
  // Saturday:{
  //   type: Schema.Types.ObjectId,
  //   ref: "scheduleDay"
  // }

});

const scheduleObj = mongoose.model("scheduleObj",scheduleObjSchema);

module.exports = scheduleObj;