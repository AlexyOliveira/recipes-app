const fail = 'Sorry, we haven\'t found any recipes for these filters.';
const apiError = 'Falha no retorno da API, volte mais tarde';

export const getIngredient = async (ingredient) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const json = await response.json();
    if (json.meals === null) {
      global.alert(fail);
    }
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getName = async (name) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const json = await response.json();
    if (json.meals === null) {
      global.alert(fail);
    }
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getFirstLetter = async (firstLetter) => {
  try {
    if (firstLetter?.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const json = await response.json();
    if (json.meals === null) {
      global.alert(fail);
    }
    return json;
  } catch (error) {
    console.error(error);
  }
};

// get by categories

export const getMealCategories = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const json = await response.json();
    return json.meals;
  } catch (error) {
    console.error(error);
  }
};

export const getDrinkCategories = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const json = await response.json();
    return json.drinks;
  } catch (error) {
    console.error(error);
  }
};

// get by filterButton

export const getMealsbyFilter = async (filter) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`);
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const json = await response.json();
    return json.meals;
  } catch (error) {
    console.error(error);
  }
};

// get by id

export const getMealsbyId = async (id) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const json = await response.json();
    return json.meals;
  } catch (error) {
    console.error(error);
  }
};
