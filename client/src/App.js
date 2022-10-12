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
          <Route path="/" element={<Test></Test>} />
          <Route path="/admin" element={<Admin></Admin>} >           

          </Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>

      </Router></>
  );
}

const Test = () => {
  return <p>hello world</p>
}

export default App;
