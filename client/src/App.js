import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './components/Login'
import Signin from './components/Signin';
import Admin from './components/adminDashboard';
import Verification from './components/Verification';
import Dashboard from './components/Dashboard';
import Cookies from 'universal-cookie';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    margin: "0 auto",
    padding: "0"
  }
}));
function App() {
  const classes = useStyles();

  const cookies = new Cookies();
  const [auth] = useState(cookies.get('santa'))


  return (
    <>
      <Router>
        <Routes>
          <>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/admin" element={auth ? <Admin></Admin> : <Navigate to='/' />}></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/dashboard" element={auth ? <Dashboard></Dashboard> : <Navigate to='/' />}></Route>
          </>
        </Routes>

      </Router></>
  );
}


export default App;
