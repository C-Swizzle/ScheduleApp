import React, {Component} from "react";
import API from "../../utils/API";
import moment from "moment";
class OneFilledSlot extends Component{
state={
    alreadyCheckedInArr:[],
    studentTakenOff:false
}
componentDidMount=()=>{
 console.log(this.props.timeArr)   
for(let i=0;i<this.props.timeArr.length;i++){
if(this.props.timeArr[i].checkedInArray.length>0){

  console.log(moment(this.props.timeArr[i].checkedInArray[this.props.timeArr[i].checkedInArray.length-1].dateCheckedIn))
  const lastTimeCheckedIn=moment(this.props.timeArr[i].checkedInArray[this.props.timeArr[i].checkedInArray.length-1].dateCheckedIn);
  const lastDayString=this.props.timeArr[i].checkedInArray[this.props.timeArr[i].checkedInArray.length-1].dayString
  if(lastTimeCheckedIn.startOf("day").isSame(moment().startOf("day"))&&lastDayString===this.props.dayString){
      console.log("already checked in!")
      console.log([this.props.timeArr[i]._id])
      this.setState({
          alreadyCheckedInArr:this.state.alreadyCheckedInArr.concat([this.props.timeArr[i]._id])
      })
  }
}
}
setTimeout(()=>console.log(this.state.alreadyCheckedInArr),5000)

}
handlePersonRemove=studentId=>{
    API.getScheduleDayId(this.props.tutorId,this.props.dayString)
    .then(resp=>{
        console.log(resp)
        const scheduleDayId=resp.data;
        console.log(scheduleDayId);
        API.removeScheduleSlot(resp.data,studentId,this.props.timeString)
        .then((response)=>{
            console.log("the goonz")
            console.log(response)
            if(response.status<400){
                this.setState({
                    studentTakenOff:true
                })
            }
        })
    })
}
handleNoShow=studentId=>{
    API.getScheduleDayId(this.props.tutorId,this.props.dayString)
    .then(resp=>{
        console.log(resp)
        const scheduleDayId=resp.data;
        console.log(scheduleDayId);
        API.noShowStudent(studentId,{scheduleDayId:scheduleDayId,tutorId:this.props.tutorId,dayString:this.props.dayString})
        .then(resp2=>{

        })
    })
}
handleCheckIn=studentId=>{
    API.getScheduleDayId(this.props.tutorId,this.props.dayString)
    .then(resp=>{
        console.log(resp)
        const scheduleDayId=resp.data;
        console.log(scheduleDayId);
        API.checkInStudent(studentId,{scheduleDayId:scheduleDayId,tutorId:this.props.tutorId,dayString:this.props.dayString})
        .then(resp2=>{

        })
    })
}

    render(){
        return(
            this.props.timeArr.map(obj=>{
                return(<tr className={`table-${this.props.tableType||"light"}`}>
                                    <td>{this.props.timeNow}</td>
                                    <td>{obj.firstName} {obj.lastName}</td>
                                    <td>
                                        {this.state.alreadyCheckedInArr.indexOf(obj._id.toString())!==-1 ? <div className="text-success">Checked In</div>
                                        :
                                        <>
                                        <button className="btn btn-success" onClick={()=>this.handleCheckIn(obj._id)}><i class="fa fa-check" aria-hidden="true"></i></button>
                                        <button className="btn btn-danger text-light ml-2">NS</button>
                                        <button className="btn btn-light ml-2 border border-primary">Out Today</button>
                                        </>
                                        }
                                        {this.state.studentTakenOff ? <>Removed successfully!</>:<button className="btn btn-primary ml-2" onClick={()=>this.handlePersonRemove(obj._id)}>Remove from Timeslot</button>}
                                        
                                    </td>
                </tr>)
            })
        )
    }
};
export default OneFilledSlot;
//todo-- delete option
//checkin/NS
//show students times succinctly
//delete tutor