import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login'
import Signin from './components/Signin';
import Admin from './components/adminDashboard';
import Verification from './components/Verification';
import Dashboard from './components/Dashboard';


const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    margin: "0 auto"
  }
}));
function App() {
  const classes = useStyles();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/admin" element={<Admin></Admin>} ></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>

      </Router></>
  );
}


export default App;
