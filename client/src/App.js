import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Home from "./components/home.js";
import ManagerLogin from "./components/managerlogin";
import EmployeeLogin from "./components/employeelogin";
import HRLogin from "./components/hrlogin";
import AdminLogin from "./components/adminlogin";
import AdminDashbard from "./components/admin/admindashboard";
import EmployeeDashboard from "./components/employee/employeedashboard";
import HRDashboard from "./components/hr/hrdashboard";
import ManagerDashboard from "./components/manager/managerdashboard";

function App({ history }) {
  return (
    <div>
      <Router>
        <Switch history={history}>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/managerlogin" component={ManagerLogin} />
          <Route exact path="/emplogin" component={EmployeeLogin} />
          <Route exact path="/hrlogin" component={HRLogin} />
          <Route exact path="/adminlogin" component={AdminLogin} />
          <Route path="/admindashboard" component={AdminDashbard} />
          <Route path="/empdashboard" component={EmployeeDashboard} />
          <Route path="/hrdashboard" component={HRDashboard} />
          <Route path="/managerdashboard" component={ManagerDashboard} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
