import React, {Component} from "react";
import ScheduleRow from "./ScheduleRow";
import API from "../../utils/API";
class Schedule extends Component {
    // date = new Date();
    state={
        tutor:"Tyler",
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

        API.getStudents().then(response=>{
            console.log(response);
            const hasToday3=[];

            for (let i=0; i<response.data.length; i++){
                for (let j=0;j<response.data[i].permanentSchedule.length;j++){
                    if (response.data[i].permanentSchedule[j].tutor===this.state.tutor && response.data[i].permanentSchedule[j].dayInteger===this.state.day.getDay()){
                        for (let k=0; k< response.data[i].permanentSchedule[j].time.length; k++){
                            var scheduleTime= response.data[i].permanentSchedule[j].time[k];
                            console.log(scheduleTime)
                            switch(scheduleTime) {
                                case "1:30":
                                this.state.oneThirty.push(response.data[i]);
                                break;

                                case "2:00":
                                this.state.twoClock.push(response.data[i]);

                                break;

                                case "2:30":
                                this.state.twoThirty.push(response.data[i]);

                                break;

                                case "3:00":
                                this.state.threeClock.push(response.data[i]);

                                break;

                                case "3:30":
                                this.state.threeThirty.push(response.data[i]);

                                break;

                                case "4:00":
                                this.state.fourClock.push(response.data[i]);

                                break;

                                case "4:30":
                                this.state.fourThirty.push(response.data[i]);

                                break;

                                case "5:00":
                                this.state.fiveClock.push(response.data[i]);

                                break;

                                case "5:30":
                                this.state.fiveThirty.push(response.data[i]);

                                break;

                                case "6:00":
                                this.state.sixClock.push(response.data[i]);

                                break;

                                case "6:30":
                                this.state.sixThirty.push(response.data[i]);

                                break;

                                case "7:00":
                                this.state.sevenClock.push(response.data[i]);

                                break;

                                case "7:30":
                                this.state.sevenThirty.push(response.data[i]);

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
            this.setState({
                hasToday:hasToday3
            })
        }
        )
    }

    

    handleCheckIn = event => {
        console.log(event.target)
    }

    render() {
        // var oneThirtyStudOne=this.state.oneThirty.studOne;
        return(
<div className="container">
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
   
    {/* {this.state.oneThirty.map(obj=>{
        return <ScheduleRow name={obj.name} time={obj.time} handleCheckIn={this.handleCheckIn} />
    })} */}

    {
        this.state.oneThirty.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="1:30" id={obj._id} />
        })
    }
    {
        this.state.twoClock.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="2:00" id={obj._id} />
        })
    }
        {
        this.state.twoThirty.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="2:30" id={obj._id} />
        })
    }
    {
        this.state.threeClock.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="3:00" id={obj._id} />
        })
    }
    {
        this.state.threeThirty.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="3:30" id={obj._id} />
        })
    }
    {
        this.state.fourClock.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="4:00" id={obj._id} />
        })
    }
    {
        this.state.fourThirty.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="4:30" id={obj._id} />
        })
    }
    {
        this.state.fiveClock.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="5:00" id={obj._id} />
        })
    }
    {
        this.state.fiveThirty.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="5:30" id={obj._id} />
        })
    }
    {
        this.state.sixClock.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="6:00" id={obj._id} />
        })
    }
    {
        this.state.sixThirty.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="6:30" id={obj._id} />
        })
    }
    {
        this.state.sevenClock.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="7:00" id={obj._id} />
        })
    }
    {
        this.state.sevenThirty.map(obj=>{
            const name =obj.firstName + " " + obj.lastName;
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time="7:30" id={obj._id} />
        })
    }
    
   
  </tbody>
</table>
</div>)
    };
};

export default Schedule;