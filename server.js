const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(routes);

app.post("/api/students",function(req,res){
  console.log(req.body);
});

app.get("/api/students",function(req,res){
  console.log("req received")
  db.Student.find()
  .then(response=>{
    console.log(response);
    res.json(response);
  });
})
db.Student.create({
  firstName:"test",
  lastName:"user",
  permanentSchedule:{dayInteger:1,tutor:"Chris",time:["1:30","2:00","3:00"]}
})

// db.Student.findOneAndUpdate({name:"chris",creditPurchased:999},{ $push:{ permanentSchedule:
//   {day:1,
//   tutor:"Chris",
//   time:["1:30","2:00","2:30"]
//   }
// }
// }).then(response => console.log(response));
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/scheduleapp",{useNewUrlParser:true});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
