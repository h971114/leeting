import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Find from "./routes/Find";
import Leeting from "./routes/Leeting";

import ExcerciseMeeting from "./routes/meeting/js/exercise";
import MusicMeeting from "./routes/meeting/js/music";
import GameMeeting from "./routes/meeting/js/game";
import DIYMeeting from "./routes/meeting/js/diy";
import LansMeeting from "./routes/meeting/js/lans";
import StudyMeeting from "./routes/meeting/js/study";
import WriteMeeting from "./routes/meeting/js/write";
import ModifyMeeting from "./routes/meeting/js/Modify";
import ListNotice from "./routes/board/js/notice";

import Detail from "./routes/meeting/js/Detail";

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
          <Route path="/find" exact={true} component={Find} />
          <Route path="/meeting/exercise" exact={true} component={ExcerciseMeeting} />
          <Route path="/meeting/music" exact={true} component={MusicMeeting} />
          <Route path="/meeting/game" exact={true} component={GameMeeting} />
          <Route path="/meeting/diy" exact={true} component={DIYMeeting} />
          <Route path="/meeting/lans" exact={true} component={LansMeeting} />
          <Route path="/meeting/study" exact={true} component={StudyMeeting} />
          <Route path="/meeting/write" exact={true} component={WriteMeeting} />
          
          <Route path="/notice" exact={true} component={ListNotice}/>

          <Route path="/meeting/:id" exact={true} component={Detail} />
          <Route path="/meeting/modify/:id" exact={true} component={ModifyMeeting} />
          
          <Route component={NotFound}/>
        </Switch>
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;