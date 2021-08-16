
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import { UserContext } from './context/UserContext';
import { useState } from 'react';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {  
  const [valueOfContext, setvalueOfContext] = useState(null);
  const inputNumber = (value) => {
    setvalueOfContext(value);
  }

  

  return (
    <UserContext.Provider value={valueOfContext}>

      <Router>
        <Switch>
          <Route path="/login">
            <Login inputNumber={inputNumber}/>
          </Route>
          <Route exact path="/">
            {valueOfContext ? <Home/> : <Redirect to="/login" />}
          </Route>
          <Route path="/tasks/:id/:listName">
            {valueOfContext ? <Tasks/> : <Redirect to="/login"/>}
          </Route>
          <Route path="/profile">
            {valueOfContext ? <Profile/> : <Redirect to="/login"/>}
          </Route>
        </Switch>  
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
