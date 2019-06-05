import React from "react";
import moment from "moment";

class Nav extends React.Component {
state={
  timeNow:moment().format("lll")
}
componentDidMount = () => {
  setInterval(() => {
  this.setState({
    timeNow:moment().format("lll")
  })
}, 1000);
}
  render() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand text-center" href="/">
        Rocklin Tutoring Team Schedule App
      </a>
      {/* <a className="navbar-text text-dark ml-4 font-weight-bold" href="/permschedule">Tutor Schedule</a> */}
      <a className="navbar-text text-dark ml-4 font-weight-bold" href="/studentcreate">Create Student</a>
      <a className="navbar-text text-dark ml-4 font-weight-bold" href="/tutorcreate">Create Tutor</a>
      <a className="navbar-text text-dark ml-4 font-weight-bold" href="/studentlist">Student List</a>
      <a className="navbar-text text-dark ml-4 font-weight-bold" href="/">Hourly Schedule</a>



      <div className="navbar-text text-dark ml-4">{this.state.timeNow}</div>
    </nav>
  );
  }
}

export default Nav;
