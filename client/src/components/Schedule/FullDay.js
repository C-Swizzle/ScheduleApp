import React, {Component} from "react";
import API from "../../utils/API";
class FullDay extends Component{
state={
scheduleObj:null
}

componentDidMount=()=>{
API.getFullDay("5cedea5d4869e4199c4759cf","Tuesday")
.then(response=>{
    console.log(response.data)
    this.setState({
        scheduleObj:response.data
    })
})
}
iterateOverTime = arr => {

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

                        {this.state.scheduleObj ?
                            <>
                                {this.state.scheduleObj.oneThirty.map(obj => {
                                    return (
                                        <tr>
                                            <td>
                                                1:30
                                            </td>
                                            <td>
                                                {obj.firstName} {obj.lastName}
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                            :
                            ""
                        }
                    </tbody>
      </table>
      </div>
        </>
    )
}
};

export default FullDay;