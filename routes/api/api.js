const express = require("express");

const mongoose = require("mongoose");
// const routes = require("./routes");
// const router = express();
const PORT = process.env.PORT || 3001;
const db = require("../../models");
const mongodb=require("mongodb");
const moment=require("moment");
const router=require("express").Router()

router.post("/api/students",function(req,res){
    console.log(req.body);
    db.Student.create(req.body).then(resp=>res.json(resp))
  });
  
  router.get("/api/students",function(req,res){
    console.log("req received")
    db.Student.find()
    .then(response=>{
      // console.log(response);
      res.json(response);
    });
  });
  
  router.post("/api/search/students",function(req,res){
    db.Student.find(req.body)
    .then(response=>{
      res.json(response);
    })
  })
  
  
  router.post("/api/students/checkin/:id",function(req,res){
  
    db.scheduleDay.findOne({_id:req.body.scheduleDayId})
    .then(function(response){
      console.log(response)
      const timeArr=["oneThirty","twoClock","twoThirty","threeClock","threeThirty","fourClock","fourThirty","fiveClock","fiveThirty","sixClock","sixThirty","sevenClock","sevenThirty"];
      var count=0;
      const timeStudentWasHere=[]
      for(let i=0;i<timeArr.length;i++){
        for (let k=0;k<response[timeArr[i]].length;k++){
          console.log(response[timeArr[i]][k])
          if(response[timeArr[i]][k].toString()===req.params.id){
            count++;
            timeStudentWasHere.push(timeArr[i])
          }
        }
      }
      console.log(count)
      console.log(timeStudentWasHere)
      checkedInObject={
        dateCheckedIn:moment().format(),
        tutorId:req.params.tutorId,
        checkedIn:1,
        sessionTimes:timeStudentWasHere,
        dayString:req.body.dayString
      }
      db.Student.findOne({_id:req.params.id})
      .then(function(response100){
        if(response100.checkedInArray.length>0){
          console.log(response100.checkedInArray[response100.checkedInArray.length-1])
        const lastCheckIn=moment(response100.checkedInArray[response100.checkedInArray.length-1].dateCheckedIn)
        const lastDayString=response100.checkedInArray[response100.checkedInArray.length-1].dayString
        // console.log("last:"+lastCheckIn)
        if(lastCheckIn.startOf("day").isSame(moment().startOf("day"))&&lastDayString===req.body.dayString){
          res.status(400)
          console.log("same day")
        } else{
          console.log("making check in hrouteren")
          db.Student.findOneAndUpdate({_id:req.params.id},{$push:{checkedInArray:checkedInObject}})
          .then(function(response2){
            // console.log(response2)
            res.json(response2)
          })
        }
  
        } else{
          console.log("making check in hrouteren 2")
  
          db.Student.findOneAndUpdate({_id:req.params.id},{$push:{checkedInArray:checkedInObject}})
          .then(function(response2){
            // console.log(response2)
            res.json(response2)
          })
  
        }
  
        
      })
      
    })
  
    // db.Student.findOneAndUpdate({_id:req.params.id},{$push:{checkedInArray:req.body}})
    // .then(function(response){
    //   console.log("this has hrouterened");
    //   res.status(200);
    // })
  });
  
  
  router.post("/api/students/noshow/:id",function(req,res){
  
    db.scheduleDay.findOne({_id:req.body.scheduleDayId})
    .then(function(response){
      console.log(response)
      const timeArr=["oneThirty","twoClock","twoThirty","threeClock","threeThirty","fourClock","fourThirty","fiveClock","fiveThirty","sixClock","sixThirty","sevenClock","sevenThirty"];
      var count=0;
      const timeStudentWasHere=[]
      for(let i=0;i<timeArr.length;i++){
        for (let k=0;k<response[timeArr[i]].length;k++){
          console.log(response[timeArr[i]][k])
          if(response[timeArr[i]][k].toString()===req.params.id){
            count++;
            timeStudentWasHere.push(timeArr[i])
          }
        }
      }
      console.log(count)
      console.log(timeStudentWasHere)
      checkedInObject={
        dateCheckedIn:moment().format(),
        tutorId:req.params.tutorId,
        checkedIn:0,
        noShow:1,
        sessionTimes:timeStudentWasHere,
        dayString:req.body.dayString
      }
      db.Student.findOne({_id:req.params.id})
      .then(function(response100){
        if(response100.checkedInArray.length>0){
          console.log(response100.checkedInArray[response100.checkedInArray.length-1])
        const lastCheckIn=moment(response100.checkedInArray[response100.checkedInArray.length-1].dateCheckedIn)
        const lastDayString=response100.checkedInArray[response100.checkedInArray.length-1].dayString
        // console.log("last:"+lastCheckIn)
        if(lastCheckIn.startOf("day").isSame(moment().startOf("day"))&&lastDayString===req.body.dayString){
          res.status(400)
          console.log("same day")
        } else{
          console.log("making no show hrouteren")
          db.Student.findOneAndUpdate({_id:req.params.id},{$push:{checkedInArray:checkedInObject}})
          .then(function(response2){
            // console.log(response2)
            res.json(response2)
          })
        }
  
        } else{
          console.log("making no show hrouteren 2")
  
          db.Student.findOneAndUpdate({_id:req.params.id},{$push:{checkedInArray:checkedInObject}})
          .then(function(response2){
            res.json(response2)
          })
  
        }
      })
    })
  });
  
  
  router.post("/api/tutors",function(req,res){
    createTutorObj(req.body.firstName,req.body.lastName,resp=>{res.json(resp)})
  });
  
  router.get("/api/tutors",function(req,res){
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
  function createTutorObj(firstName,lastName,cb){
    createScheduleObj(schedId=>{
  db.Tutor.create({
  firstName:firstName,
  lastName:lastName,
  permSchedule:schedId
  })
  .then(function(response){
    db.Tutor.findOne({_id:response._id})
    // .populate({path:"permSchedule",populate:{path:"Monday Tuesday Wednesday Thursday Friday Saturday",populate:{path:"oneThirty twoClock twoThirty threeClock threeThirty fourClock fourThirty fiveClock fiveThirty sixClock sixThirty sevenClock sevenThirty"}}})
    .then(function(response2){
      cb(response2)
    })
  })
  })
  }
  // createScheduleObj()
  // createTutorObj("cee222","mack222")
  // createOneDay()
  // router.post("/",function(req,res){
  
  //   db.scheduleObj.find()
  //   .populate({path:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday",model:"scheduleDay",
  //     populate:{path:"oneThirty twoClock twoThirty threeClock threeThirty fourClock fourThirty fiveClock fiveThirty sixClock sixThirty sevenClock sevenThirty",model:"Student"},
  //     // populate:{path:"oneThirty",model:"Student"}
    
  //   })
  //   .exec((err,posts)=>{
  //     const length=posts.length
  //     console.log(posts)
  //     res.json(posts)
  //   })
  
  // });
  router.post("/test",function(req,res){
    db.Tutor.find()
    .populate({path:"permSchedule",populate:{path:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday",populate:{path:"oneThirty twoClock twoThirty threeClock threeThirty fourClock fourThirty fiveClock fiveThirty sixClock sixThirty sevenClock sevenThirty"}}})
    
    .then(function(response){
      console.log(response)
      res.json(response)
    })
  })
  
  router.get("/api/tutors/schedule/:tutorId/:day",function(req,res){
  
      db.Tutor.findOne({_id:req.params.tutorId})
    .populate({path:"permSchedule",populate:{path:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday",populate:{path:"oneThirty twoClock twoThirty threeClock threeThirty fourClock fourThirty fiveClock fiveThirty sixClock sixThirty sevenClock sevenThirty"}}})
  .then(function(response){
    console.log(response[req.params.day.toString()])
    res.json(response.permSchedule[req.params.day])
  })
  })
  router.get("/api/tutors/schedule/:tutorId/:day/:timeslot",function(req,res){
  db.Tutor.findOne({_id:req.params.tutorId})
  .populate({path:"permSchedule",populate:{path:req.params.day,populate:{path:req.params.timeslot}}})
  .then(function(response){
    const arrToRespondWith=response.permSchedule[req.params.day][req.params.timeslot];
    // arrToRespondWith.scheduleDayId=response.permSchedule[req.params.day]._id;
    // console.log(arrToRespondWith)
    res.json(arrToRespondWith)
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
  router.get("/api/tutors/justtheidplease/schedule/:tutorId/:day",function(req,res){
  
    db.Tutor.findOne({_id:req.params.tutorId})
  .populate({path:"permSchedule",populate:{path:req.params.day}})
  .then(function(response){
  console.log(response[req.params.day.toString()])
  res.json(response.permSchedule[req.params.day]._id)
  })
  })
  router.get("/schedule/tutors/:id",function(req,res){
    db.Tutor.findOne({_id:req.params.id})
    .then(function(response){
      res.json(response);
    })
  });
  router.delete("/api/students/schedule/:studentId/:scheduleId",function(req,res){
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
  router.post("/api/tutors/addtoschedule",function(req,res){
    db.scheduleDay.findOneAndUpdate({_id:req.body.scheduleDayId},{$push:{[req.body.timeString]:req.body.studentId}})
    .then(function(response){
      res.json(response)
    })
  })
     
      router.post("/api/tutors/takeoffschedule",function(req,res){
        console.log("anythihng")
        console.log(req)
        db.scheduleDay.findByIdAndUpdate({_id:req.body.scheduleDayId},{$pull:{[req.body.timeString]:req.body.studentId}})
        .then(function(response){
          console.log("anything")
          console.log(response)
          res.json(response)
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
  router.get("/api/tutors/allids",function(req,res){
    db.Tutor.find()
    .then(function(response){
      const arrToSend=[]
      for(var i=0;i<response.length;i++){
        arrToSend.push({_id:response[i]._id,firstName:response[i].firstName,lastName:response[i].lastName})
      }
      res.json(arrToSend)
    })
  })
  
  router.post("/api/tutors/hourly",function(req,res){
    console.log(req.body.slotOne)
    const arrayOfSlots=[req.body.slotOne,req.body.slotTwo,req.body.slotThree];
    console.log(arrayOfSlots)
    const timePath=arrayOfSlots.join(" ");
    console.log(timePath)
    db.Tutor.find()
  .populate({path:"permSchedule",populate:{path:req.body.dayString,populate:{path:timePath}}})
    .then(function(response){
      // console.log(response)
      // console.log(response.length)
      const arrToSendBack=[]
      for(var i=0;i<response.length;i++){
        arrToSendBack.push({
          tutorId:response[i]._id,
          dayString:req.body.dayString,
          slotOneArr:response[i].permSchedule[req.body.dayString][req.body.slotOne],
          slotTwoArr:response[i].permSchedule[req.body.dayString][req.body.slotTwo],
          slotThreeArr:response[i].permSchedule[req.body.dayString][req.body.slotThree],
        })
        console.log(arrToSendBack)
      }
      res.json(arrToSendBack);
    })
  })
  
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/scheduleapp",{useNewUrlParser:true});
  module.exports=router;