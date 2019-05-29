import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Schedule from "./components/Schedule/Schedule";
import PermSchedule from "./components/Schedule/PermSchedule";
import TutorCreate from "./components/Forms/TutorCreate";
import StudentCreate from "./components/Forms/StudentCreate";
import EditStudentSchedule from "./components/Forms/EditStudentSchedule";
import FullDay from "./components/Schedule/FullDay";
import HalfHour from "./components/Schedule/HalfHour";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Schedule} />
         
          <Route exact path="/permschedule" component={PermSchedule} />
          <Route exact path="/tutorcreate" component={TutorCreate} />
          <Route exact path="/studentcreate" component={StudentCreate} />
          <Route exact path="/editschedule" component={EditStudentSchedule} />
          <Route exact path="/fullday" component={FullDay} />
          <Route exact path="/halfhour" component={HalfHour} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
