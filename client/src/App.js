  import "./App.css";
import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import CreateDog from "./components/CreateDog";
import Detail from "./components/Detail";
import Home from "./components/Home";
import { Dogs } from "./components/Dogs";
import LandingPage from "./components/LandingPage";

function App() {
  const location = useLocation();
  return (
    
    <div className="App">
      {/* {location.pathname === "/" ? null : <NavBar />} */}
      <NavBar/>
      <Switch>
      <Route exact path={"/"} render={() => <LandingPage />} />
      <Route path={"/home"} render={() => <Home />} />
      <Route path={"/create"} render={() => <CreateDog />} />
      <Route exact path={"/detail/:id"} render={() => <Detail />} />
      <Route path={"/dogs"} component={Dogs} />
      </Switch>
    </div>
  );
}

export default App;
