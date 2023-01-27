import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import store from './redux/store';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';

function App() {
  console.log();
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          {/* <Route
            exact
            path="/meals/:id/in-progress"
            component={ RecipesInProgress }
          />
          <Route
            exact
            path="/drinks/:id/in-progress"
            component={ RecipesInProgress }
          /> */}
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
