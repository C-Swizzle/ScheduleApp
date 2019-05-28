var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var scheduleDaySchema= new Schema({
oneThirty:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
twoClock:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
twoThirty:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
threeClock:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
threeThirty:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
fourClock:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
fourThirty:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
fiveClock:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
fiveThirty:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
sixClock:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
sixThirty:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
sevenClock:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
sevenThirty:[{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],

});





var scheduleDay = mongoose.model("scheduleDay", scheduleDaySchema);

// Export the scheduleDay model
module.exports = scheduleDay;
