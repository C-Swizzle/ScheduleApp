import React from "react";
function ScheduleRow(props){
    return(
        <>
        
        <tr className={`table-${props.tableType||"default"}`}>
      <th scope="row">{props.time}</th>
      <td>{props.name}</td>
       <td>
       <button className="btn btn-success show-up" onClick={props.handleCheckIn} >
    <i className="fas fa-check"></i>
    </button>
    <button className="btn btn-danger no-show">
    NS
    </button>
      </td>
      <td><input type="text" /></td>
    </tr>
    </>
    );
};
export default ScheduleRow;