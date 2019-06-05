import React, {Component} from "react";
import API from "../../utils/API";
import OneEmptySlot from "./OneEmptySlot";
import OneFilledSlotMap from "./OneFilledSlotMap";
class HalfHour extends Component{
state={
timeArr:null,
relationalObject:{
    oneThirty:"1:30",
    twoClock:"2:00",
    twoThirty:"2:30",
    threeClock:"3:00",
    threeThirty:"3:30",
    fourClock:"4:00",
    fourThirty:"4:30",
    fiveClock:"5:00",
    fiveThirty:"5:30",
    sixClock:"6:00",
    sixThirty:"6:30",
    sevenClock:"7:00",
    sevenThirty:"7:30"
},
timeNow:null,
}

componentDidMount=()=>{
this.generateSlot()
}

generateSlot=()=>{
    API.getHalfHourSlot(this.props.tutorId||"5cedea5d4869e4199c4759cf",this.props.dayString||"Tuesday",this.props.timeString||"twoClock")
.then(response=>{
const myTime=this.props.timeString;
const myTimeToSend=this.state.relationalObject[myTime];
// console.log(response)
    this.setState({
        timeArr:response.data,
        timeNow:myTimeToSend
    })
});
}



render(){
    return(
        <>

            {this.state.timeArr ?
                <>
                    {this.state.timeArr.length > 3 ?
                        <>
                            <OneFilledSlotMap tableType="danger" refresh={this.generateSlot} timeNow={this.state.timeNow} timeArr={this.state.timeArr}  tutorId={this.props.tutorId} dayString={this.props.dayString} dayDate={this.props.dayDate} timeString={this.props.timeString}/>
                        </> : ""}
                    {this.state.timeArr.length === 3 ? <>
                            <OneFilledSlotMap timeNow={this.state.timeNow} timeArr={this.state.timeArr} refresh={this.generateSlot}  tutorId={this.props.tutorId} dayString={this.props.dayString} dayDate={this.props.dayDate} timeString={this.props.timeString}/>                       

                    </> : ""}
                    {this.state.timeArr.length === 2 ? <>
                            <OneFilledSlotMap timeNow={this.state.timeNow} timeArr={this.state.timeArr} refresh={this.generateSlot}  tutorId={this.props.tutorId} dayString={this.props.dayString} dayDate={this.props.dayDate} timeString={this.props.timeString}/>                       

                        <OneEmptySlot tutorId={this.props.tutorId} dayString={this.props.dayString} dayDate={this.props.dayDate} refresh={this.generateSlot} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                    </> : ""}

                    {this.state.timeArr.length === 1 ? <>
                            <OneFilledSlotMap timeNow={this.state.timeNow} timeArr={this.state.timeArr} refresh={this.generateSlot} tutorId={this.props.tutorId} dayString={this.props.dayString} dayDate={this.props.dayDate} timeString={this.props.timeString}/>                       

                        <OneEmptySlot tutorId={this.props.tutorId} dayString={this.props.dayString} dayDate={this.props.dayDate} refresh={this.generateSlot} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                        
                        <OneEmptySlot tutorId={this.props.tutorId} dayString={this.props.dayString} dayDate={this.props.dayDate} refresh={this.generateSlot} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                        
                    </> : ""}
                    {this.state.timeArr.length === 0 ? <>

                        <OneEmptySlot refresh={this.generateSlot} tutorId={this.props.tutorId} dayString={this.props.dayString} dayDate={this.props.dayDate} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                        
                        <OneEmptySlot refresh={this.generateSlot} tutorId={this.props.tutorId} dayString={this.props.dayString} dayDate={this.props.dayDate} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                        
                        <OneEmptySlot refresh={this.generateSlot} tutorId={this.props.tutorId} dayString={this.props.dayString} dayDate={this.props.dayDate} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                        

                    </> : ""}
                </>
                :
                ""}
        
        </>
    )
}
};

export default HalfHour;