import React, {Component} from "react";
import API from "../../utils/API";
import moment from "moment";
class OneFilledSlot extends Component{
state={
    alreadyCheckedInArr:[],
    studentTakenOff:false,
    noShowArr:[]
}
componentDidMount=()=>{
 console.log(this.props.timeArr)   
 const alreadyCheckedInArr=[];
 const noShowArr=[];

for(let i=0;i<this.props.timeArr.length;i++){
if(this.props.timeArr[i].checkedInArray.length>0){

//   console.log(moment(this.props.timeArr[i].checkedInArray[this.props.timeArr[i].checkedInArray.length-1].dateCheckedIn))
  for (let k=0;k<this.props.timeArr[i].checkedInArray.length;k++){
      console.log("count")
      const lastTimeCheckedIn=moment(this.props.timeArr[i].checkedInArray[k].dateCheckedIn,"MMMM Do YYYY")
      if(lastTimeCheckedIn.startOf("day").isSame(moment(this.props.dayDate).startOf("day"))){
        if(this.props.timeArr[i].checkedInArray[k].checkedIn){
            alreadyCheckedInArr.push(this.props.timeArr[i]._id.toString())
              } else{
                noShowArr.push(this.props.timeArr[i]._id.toString())
              }
      }
  }
}
}
setTimeout(()=>{this.setState({
    alreadyCheckedInArr:alreadyCheckedInArr,
    noShowArr:noShowArr
})
},5000)

setTimeout(()=>console.log("arr",this.state.alreadyCheckedInArr),5000)

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
                this.props.refresh()
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
        API.noShowStudent(studentId,{scheduleDayId:scheduleDayId,tutorId:this.props.tutorId,dayString:this.props.dayString,dayDate:this.props.dayDate})
        .then(resp2=>{
            this.props.refresh()

        })
    })
}
handleCheckIn=studentId=>{
    API.getScheduleDayId(this.props.tutorId,this.props.dayString)
    .then(resp=>{
        console.log(resp)
        const scheduleDayId=resp.data;
        console.log(scheduleDayId);
        API.checkInStudent(studentId,{scheduleDayId:scheduleDayId,tutorId:this.props.tutorId,dayString:this.props.dayString,dayDate:this.props.dayDate})
        .then(resp2=>{
            this.props.refresh()

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
                                        {this.state.noShowArr.indexOf(obj._id.toString())!==-1 ? <div className="text-danger">No Show</div> :
                                    
                                        <>
                                        <button className="btn btn-success" onClick={()=>this.handleCheckIn(obj._id)}><i class="fa fa-check" aria-hidden="true"></i></button>
                                        <button className="btn btn-danger text-light ml-2" onClick={()=>this.handleNoShow(obj._id)}>NS</button>
                                        <button className="btn btn-light ml-2 border border-primary">Out Today</button>
                                        
                                        </>
                                        }
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