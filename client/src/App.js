import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login'
import Signin from './components/Signin';


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
          <Route path="/" element={<Login></Login>}>

          </Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
        </Routes>

      </Router></>
  );
}

const Test = () => {
  return <p>hello world</p>
}

export default App;
