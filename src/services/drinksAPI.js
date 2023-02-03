const fail = 'Sorry, we haven\'t found any recipes for these filters.';
const apiError = 'Falha no retorno da API, volte mais tarde';
export const getDrinkIngredient = async (ingredient) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    global.alert(fail);
    console.error(error);
  }
};

export const getDrinkName = async (name) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const data = await response.json();
    if (data.drinks === null) {
      global.alert(fail);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getDrinkFirstLetter = async (firstLetter) => {
  try {
    if (firstLetter?.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const data = await response.json();
    if (data.drinks === null) {
      global.alert(fail);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

// get by filterButton

export const getDrinksbyFilter = async (filter) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`);
    if (response.ok === false) {
      throw new Error(apiError);
    }
    const json = await response.json();
    return json.drinks;
  } catch (error) {
    console.error(error);
  }
};
