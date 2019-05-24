import React from "react";
import API from "../../utils/API";

class EditStudentSchedule extends React.Component {
state={
    studentFirstName:"",
    studentLastName:"",
    createdBool:false,
    studentSelectedArray:[]

};

handleTextChange = event => {
    var {name}=event.target;
    
    this.setState({
        [name]:event.target.value,
        createdBool:false,
        emptyBool:false
    });
}
handleSubmit = event => {
    event.preventDefault();
    var objToSend={};

    if(this.state.studentFirstName){
    objToSend.firstName=this.state.studentFirstName
    }
    if(this.state.studentLastName){
    objToSend.lastName=this.state.studentLastName
    }


    API.getOneStudent(objToSend).then(response=>{
        console.log(response);
        if(response.data.length===0){
            this.setState({
                emptyBool:true
            })
        }
        this.setState({
            studentSelectedArray:response.data
        })

    })
}

render() {

    return(
        <div className="container">
        <div className="display-4">Edit a Student's Schedule</div>
            <form>
                <div className="form-group">
                    <label>Student first Name</label>
                    <input className="form-control" placeholder="Enter first Name" value={this.state.studentFirstName} onChange={this.handleTextChange} name="studentFirstName" />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input className="form-control" placeholder="Last Name" value={this.state.studentLastName} onChange={this.handleTextChange} name="studentLastName" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </form>

        <div className="row">
        {this.state.emptyBool ? <h1 className="text-danger">No Results Found</h1> : ""}
        {this.state.studentSelectedArray.map(object=>{
            return(<div className="col-md-4 mb-2"><button>{object.firstName} {object.lastName}</button></div>)
            })}
        </div>
        
        </div>
    )
}
};

export default EditStudentSchedule;