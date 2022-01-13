import "./App.css";
import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Route } from "react-router-dom";
import CreateDog from "./components/CreateDog";
import Detail from "./components/Detail";
import Home from "./components/Home";
import { Dogs } from "./components/Dogs";
import LandingPage from "./components/LandingPage";

function App() {
  const location = useLocation();
  return (
    
    <div className="App">
      {location.pathname === "/" ? null : <NavBar />}
      {/* <Route path={'/'} component={NavBar}/> */}
      <Route exact path={"/"} render={() => <LandingPage />} />
      <Route path={"/home"} render={() => <Home />} />
      <Route path={"/create"} render={() => <CreateDog />} />
      <Route exact path={"/detail/:id"} render={() => <Detail />} />
      <Route path={"/dogs"} component={Dogs} />
    </div>
  );
}

export default App;
