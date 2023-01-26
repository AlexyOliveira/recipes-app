import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import store from './redux/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route exact path="/" component={ Login } />
          {/* <Route exact path="/game" component={ Game } />
      <Route path="/settings" component={ Config } />
      <Route path="/feedback" component={ Feedback } /> */}
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
