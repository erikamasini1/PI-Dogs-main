import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import {Route} from 'react-router-dom';
import CreateDog from './components/CreateDog';
import Detail from './components/Dog';
import Home from './components/Home';
import {Dogs} from './components/Dogs';
import LandingPage from './components/LandingPage'

function App() {
  return (
    //en el video pone aca el BrowserRouter
    <div className="App">
      {/* <Route path={'/'} component={NavBar}/> */}
      <Route exact path={'/'} render={() => <LandingPage />}/>
      <Route path={'/'} render={() => <NavBar/>}/>
      <Route path={'/home'} render={() => <Home/>}/>
      <Route path={'/create'} render={() => <CreateDog />}/>
      <Route path={'/detail/:id'} render={() => <Detail/>}/>
      <Route path={'/dogs'} component={Dogs}/>

      <h1>Henry Dogs</h1>
    </div>
  );
}

export default App;
