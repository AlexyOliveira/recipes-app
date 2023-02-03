import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMealById, getDrinkById } from '../services/api';

function RecipeDetails() {
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    const type = location.pathname.split('/')[1];

    const getRecipe = async () => {
      if (type === 'meals') {
        const meal = await getMealById(id);
        setRecipe(meal);
      } else {
        const drink = await getDrinkById(id);
        setRecipe(drink);
      }
    };

    getRecipe();
  }, [location]);
  console.log(recipe);
  return (
    <div>
      <h1>RecipeDetails</h1>
      {recipe.idDrink || recipe.idMeal}
    </div>
  );
}

export default RecipeDetails;
