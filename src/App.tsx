import '../src/App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import HomeScreen from './screens/homeScreen';
import ProfileScreen from './screens/profile';
import WatchScreen from './screens/watchScreen';
import LoginScreen from './screens/loginScreen';
import { LoggedIn } from './screens/features/localState';
import AddDataScreen from './screens/addDataScreen';
import BottomNav from './screens/components/bottomNav';
import LiveScreen from './screens/liveScreen';
import ChannelScreen from './screens/channelScreen';
import { useTvMode, useDpadNavigation } from './screens/features/tv';


function App() {
  const tvMode = useTvMode();
  useDpadNavigation(tvMode);

  return (
    <div className={`base-flex App ${tvMode ? 'tv-mode' : ''}`}>
      <Router>
        <Switch>
          <Route path="/" exact component={() => <HomeScreen mediaPage={'home'} />} />
          <Route path="/movies" exact component={() => <HomeScreen mediaPage={'Movie'} />} />
          <Route path="/shows" exact component={() => <HomeScreen mediaPage={'Show'} />} />
          <Route path="/live" exact component={() => <LiveScreen />} />
          <Route path="/channel" exact component={() => <ChannelScreen />} />
          <Route path="/watch" exact component={() => <WatchScreen />} />
          <Route path="/add-data" exact component={() => <AddDataScreen />} />
          <Route path="/login" exact component={() => LoggedIn() ? <LoginScreen /> : <ProfileScreen />} />
          <Route path="/profile" exact component={() => LoggedIn() ? <ProfileScreen /> : <LoginScreen />} />
        </Switch>
        <BottomNav />
      </Router>
    </div>
  );
}

export default App;
