import React, {Component} from "react";
import API from "../../utils/API";
class StudentCreate extends Component {
state={
    studentFirstName:"",
    studentLastName:"",
    createdBool:false
}

handleTextChange = event => {
var {name}=event.target;

this.setState({
    [name]:event.target.value,
    createdBool:false
});
}
handleSubmit = event => {
event.preventDefault();
if(this.state.studentFirstName!==""&&this.state.studentLastName!==""){
const objToSend = {
    firstName:this.state.studentFirstName,
    lastName:this.state.studentLastName
};
API.newStudent(objToSend).then(response=>{
console.log(response);
this.setState({
    createdBool:true
})
})
}
}



render(){
    return(
        <div className="container">

            <div className="display-4">Make A New Student</div>
            <form>
                <div className="form-group">
                    <label>Student First Name</label>
                    <input className="form-control" placeholder="Enter first Name" value={this.state.studentFirstName} onChange={this.handleTextChange} name="studentFirstName" />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input className="form-control" placeholder="Last Name" value={this.state.studentLastName} onChange={this.handleTextChange} name="studentLastName" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </form>
        {this.state.createdBool ? <div className="text-success">Created new student {this.state.studentFirstName} {this.state.studentLastName}</div> : ""}
        </div>
    );

}

};

export default StudentCreate;
