import React, {Component} from "react";
import API from "../../utils/API";
class TutorCreate extends Component {
state={
    tutorFirstName:"",
    tutorLastName:"",
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
if(this.state.tutorFirstName!==""&&this.state.tutorLastName!==""){
const objToSend = {
    firstName:this.state.tutorFirstName,
    lastName:this.state.tutorLastName
};
API.newTutor(objToSend).then(response=>{
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

            <div className="display-4">Make A New Tutor</div>
            <form>
                <div className="form-group">
                    <label>Tutor First Name</label>
                    <input className="form-control" placeholder="Enter first Name" value={this.state.tutorFirstName} onChange={this.handleTextChange} name="tutorFirstName" />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input className="form-control" placeholder="Last Name" value={this.state.tutorLastName} onChange={this.handleTextChange} name="tutorLastName" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </form>
        {this.state.createdBool ? <div className="text-success">Created new tutor {this.state.tutorFirstName} {this.state.tutorLastName}</div> : ""}
        </div>
    );

}

};

export default TutorCreate;
