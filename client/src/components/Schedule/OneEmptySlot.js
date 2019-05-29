import React from "react";
import API from "../../utils/API";
class OneEmptySlot extends React.Component{
    state={
        studentOne:"",
        resReceivedBool:false,
        noMatchesBool:false,
        studentsReceived:null,
        studentSuccessfullyAdded:false
    }
    handleChange=event=>{
        var {name,value}=event.target;
        this.setState({
            [name]:value
        })
    }
    handleSubmit=studentFirstName=>{
        API.getOneStudent({firstName:studentFirstName})
        .then(resp=>{
            console.log(resp);
            if (resp.data.length>0){
                this.setState({
                    resReceivedBool:true,
                    noMatchesBool:false,
                    studentsReceived:resp.data
                })
            } else if(resp.data.length===0){
                this.setState({
                    resReceivedBool:true,
                    noMatchesBool:true
                })
            }
        })
    };

    handlePersonClick=studentId=>{
        API.getScheduleDayId(this.props.tutorId,this.props.dayString)
        .then(resp=>{
            console.log(resp)
            const scheduleDayId=resp.data;
            API.newScheduleSlot(scheduleDayId,studentId,this.props.timeString)
            .then(resp2=>{
                console.log(resp2)
            })
        })
    }
    iterateThroughResponse = arr =>{
        return(arr.map(obj=>{
            return(
                <button onClick={()=>this.handlePersonClick(obj._id)}>{obj.firstName} {obj.lastName}</button>
            )
        }))
    };
    handleRowRefresh=()=>{
        this.setState({
            studentOne:"",
            resReceivedBool:false,
            noMatchesBool:false,
            studentsReceived:null
        })
    }
   render(){
       return(
        <tr className="table-success">
        <td>{this.props.timeNow}</td>
        {this.state.resReceivedBool ?
        <>
        {this.state.noMatchesBool ? <td colspan="2">No Matches Found! Retry Search <button className="btn btn-light ml-2" onClick={this.handleRowRefresh}><i class="fas fa-redo"></i></button></td> :
        <td colspan="2">{this.iterateThroughResponse(this.state.studentsReceived)}</td>
        }
        </> 
        : 
        <>
        <td><input placeholder="First name" value={this.state.studentOne} onChange={this.handleChange} name="studentOne"></input></td>
        <td><button className="btn btn-primary" onClick={()=>{this.handleSubmit(this.state.studentOne)}}>Add a student here</button></td>
        </>
        }
        </tr>
       )
   } 
};
export default OneEmptySlot;