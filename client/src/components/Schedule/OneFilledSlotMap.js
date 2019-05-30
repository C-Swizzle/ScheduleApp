import React, {Component} from "react";
import API from "../../utils/API";
class OneFilledSlot extends Component{
state={

}
handlePersonRemove=studentId=>{
    
    API.getScheduleDayId(this.props.tutorId,this.props.dayString)
    .then(resp=>{
        console.log(resp)
        const scheduleDayId=resp.data;
        console.log(scheduleDayId);
        API.removeScheduleSlot(resp.data,studentId,this.props.timeString)
        .then(function(response){
            console.log(response)
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
                                        <button className="btn btn-success" onClick={()=>this.handleCheckIn(obj._id)}><i class="fa fa-check" aria-hidden="true"></i></button>
                                        <button className="btn btn-danger text-light ml-2">NS</button>
                                        <button className="btn btn-light ml-2 border border-primary">Out Today</button>
                                        <button className="btn btn-primary ml-2" onClick={()=>this.handlePersonRemove(obj._id)}>Remove from Timeslot</button>
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