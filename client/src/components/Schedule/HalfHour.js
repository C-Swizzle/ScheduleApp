import React, {Component} from "react";
import API from "../../utils/API";
class HalfHour extends Component{
state={
timeArr:null
}

componentDidMount=()=>{
API.getHalfHourSlot("5cedea5d4869e4199c4759cf","Tuesday","twoClock")
.then(response=>{
    this.setState({
        timeArr:response.data
    })
})
}
render(){
    return(
        <>
        <div className="container">
        <table className="table table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Name</th>
      <th scope="col">Showed up?</th>
    </tr>
  </thead>
                    <tbody>
        {this.state.timeArr ?
        <>

        {this.state.timeArr.length>3 ? 
        <>
        {this.state.timeArr.map(obj=>{
            return(<tr className="table-danger">
                <td>Time</td>
                <td>{obj.firstName} {obj.lastName}</td>
            </tr>)
        })}
        </>:""}
        {this.state.timeArr.length===3 ?<>
        {this.state.timeArr.map(obj=>{
            return(<tr className="table-light">
                <td>Time</td>
                <td>{obj.firstName} {obj.lastName}</td>
            </tr>)
        })}
        </>:""}
        {this.state.timeArr.length===2 ?<>
        {this.state.timeArr.map(obj=>{
            return(<tr className="table-light">
                <td>Time</td>
                <td>{obj.firstName} {obj.lastName}</td>
            </tr>)
        })}
        <tr className="table-success">
                <td>Time</td>
                <td>Empty Slot</td>
            </tr>
        </>:""}
        
        {this.state.timeArr.length===1 ?<>
        {this.state.timeArr.map(obj=>{
            return(<tr className="table-light">
                <td>Time</td>
                <td>{obj.firstName} {obj.lastName}</td>
            </tr>)
        })}
        <tr className="table-success">
                <td>Time</td>
                <td>Empty Slot</td>
            </tr>
            <tr className="table-success">
                <td>Time</td>
                <td>Empty Slot</td>
            </tr>
        </>:""}
        {this.state.timeArr.length===0 ?<>
        
        <tr className="table-success">
                <td>Time</td>
                <td>Empty Slot</td>
            </tr>
            <tr className="table-success">
                <td>Time</td>
                <td>Empty Slot</td>
            </tr>
            <tr className="table-success">
                <td>Time</td>
                <td>Empty Slot</td>
            </tr>
        </>:""}
        </>
        :
        ""}
        </tbody>   
        </table>
        </div>
        </>
    )
}
};

export default HalfHour;