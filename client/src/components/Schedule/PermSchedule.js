import React, {Component} from "react";
import moment from "moment";
import API from "../../utils/API";
import Schedule from "./Schedule";
import FullDay from "./FullDay";
class PermSchedule extends Component{
state={
tutors:[],
tutorSelected:null,
MondaySched:null,
TuesdaySched:null,
WednesdaySched:null,
ThursdaySched:null,
FridaySched:null,
daysOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],

};

componentDidMount = () => {
API.getTutors()
.then(response=>
    {
        this.setState({
            tutors:response.data
        })
    });

API.getStudents()
.then(response=>{
console.log(response.data);
});

};

handleOnClick= id =>{
API.getOneTutor(id).then((response)=>{
    console.log(response);
    this.setState({
        tutorSelected:response.data
    });

    API.getStudents()
    .then(studResp=>{
        console.log(studResp);
    });
    console.log(this.state)
})
}
render() {

return(<>
<div className="container">
{this.state.tutorSelected ? "" : <>No tutor selected
<ul>
{this.state.tutors.map(obj=>{
return(<a href="" onClick={(e)=>{e.preventDefault(); this.handleOnClick(obj._id)}}><li>{obj.firstName + " " + obj.lastName }</li></a>);
    })
    }
</ul>
</>
}
</div>
<div className="row">
<div className="col-md-6">{this.state.tutorSelected ?
<FullDay tutorId={this.state.tutorSelected._id} tutorFirstName={this.state.tutorSelected.firstName} dayString="Monday" /> 
: ""

}</div>
<div className="col-md-6">{this.state.tutorSelected ?
    <FullDay tutorId={this.state.tutorSelected._id} tutorFirstName={this.state.tutorSelected.firstName} dayString="Tuesday" /> 

: ""

}</div>
<div className="col-md-6">{this.state.tutorSelected ?
    <FullDay tutorId={this.state.tutorSelected._id} tutorFirstName={this.state.tutorSelected.firstName} dayString="Wednesday" /> 

: ""

}</div>
<div className="col-md-6">{this.state.tutorSelected ?
    <FullDay tutorId={this.state.tutorSelected._id} tutorFirstName={this.state.tutorSelected.firstName} dayString="Thursday" /> 

: ""

}</div>
<div className="col-md-6">{this.state.tutorSelected ?
    <FullDay tutorId={this.state.tutorSelected._id} tutorFirstName={this.state.tutorSelected.firstName} dayString="Friday" /> 

: ""

}</div>
</div>
</>)

};
};

export default PermSchedule;