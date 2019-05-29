const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");
const mongodb=require("mongodb");

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
  db.Student.create(req.body).then(resp=>res.json(resp))
});

app.get("/api/students",function(req,res){
  console.log("req received")
  db.Student.find()
  .then(response=>{
    // console.log(response);
    res.json(response);
  });
});

app.post("/api/search/students",function(req,res){
  db.Student.find(req.body)
  .then(response=>{
    res.json(response);
  })
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
  createTutorObj(req.body.firstName,req.body.lastName)
});

app.get("/api/tutors",function(req,res){
  db.Tutor.find().then(function(response){
    res.json(response);
  })
});
function createSevenDays(cb){
  const arrayOfIds=[];
  for(let i=0;i<7;i++){
  db.scheduleDay.create({
    oneThirty:[],
    twoClock:[],
    twoThirty:[],
    threeClock:[],
    threeThirty:[],
    fourClock:[],
    fourThirty:[],
    fiveClock:[],
    fiveThirty:[],
    sixClock:[],
    sixThirty:[],
    sevenClock:[],
    }).then(function(response){
      arrayOfIds.push(response._id)
      if(arrayOfIds.length===7){
        cb(arrayOfIds)
      }
    })
  }
}
function createScheduleObj(cb){
createSevenDays(response=>
  {
    // const daysOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    
      db.scheduleObj.create({
        Sunday:response[0],
        Monday:response[1],
        Tuesday:response[2],
        Wednesday:response[3],
        Thursday:response[4],
        Friday:response[5],
        Saturday:response[6]
      })
      .then(function(response2){
        // console.log(response2)
        db.scheduleObj.findOne({_id:response2._id})
        .populate("Sunday Monday Tuesday Wednesday Thursday Friday Saturday")
        .then(function(response3){
          cb(response3._id)
        })
      })
    
  })
}
function createTutorObj(firstName,lastName){
  createScheduleObj(schedId=>{
db.Tutor.create({
firstName:firstName,
lastName:lastName,
permSchedule:schedId
})
.then(function(response){
  db.Tutor.findOne({_id:response._id})
  .populate({path:"permSchedule",populate:{path:"Monday Tuesday Wednesday Thursday Friday Saturday",populate:{path:"oneThirty twoClock twoThirty threeClock threeThirty fourClock fourThirty fiveClock fiveThirty sixClock sixThirty sevenClock sevenThirty"}}})
  .then(function(response2){
    console.log(response2)
  })
})
})
}
// createScheduleObj()
// createTutorObj("cee222","mack222")
// createOneDay()
app.post("/",function(req,res){

  db.scheduleObj.find()
  .populate({path:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday",model:"scheduleDay",
    populate:{path:"oneThirty twoClock twoThirty threeClock threeThirty fourClock fourThirty fiveClock fiveThirty sixClock sixThirty sevenClock sevenThirty",model:"Student"},
    // populate:{path:"oneThirty",model:"Student"}
  
  })
  .exec((err,posts)=>{
    const length=posts.length
    console.log(posts)
    res.json(posts)
  })

});
app.post("/test",function(req,res){
  db.Tutor.find()
  .populate({path:"permSchedule",populate:{path:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday",populate:{path:"oneThirty twoClock twoThirty threeClock threeThirty fourClock fourThirty fiveClock fiveThirty sixClock sixThirty sevenClock sevenThirty"}}})
  
  .then(function(response){
    console.log(response)
    res.json(response)
  })
})

app.get("/api/tutors/schedule/:tutorId/:day",function(req,res){

    db.Tutor.findOne({_id:req.params.tutorId})
  .populate({path:"permSchedule",populate:{path:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday",populate:{path:"oneThirty twoClock twoThirty threeClock threeThirty fourClock fourThirty fiveClock fiveThirty sixClock sixThirty sevenClock sevenThirty"}}})
.then(function(response){
  console.log(response[req.params.day.toString()])
  res.json(response.permSchedule[req.params.day])
})
})
app.get("/api/tutors/schedule/:tutorId/:day/:timeslot",function(req,res){
db.Tutor.findOne({_id:req.params.tutorId})
.populate({path:"permSchedule",populate:{path:req.params.day,populate:{path:req.params.timeslot}}})
.then(function(response){
  res.json(response.permSchedule[req.params.day][req.params.timeslot])
})
})
// db.scheduleDay.find()
// .populate({path:"oneThirty",model:"Student"})
// .exec((err,posts)=>{
//   const length=posts.length
//   console.log(posts[length-1].oneThirty)
// })
// db.scheduleDay.find()
// .then(function(response){
//   console.log(response)
// })
app.get("/schedule/tutors/:id",function(req,res){
  db.Tutor.findOne({_id:req.params.id})
  .then(function(response){
    res.json(response);
  })
});
app.delete("/api/students/schedule/:studentId/:scheduleId",function(req,res){
  db.Student.findOne({_id:req.params.studentId})
  .then(function(response){
    // console.log(response)
    var schedArr=response.permanentSchedule;
    for (let i=0;i<schedArr.length;i++){
      console.log(schedArr[i]._id)
      console.log("check: "+req.params.scheduleId)
      console.log(schedArr[i]._id.toString()===req.params.scheduleId)
      if(schedArr[i]._id.toString()===req.params.scheduleId){
        console.log(schedArr[i])
      }
    }
    // console.log(response)
    // console.log(req.params.scheduleId)
    res.json(response);
  })
})


// db.Student.create({
//   firstName:"something",
//   lastName:"name",
//   permanentSchedule:[{dayInteger:2,tutorName:"Tyler",tutorId:"5ce4abfefab5493534075f70" ,time:["7:30","6:00","5:00"],sessionHours:1.5},
//   {dayInteger:1,tutorName:"Tyler",tutorId:"5ce4abfefab5493534075f70" ,time:["1:30","2:00","2:30"],sessionHours:1.5},
//   {dayInteger:3,tutorName:"Tyler",tutorId:"5ce4abfefab5493534075f70" ,time:["2:00","6:00","5:00"],sessionHours:1.5},
// ]
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
