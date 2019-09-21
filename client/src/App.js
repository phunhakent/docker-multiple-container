import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Fib from "./Fib";
import Others from "./Others";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>Welcome</div>
          <div>
            <div>Menu:</div>
            <div>
              <Link to="/fib">Fib</Link>
            </div>
            <div>
              <Link to="/other">Other</Link>
            </div>
          </div>
          <div>
            <Switch>
              <Route path="/fib" component={Fib} />
              <Route path="/**" component={Others} />
            </Switch>
          </div>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
