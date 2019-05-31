import React, {Component} from "react";
import moment from "moment";
class HourlySchedule extends Component{
state={
    timeNow:moment().format("llll"),
    pastHalfHourTime:null,
    currentHalfHourTime:null,
    futureHalfHourTime:null,
    pastHalfHourString:null,
    currentHalfHourString:null,
    futureHalfHourString:null,
    timeBeingUsed:null
}

componentDidMount=()=>{

   this.generateTimeSlots(moment())
   this.setState({
       timeBeingUsed:moment()
   })
    // setInterval(()=>{this.generateTimeSlots(moment())},60000)
    setInterval(()=>{console.log(this.state)},5000)
    // console.log(moment("7:30 PM").format('LT'))
    
}
goThirtyMinutesBack=()=>{
    console.log("clicked")
    console.log(this.state.timeBeingUsed.subtract(30,"minutes"))
    this.generateTimeSlots(this.state.timeBeingUsed.subtract(30,"minutes"))
}

generateTimeSlots=(momentObject)=>{
    const set=momentObject;
    this.setState({
        timeBeingUsed:set
    })
    var startOfCurrentHour=momentObject.startOf("hour");
    var thirtyMinutesAgo=momentObject.subtract(30,"minutes");
    momentObject.add(30,"minutes");
    console.log(startOfCurrentHour.format("lll"))
    console.log(thirtyMinutesAgo.format("lll"))
    if(moment(thirtyMinutesAgo).isBefore(startOfCurrentHour)){
        // const pastHalfHourTime=
        //add and subtract change the original object
        const pastHalfHourTime=momentObject.startOf("hour").subtract(30,"minutes").format("LT");
        const currentHalfHourTime=momentObject.startOf("hour").add(30,"minutes").format("LT");
        const futureHalfHourTime=momentObject.startOf("hour").add(30,"minutes").format("LT");
        const pastHalfHourString=this.momentStringToDayString(pastHalfHourTime);
        const currentHalfHourString=this.momentStringToDayString(currentHalfHourTime);
        const futureHalfHourString=this.momentStringToDayString(futureHalfHourTime);
        this.setState({
            pastHalfHourTime:pastHalfHourTime,
            currentHalfHourTime:currentHalfHourTime,
            futureHalfHourTime:futureHalfHourTime,
            pastHalfHourString:pastHalfHourString,
            currentHalfHourString:currentHalfHourString,
            futureHalfHourString:futureHalfHourString

        })
    } else{
        const pastHalfHourTime=momentObject.startOf("hour").format("LT");
        const currentHalfHourTime=momentObject.startOf("hour").add(30,"minutes").format("LT");
        const futureHalfHourTime=momentObject.startOf("hour").add(60,"minutes").format("LT");
        const pastHalfHourString=this.momentStringToDayString(pastHalfHourTime);
        const currentHalfHourString=this.momentStringToDayString(currentHalfHourTime);
        const futureHalfHourString=this.momentStringToDayString(futureHalfHourTime);
        this.setState({
            pastHalfHourTime:pastHalfHourTime,
            currentHalfHourTime:currentHalfHourTime,
            futureHalfHourTime:futureHalfHourTime,
            pastHalfHourString:pastHalfHourString,
            currentHalfHourString:currentHalfHourString,
            futureHalfHourString:futureHalfHourString

        })
    }
}

momentStringToDayString=(str)=>{
switch(str){
    case "1:30 PM":
    return "oneThirty"

    case "2:00 PM":
    return "twoClock";

    case "2:30 PM":
    return "twoThirty";

    case "3:00 PM":
    return "threeClock";

    case "3:30 PM":
    return "threeThirty";

    case "4:00 PM":
    return "fourClock";

    case "4:30 PM":
    return "fourThirty";

    case "5:00 PM":
    return "fiveClock";

    case "5:30 PM":
    return "fiveThirty";

    case "6:00 PM":
    return "sixClock";

    case "6:30 PM":
    return "sixThirty";

    case "7:00 PM":
    return "sevenClock";

    case "7:30 PM":
    return "sevenThirty";

    default:
    return false;
    

}
}

render(){
    return(
        <>
        
        <div className="row">
        <div className="col-md-4 text-center">
            <button className="btn btn-danger" onClick={this.goThirtyMinutesBack}><i class="fas fa-arrow-left"></i></button>
        <h1>
            {this.state.pastHalfHourTime||"loading"}
            </h1>
        </div>
        <div className="col-md-4 text-center">
        <h1>
        {this.state.currentHalfHourTime||"loading"}
        </h1>
</div>

<div className="col-md-4 text-center">
<button className="btn btn-danger"><i class="fas fa-arrow-right"></i></button>

<h1>
{this.state.futureHalfHourTime||"loading"}
</h1>
</div>
        </div>
        
        </>
    )
}
};
export default HourlySchedule;