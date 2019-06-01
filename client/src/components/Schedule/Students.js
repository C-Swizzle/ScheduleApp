import React, {Component} from "react";
import API from "../../utils/API";

class Students extends Component {
    state={
        students:[],
        sortedStudents:[]
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
            }
        }
    }
    render(){
        return(
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
            </>
        )
    }

};

export default Students;