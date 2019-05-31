import React, {Component} from "react";
import API from "../../utils/API";
import HalfHour from "./HalfHour";
import moment from "moment";
class FullDay extends Component{
state={
scheduleObj:null
}

componentDidMount=()=>{
console.log("day"+moment().day())
}

render(){
    return(
        <>
        <div className="container">
            <h1 className="display-4">{this.props.dayString&&this.props.tutorFirstName?<>{this.props.dayString} / {this.props.tutorFirstName}</>:""}</h1>
        <table className="table table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Name</th>
      <th scope="col">Showed up?</th>
    </tr>
  </thead>
                    <tbody>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="oneThirty"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="twoClock"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="twoThirty"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="threeClock"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="threeThirty"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="fourClock"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="fourThirty"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="fiveClock"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="fiveThirty"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="sixClock"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="sixThirty"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="sevenClock"/><br/>
                    <HalfHour tutorId={this.props.tutorId} dayString={this.props.dayString} timeString="sevenThirty"/><br/>
                        
                    </tbody>
      </table>
      </div>
        </>
    )
}
};

export default FullDay;