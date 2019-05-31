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
                // console.log("this is where its comin from pippin")
                console.log(resp2)
                if(Number(resp2.status)<400){
                    this.setState({
                        studentSuccessfullyAdded:true
                    })
                }
            })
        })
    }
    iterateThroughResponse = arr =>{
        return(<>{arr.map(obj=>{
            return(
                <button className="btn btn-light border border-primary ml-2" onClick={()=>this.handlePersonClick(obj._id)}>{obj.firstName} {obj.lastName}</button>
            )
        })}
        <button className="btn btn-danger border border-light ml-2" onClick={this.handleRowRefresh}><i class="fas fa-redo"></i></button>
        </>
        )
    };
    handleRowRefresh=()=>{
        this.setState({
            studentOne:"",
            resReceivedBool:false,
            noMatchesBool:false,
            studentsReceived:null,
            studentAddedSuccessfully:false
        })
    }
   render(){
       return(
        <tr className="table-success">
        <td>{this.props.timeNow}</td>
        {this.state.studentSuccessfullyAdded ? <td colSpan="2"><div>Student Has been added succesfully!</div></td> :<>
        {this.state.resReceivedBool ?
        <>
        {this.state.noMatchesBool ? 
        <td colspan="2">No Matches Found! Retry Search <button className="btn btn-light ml-2" onClick={this.handleRowRefresh}><i class="fas fa-redo"></i></button></td> 
        :
        <td colspan="2">{this.iterateThroughResponse(this.state.studentsReceived)}</td>
        }
        </> 
        : 
        <>
        <td colspan="2"><form><input placeholder="First name" value={this.state.studentOne} onChange={this.handleChange} name="studentOne"></input>
        <button className="btn btn-primary ml-4" onClick={(event)=>{event.preventDefault(); this.handleSubmit(this.state.studentOne)}}>Search by first name</button></form></td>
        </>
        }
        </>
        }
        </tr>
       )
   } 
};
export default OneEmptySlot;