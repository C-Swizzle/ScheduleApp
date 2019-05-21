import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand text-center" href="/">
        Rocklin Tutoring Team Schedule App
      </a>
      <a className="navbar-text text-dark" href="/editschedule">Edit Schedule</a>
    </nav>
  );
}

export default Nav;
