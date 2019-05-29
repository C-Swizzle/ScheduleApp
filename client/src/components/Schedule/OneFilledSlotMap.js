import React, {Component} from "react";

class OneFilledSlot extends Component{
state={

}
    render(){
        return(
            this.props.timeArr.map(obj=>{
                return(<tr className={`table-${this.props.tableType||"light"}`}>
                                    <td>{this.props.timeNow}</td>
                                    <td>{obj.firstName} {obj.lastName}</td>
                </tr>)
            })
        )
    }
};
export default OneFilledSlot;