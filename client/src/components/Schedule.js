import React, {Component} from "react";
import ScheduleRow from "./ScheduleRow";
class Schedule extends Component {
    state={
        oneThirty:[
            {
                name:"Cmack",
                checkedIn:null,
                outToday:false,
                time:"1:30"
            },
            {
                name:"Caillou",
                checkedIn:null,
                outToday:false,
                time:"1:30"
            },
            {
                name:"Jones",
                checkedIn:null,
                outToday:false,
                time:"1:30"
            }
        ],
        twoClock:{

        },
        twoThirty:{

        },
        threeClock:{

        },

    };

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
   
    {this.state.oneThirty.map(obj=>{
        return <ScheduleRow name={obj.name} time={obj.time} handleCheckIn={this.handleCheckIn} />
    })}
    
    
   
  </tbody>
</table>
</div>)
    };
};

export default Schedule;