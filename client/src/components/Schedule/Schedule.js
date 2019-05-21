import React, {Component} from "react";
import ScheduleRow from "./ScheduleRow";
import API from "../../utils/API";
import moment from "moment";
class Schedule extends Component {
    // date = new Date();
    state={
        tutor:"Tyler",
        timenow:moment().format('LLLL'),
        hasToday:[],
        day: new Date(),
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
        sevenThirty:[],
    };
    componentDidMount = () => {
    // console.log(this.dayInteger);
        console.log(`Now: ${moment().format('l')}`)
        API.getStudents().then(response=>{
            console.log(response);
            const hasToday3=[];

            for (let i=0; i<response.data.length; i++){
                for (let j=0;j<response.data[i].permanentSchedule.length;j++){
                    if (response.data[i].permanentSchedule[j].tutor===this.state.tutor && response.data[i].permanentSchedule[j].dayInteger===this.state.day.getDay()){
                        for (let k=0; k< response.data[i].permanentSchedule[j].time.length; k++){
                            var scheduleTime= response.data[i].permanentSchedule[j].time[k];
                            console.log(scheduleTime)
                            var objToDo=response.data[i].permanentSchedule[j];
                            objToDo.firstName=response.data[i].firstName;
                            objToDo.lastName=response.data[i].lastName;
                            objToDo.userId=response.data[i]._id;
                            objToDo.checkedIn=false;
                            var alreadyExists=false;
                            for(let n=0;n<this.state.hasToday.length;n++){

                                if (this.state.hasToday[n].userId===objToDo.userId){
                                    alreadyExists=true;
                                }
                            }
                           if(!alreadyExists){
                            this.setState({
                                hasToday:this.state.hasToday.concat([objToDo])
                            })
                           }
                            
                            switch(scheduleTime) {
                                case "1:30":
                                this.state.oneThirty.push(objToDo);
                                break;

                                case "2:00":
                                this.state.twoClock.push(objToDo);

                                break;

                                case "2:30":
                                this.state.twoThirty.push(objToDo);

                                break;

                                case "3:00":
                                this.state.threeClock.push(objToDo);

                                break;

                                case "3:30":
                                this.state.threeThirty.push(objToDo);

                                break;

                                case "4:00":
                                this.state.fourClock.push(objToDo);

                                break;

                                case "4:30":
                                this.state.fourThirty.push(objToDo);

                                break;

                                case "5:00":
                                this.state.fiveClock.push(objToDo);

                                break;

                                case "5:30":
                                this.state.fiveThirty.push(objToDo);

                                break;

                                case "6:00":
                                this.state.sixClock.push(objToDo);

                                break;

                                case "6:30":
                                this.state.sixThirty.push(objToDo);

                                break;

                                case "7:00":
                                this.state.sevenClock.push(objToDo);

                                break;

                                case "7:30":
                                this.state.sevenThirty.push(objToDo);

                                break;

                                default:
                                break;
                            }
                        }
                        
                        hasToday3.push(response.data[i])
                    }
                }
            }
            console.log(hasToday3);
            console.log(this.state)
            // this.setState({
            //     hasToday:hasToday3
            // })
        }
        )
    }

    

    handleCheckIn = (id,objToSend) => {
        console.log(id);
        console.log(objToSend);
        var objToMake = {
            sessionHours: objToSend.sessionHours,
            tutor: objToSend.tutor,
            date: new Date(),
            checkedIn: true,
            noShow: false
        };
        API.checkIn(id,objToMake);
        // for (i=0;i<this.state.)
    }

    render() {
        // var oneThirtyStudOne=this.state.oneThirty.studOne;
        setInterval(()=>{ this.setState({
            timenow: moment().format("LLLL")
        }) }, 1000);
        return(
<div className="container">
<div className="jumbotron">
<h1 className="display-4 text-center">
{this.state.timenow}
</h1>
</div>
<table className="table table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Name</th>
      <th scope="col">Showed up?</th>
      <th scope="col">Comments</th>
    </tr>
  </thead>
  <tbody>
   
    {
        /* {this.state.oneThirty.map(obj=>{
        return <ScheduleRow name={obj.name} time={obj.time} handleCheckIn={this.handleCheckIn} />
    })} */
    }

    {
        this.state.oneThirty.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="1:30" id={obj.userId} />
        })
    }
    {
        this.state.twoClock.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="2:00" id={obj.userId} />
        })
    }
        {
        this.state.twoThirty.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="2:30" id={obj.userId} />
        })
    }
    {
        this.state.threeClock.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="3:00" id={obj.userId} />
        })
    }
    {
        this.state.threeThirty.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="3:30" id={obj.userId} />
        })
    }
    {
        this.state.fourClock.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="4:00" id={obj.userId} />
        })
    }
    {
        this.state.fourThirty.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="4:30" id={obj.userId} />
        })
    }
    {
        this.state.fiveClock.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="5:00" id={obj.userId} />
        })
    }
    {
        this.state.fiveThirty.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="5:30" id={obj.userId} />
        })
    }
    {
        this.state.sixClock.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="6:00" id={obj.userId} />
        })
    }
    {
        this.state.sixThirty.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="6:30" id={obj.userId} />
        })
    }
    {
        this.state.sevenClock.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="7:00" id={obj.userId} />
        })
    }
    {
        this.state.sevenThirty.map(obj=>{
            
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} handleCheckIn={()=> {this.handleCheckIn(obj.userId,obj)}} time="7:30" id={obj.userId} />
        })
    }
    
   
  </tbody>
</table>
</div>)
    };
};

export default Schedule;