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
      <a className="navbar-text text-dark" href="/permschedule">Perm Schedule</a>
      <div className="navbar-text text-dark ml-4">{this.state.timeNow}</div>
    </nav>
  );
  }
}

export default Nav;
