import React, {Component} from "react";
import API from "../../utils/API";
import OneEmptySlot from "./OneEmptySlot";
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
API.getHalfHourSlot(this.props.tutorId||"5cedea5d4869e4199c4759cf",this.props.dayString||"Tuesday",this.props.timeString||"twoClock")
.then(response=>{
const myTime=this.props.timeString;
const myTimeToSend=this.state.relationalObject[myTime];
console.log(response)
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
                            {this.state.timeArr.map(obj => {
                                return (<tr className="table-danger">
                                    <td>{this.state.timeNow}</td>
                                    <td>{obj.firstName} {obj.lastName}</td>
                                </tr>)
                            })}
                        </> : ""}
                    {this.state.timeArr.length === 3 ? <>
                        {this.state.timeArr.map(obj => {
                            return (<tr className="table-light">
                                <td>{this.state.timeNow}</td>
                                <td>{obj.firstName} {obj.lastName}</td>
                            </tr>)
                        })}
                    </> : ""}
                    {this.state.timeArr.length === 2 ? <>
                        {this.state.timeArr.map(obj => {
                            return (<tr className="table-light">
                                <td>{this.state.timeNow}</td>
                                <td>{obj.firstName} {obj.lastName}</td>
                            </tr>)
                        })}
                        <OneEmptySlot tutorId={this.props.tutorId} dayString={this.props.dayString} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                    </> : ""}

                    {this.state.timeArr.length === 1 ? <>
                        {this.state.timeArr.map(obj => {
                            return (<tr className="table-light">
                                <td>{this.state.timeNow}</td>
                                <td>{obj.firstName} {obj.lastName}</td>
                            </tr>)
                        })}
                        <OneEmptySlot tutorId={this.props.tutorId} dayString={this.props.dayString} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                        
                        <OneEmptySlot tutorId={this.props.tutorId} dayString={this.props.dayString} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                        
                    </> : ""}
                    {this.state.timeArr.length === 0 ? <>

                        <OneEmptySlot tutorId={this.props.tutorId} dayString={this.props.dayString} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                        
                        <OneEmptySlot tutorId={this.props.tutorId} dayString={this.props.dayString} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                        
                        <OneEmptySlot tutorId={this.props.tutorId} dayString={this.props.dayString} timeString={this.props.timeString} timeNow={this.state.timeNow}/>
                        

                    </> : ""}
                </>
                :
                ""}
        
        </>
    )
}
};

export default HalfHour;