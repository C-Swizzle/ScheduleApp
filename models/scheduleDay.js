var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var scheduleDaySchema= new Schema({
oneThirty:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
twoClock:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
twoThirty:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
threeClock:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
threeThirty:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
fourClock:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
fourThirty:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
fiveClock:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
fiveThirty:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
sixClock:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
sixThirty:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
sevenClock:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],
sevenThirty:[{
    type: Schema.Types.ObjectId,
    ref: "student"
  }],

});





var scheduleDay = mongoose.model("scheduleDay", scheduleDaySchema);

// Export the scheduleDay model
module.exports = scheduleDay;
