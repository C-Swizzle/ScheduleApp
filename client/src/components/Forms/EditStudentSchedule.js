import React from "react";
import API from "../../utils/API";

class EditStudentSchedule extends React.Component {
    state = {
        studentFirstName: "",
        studentLastName: "",
        createdBool: false,
        studentSelectedArray: [],
        emptyBool: false,
        responseReceivedBool: false,
        studentSelectedForChange: null,
        daysOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]        


    };

    handleTextChange = event => {
        var { name } = event.target;

        this.setState({
            [name]: event.target.value,
            createdBool: false,
            emptyBool: false
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        var objToSend = {};

        if (this.state.studentFirstName) {
            objToSend.firstName = this.state.studentFirstName
        }
        if (this.state.studentLastName) {
            objToSend.lastName = this.state.studentLastName
        }


        API.getOneStudent(objToSend).then(response => {
            console.log(response);
            if (response.data.length === 0) {
                this.setState({
                    emptyBool: true
                })
            }
            this.setState({
                studentSelectedArray: response.data
            })

        })
    }
    handleStudentClick = id => {
        API.getOneStudent({ _id: id })
            .then(response => {
                console.log(response.data);
                this.setState({
                    responseReceivedBool: true,
                    studentSelectedForChange: response.data[0]
                })
            })
    }
    handleDeleteOfTime = (studentId,scheduleId) => {
        // console.log(id)
        API.deleteOneTimeSlot(studentId,scheduleId)
        .then(response=>{
            console.log(response);
        })
    }

    render() {

        return (
            <div className="container">
                <div className="display-4">Edit {this.state.studentSelectedForChange ? <> {this.state.studentSelectedForChange.firstName} {this.state.studentSelectedForChange.lastName}'s </> :<>a Student's</>} Schedule</div>
                {this.state.studentSelectedForChange ? "" :
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
                }
                <div className="row mt-2">
                    {this.state.emptyBool ? <h1 className="text-danger">No Results Found</h1> : ""}

                    {this.state.studentSelectedForChange
                        ?
                        <>
                            <h3 className="col-md-12">
                                Selected <strong>{this.state.studentSelectedForChange.firstName} {this.state.studentSelectedForChange.lastName}</strong> for schedule change.
                        </h3>
                            <br />
                            <div className="col-md-12">
                                {this.state.studentSelectedForChange.permanentSchedule.length === 0
                                    ? <div className="text-danger">No current schedule</div>
                                    :
                                    <>
                                        <div className="text-success">Has current Schedule</div>
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Tutor Name</th>
                                                    <th scope="col">Day</th>
                                                    <th scope="col">Student Name</th>
                                                    <th scope="col">Remove?</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.studentSelectedForChange.permanentSchedule.map(object => {
                                                    return (
                                                        object.time.map(TimesArr=>{
                                                            return(<tr>
                                                                <td>
                                                                {TimesArr}
                                                                </td>
                                                                <td>
                                                                {object.tutorName}
                                                                </td>
                                                                <td>
                                                                {this.state.daysOfWeek[Number(object.dayInteger)]}
                                                                </td>
                                                                <td>
                                                                {this.state.studentSelectedForChange.firstName} {this.state.studentSelectedForChange.lastName} 
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-danger" onClick={()=>this.handleDeleteOfTime(this.state.studentSelectedForChange._id,object._id)}>Delete</button>
                                                                </td>
                                                            </tr>)
                                                        })
                                                    

                                                    )
                                                })}

                                            </tbody>

                                        </table>
                                    </>
                                }
                            </div>
                        </>
                        :
                        <>
                            {this.state.studentSelectedArray.map(object => {
                                return (<div className="col-md-4 mb-2"><button onClick={() => { this.handleStudentClick(object._id) }}>{object.firstName} {object.lastName}</button></div>)
                            })}
                        </>
                    }
                </div>

            </div>
        )
    }
};

export default EditStudentSchedule;