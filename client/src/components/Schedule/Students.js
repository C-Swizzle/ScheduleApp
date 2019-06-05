import React, {Component} from "react";
import API from "../../utils/API";
import moment from "moment"

class Students extends Component {
    state={
        students:[],
        sortedStudents:[],
        studentSelected:null,
        studentSelectedBool:false,
        unloggedHours:null
    }

    callAPI=()=>{
        API.getStudents()
        .then(resp=>{
            console.log(resp);
            this.setState({
                students:resp.data
            })
        })
        setTimeout(()=>console.log(this.state),5000)
    }

    componentDidMount=()=>{
        this.callAPI()
    }
    

    alphabetSort=(firstOrLastName)=>{
        const arrToSort=[];
        const studArr=[]
        this.setState({
            sortedStudents:[]
        })
        if(this.state.students.length>0){
            for(var i=0;i<this.state.students.length;i++){
                arrToSort.push(this.state.students[i][firstOrLastName]);
                studArr.push(this.state.students[i])
            }
            const sorted=arrToSort.sort()
            console.log(sorted)
            const sortedObjects=[];
            for(var i=0;i<sorted.length;i++){
                for(var k=0;k<studArr.length;k++){
                    if(sorted[i]===studArr[k][firstOrLastName]){
                        sortedObjects.push(studArr[k]);
                        studArr.splice(k,1);
                    }
                }
            }
            console.log(sortedObjects)
            this.setState({
                sortedStudents:sortedObjects
            })
        }
    }

    onStudentClick=studentId=>{
        console.log("click")
        for(var i=0;i<this.state.students.length;i++){
            if(this.state.students[i]._id.toString()===studentId.toString()){
                console.log(this.state.students[i])
                var unloggedHours=0;
                var checkedInArr=this.state.students[i].checkedInArray;
                for (var j=0;j<checkedInArr.length;j++){
                    if(!checkedInArr[j].hasBeenLogged){
                        var lengthOfHours=checkedInArr[j].sessionTimes.length*0.5;
                        unloggedHours+=lengthOfHours;
                    }
                }
                this.setState({
                    studentSelectedBool:true,
                    studentSelected:this.state.students[i],
                    unloggedHours:unloggedHours
                })
            }
        }
    }
    render(){
        return(
            <>
            {this.state.studentSelected ? 
            <> 
            <div className="container">
            <h1>{this.state.studentSelected.firstName} {this.state.studentSelected.lastName}</h1>
            {this.state.unloggedHours ? <h1 className="text-danger">Unlogged Hours: {this.state.unloggedHours} </h1>:<h1 className="text-successs">All hours logged</h1>}
            </div>
            
            {this.state.studentSelected.checkedInArray.length > 0 ? 
            <div className="container">
                <table className="table table-hover">
                <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Session Length</th>
      <th scope="col">Logged</th>
    </tr>
  </thead>
            {this.state.studentSelected.checkedInArray.map(obj=>{
                return <tr>
                <td>
                {moment(obj.dateCheckedIn).format("MMMM Do YYYY")}
                </td>
                <td>{obj.sessionTimes.length*0.5} hours</td>
                <td>
                {obj.hasBeenLogged ? <div className="text-success" >Logged</div>
                :
                <div className="text-danger" >Not Logged</div>}
                </td>
                </tr>

            })}
            </table>
            </div>
            : 

            <>No check ins recorded</>}
            
            
            </>
            :
            <>
            <div className="container">
                
            <form>
             <div className="form-group">
    <label for="sort-order">How To Sort Students</label>
    <br/>
    <button className="btn btn-success mr-4" onClick={event=>{event.preventDefault(); this.alphabetSort("firstName")}}>First Name A-Z</button>
    <button className="btn btn-success ml-4" onClick={event=>{event.preventDefault(); this.alphabetSort("lastName")}}>Last Name A-Z</button>

  </div>
  </form>
  </div>
<div className="container">
  {this.state.sortedStudents.length>0 ? 
  <>
  <ul>
      {this.state.sortedStudents.map(obj=>{
          return <li ><a href="" onClick={(event)=>{event.preventDefault(); this.onStudentClick(obj._id)}}>{obj.firstName} {obj.lastName}</a></li>
      })}
  </ul>
  </>
  :
  <></>}
  </div>
            </>}
            </>
        )
    }

};

export default Students;