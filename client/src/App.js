import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Schedule from "./components/Schedule/Schedule"
import ScheduleEditor from "./components/Schedule/ScheduleEditor"
import PermSchedule from "./components/Schedule/PermSchedule";
import TutorCreate from "./components/Forms/TutorCreate";
import StudentCreate from "./components/Forms/StudentCreate";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Schedule} />
          {/* <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} /> */}
          <Route exact path="/editschedule" component={ScheduleEditor} />
          <Route exact path="/permschedule" component={PermSchedule} />
          <Route exact path="/tutorcreate" component={TutorCreate} />
          <Route exact path="/studentcreate" component={StudentCreate} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
