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
    // console.log(response);
    res.json(response);
  });
})

app.post("/api/students/checkin/:id",function(req,res){
  req.body.date = new Date();
  db.Student.findOneAndUpdate({_id:req.params.id},{$push:{checkedInArray:req.body}})
  .then(function(response){
    console.log("this has happened");
    res.status(200);
  })
});

app.post("/api/tutors",function(req,res){
db.Tutor.create(req.body).then(function(response){console.log(response)})
});
app.get("/api/tutors",function(req,res){
  db.Tutor.find().then(function(response){
    res.json(response);
  })
});

app.get("/schedule/tutors/:id",function(req,res){
  db.Tutor.findOne({_id:req.params.id})
  .then(function(response){
    res.json(response);
  })
})
// db.Student.create({
//   firstName:"test2",
//   lastName:"use2r",
//   permanentSchedule:[{dayInteger:2,tutorName:"Tyler",tutorId:"5ce4abfefab5493534075f70" ,time:["7:30","6:00","5:00"],sessionHours:1.5}]
// })

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

app.post("/api/newstudent",function(req,res){
  db.Student.create(req.body).then(resp=>res.json(resp))
})

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
