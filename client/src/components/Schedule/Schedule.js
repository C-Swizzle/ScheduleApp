import React, {Component} from "react";
import ScheduleRow from "./ScheduleRow";
import API from "../../utils/API";
class Schedule extends Component {
    state={
        tutor:"Chris",
        hasToday:[]
    };

    componentDidMount = () => {
        API.getStudents().then(response=>{
            console.log(response);
            var date = new Date();
            console.log(date.getDay())
            var hasToday = response.data.filter(obj => {
                return obj.permanentSchedule[0].tutor===this.state.tutor;
            });
            console.log(hasToday);
            this.setState({
                hasToday:hasToday
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
        this.state.hasToday.map(obj=>{
            return <ScheduleRow name={obj.firstName + " " + obj.lastName} time={obj.permanentSchedule[0].time[0]} />
        })
    }
    {console.log(Date())}
    
   
  </tbody>
</table>
</div>)
    };
};

export default Schedule;