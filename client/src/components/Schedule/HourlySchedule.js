import React, {Component} from "react";
import moment from "moment";
import API from "../../utils/API";
import HalfHour from "./HalfHour";
class HourlySchedule extends Component{
state={
    timeNow:moment().format("llll"),
    pastHalfHourTime:null,
    currentHalfHourTime:null,
    futureHalfHourTime:null,
    pastHalfHourString:null,
    currentHalfHourString:null,
    futureHalfHourString:null,
    timeBeingUsed:null,
    dayPickedString:null,
    daysOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    tutorIdArr:null
}



componentDidMount=()=>{

   this.generateTimeSlots(moment());
   this.setState({
        dayPickedString:this.state.daysOfWeek[moment().day()]
   })
    // setInterval(()=>{this.generateTimeSlots(moment())},60000)
    setInterval(()=>{console.log(this.state)},5000)
    // console.log(moment("7:30 PM").format('LT'))
    setTimeout(()=>this.callAPI(),5000)
    API.getTutorIds()
    .then(response=>{
        console.log(response)
        this.setState({
            tutorIdArr:response.data
        })
    })
}

callAPI=()=>{
    this.setState({
        tutorIdArr:null
    })
    API.getTutorIds()
    .then(response=>{
        console.log(response)
        this.setState({
            tutorIdArr:response.data
        })
    })
}

generateTimeSlots=(momentObject)=>{
    const set=momentObject;
    this.setState({
        timeBeingUsed:set
    })
    var startOfCurrentHour=set.startOf("hour");
    var thirtyMinutesAgo=set.subtract(30,"minutes");
    set.add(30,"minutes");
    console.log(startOfCurrentHour.format("lll"))
    console.log(thirtyMinutesAgo.format("lll"))
    if(moment(thirtyMinutesAgo).isBefore(startOfCurrentHour)){
        // const pastHalfHourTime=
        //add and subtract change the original object
        const pastHalfHourTime=set.startOf("hour").subtract(30,"minutes").format("LT");
        const currentHalfHourTime=set.startOf("hour").add(30,"minutes").format("LT");
        const futureHalfHourTime=set.startOf("hour").add(30,"minutes").format("LT");
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
        const pastHalfHourTime=set.startOf("hour").format("LT");
        const currentHalfHourTime=set.startOf("hour").add(30,"minutes").format("LT");
        const futureHalfHourTime=set.startOf("hour").add(60,"minutes").format("LT");
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

goThirtyMinutesBack=()=>{
    const pastHalfHourTime=this.state.pastHalfHourTime
    const nextPastHalfHourTime=this.arithmeticThirtyMinutesFromLT(pastHalfHourTime,"subtract")
    const currentHalfHourTime=this.state.currentHalfHourTime;
    const nextCurrentHalfHourTime=this.arithmeticThirtyMinutesFromLT(currentHalfHourTime,"subtract");
    const futureHalfHourTime=this.state.futureHalfHourTime;
    const nextFutureHalfHourTime=this.arithmeticThirtyMinutesFromLT(futureHalfHourTime,"subtract");
    const nextPastHalfHourString=this.momentStringToDayString(nextPastHalfHourTime);
    const nextCurrentHalfHourString=this.momentStringToDayString(nextCurrentHalfHourTime);
    const nextFutureHalfHourString=this.momentStringToDayString(nextFutureHalfHourTime);
    this.setState({
        pastHalfHourTime:nextPastHalfHourTime,
        currentHalfHourTime:nextCurrentHalfHourTime,
        futureHalfHourTime:nextFutureHalfHourTime,
        pastHalfHourString:nextPastHalfHourString,
        currentHalfHourString:nextCurrentHalfHourString,
        futureHalfHourString:nextFutureHalfHourString

    });
    setTimeout(this.callAPI,2000)
}
goThirtyMinutesForward=()=>{
    const pastHalfHourTime=this.state.pastHalfHourTime
    const nextPastHalfHourTime=this.arithmeticThirtyMinutesFromLT(pastHalfHourTime,"add")
    const currentHalfHourTime=this.state.currentHalfHourTime;
    const nextCurrentHalfHourTime=this.arithmeticThirtyMinutesFromLT(currentHalfHourTime,"add");
    const futureHalfHourTime=this.state.futureHalfHourTime;
    const nextFutureHalfHourTime=this.arithmeticThirtyMinutesFromLT(futureHalfHourTime,"add");
    const nextPastHalfHourString=this.momentStringToDayString(nextPastHalfHourTime);
    const nextCurrentHalfHourString=this.momentStringToDayString(nextCurrentHalfHourTime);
    const nextFutureHalfHourString=this.momentStringToDayString(nextFutureHalfHourTime);
    this.setState({
        pastHalfHourTime:nextPastHalfHourTime,
        currentHalfHourTime:nextCurrentHalfHourTime,
        futureHalfHourTime:nextFutureHalfHourTime,
        pastHalfHourString:nextPastHalfHourString,
        currentHalfHourString:nextCurrentHalfHourString,
        futureHalfHourString:nextFutureHalfHourString

    });
    setTimeout(this.callAPI,2000)

}

arithmeticThirtyMinutesFromLT=(LTString,addsubtract)=>{
    return moment(LTString,"LT")[addsubtract](30,"minutes").format("LT")
}
setDayString=event=>{
    this.callAPI()
    const {name}=event.target;
    this.setState({
        dayPickedString:name
    })
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

generateDayButtons=()=>{
    const mapThis=this.state.daysOfWeek.filter(day=>day!=="Sunday"&&day!=="Saturday")
    return(mapThis.map(day=>{
        return(
            <>
            <div className="col-md-2 text-center mb-4"><button className={`btn btn-${day===this.state.dayPickedString ? "primary":"secondary"} ${day===this.state.daysOfWeek[moment().day()] ? "w-100":""}`} name={day} onClick={this.setDayString}>{day===this.state.daysOfWeek[moment().day()] ? "(TODAY) ":""}{day}</button></div>
            </>
        )
    })
    )
}

render(){
    return(
        <>
        
        <div className="row mt-2">
        <div className="col-md-1 text-center mb-4"></div>
            {this.generateDayButtons()}
        <div className="col-md-1 text-center mb-4"></div><br/>

        <div className="col-md-4 text-center">
            <button className="btn btn-danger" onClick={this.goThirtyMinutesBack}><i class="fas fa-arrow-left"></i></button>
        <h1>
            {this.state.pastHalfHourTime||"loading"}
            </h1>
        </div>
        <div className="col-md-4 text-center">
        <button className="btn btn-success" onClick={()=>{this.generateTimeSlots(moment()); this.callAPI()}}>Back to Present</button>

        <h1>
        {this.state.currentHalfHourTime||"loading"}
        </h1>
</div>

<div className="col-md-4 text-center">
<button className="btn btn-danger" onClick={this.goThirtyMinutesForward}><i class="fas fa-arrow-right"></i></button>

<h1>
{this.state.futureHalfHourTime||"loading"}
</h1>
</div>

<div className="col-md-4">
    {this.state.tutorIdArr ? <>
    {this.state.tutorIdArr.map(obj=>{
        return(<>   <h4>{obj.firstName} {obj.lastName}</h4>
        <table className="table table-sm table-hover">
            <tbody>
        <HalfHour tutorId={obj._id} dayString={this.state.dayPickedString} timeString={this.state.pastHalfHourString} />
        </tbody>
        </table>
        <br></br>
        </>)
    })}
    </>:<></>}
</div>
<div className="col-md-4">
    {this.state.tutorIdArr ? <>
    {this.state.tutorIdArr.map(obj=>{
        return(<>   <h4>{obj.firstName} {obj.lastName}</h4>
        <table className="table table-sm table-hover">
            <tbody>
        <HalfHour tutorId={obj._id} dayString={this.state.dayPickedString} timeString={this.state.currentHalfHourString} />
        </tbody>
        </table>
        <br></br>
        </>)
    })}
    </>:<></>}
</div><div className="col-md-4">
    {this.state.tutorIdArr ? <>
    {this.state.tutorIdArr.map(obj=>{
        return(<>   <h4>{obj.firstName} {obj.lastName}</h4>
        <table className="table table-sm table-hover">
            <tbody>
        <HalfHour tutorId={obj._id} dayString={this.state.dayPickedString} timeString={this.state.futureHalfHourString} />
        </tbody>
        </table>
        <br></br>
        </>)
    })}
    </>:<></>}
</div>
        </div>
        
        </>
    )
}
};
export default HourlySchedule;