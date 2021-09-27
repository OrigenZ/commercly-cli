import './App.css';
import {Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';


function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/" render={(routeProps) => <HomePage {...routeProps}/>}/>
          <Route exact path="/about-us" render={(routeProps) => <AboutUsPage {...routeProps}/>}/>
      </Switch>
    </div>
  );
}

export default App;
