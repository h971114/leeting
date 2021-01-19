import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Find from "./routes/Find";
import Leeting from "./routes/Leeting";
import NotFound from "./routes/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/Leeting" exact={true} component={Leeting} />
            <Route path="/join" exact={true} component={Join} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/find" exact={true} component={Find}/>
          <Route component={NotFound}/>
        </Switch>
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;