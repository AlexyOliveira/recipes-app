const fail = 'Sorry, we haven\'t found any recipes for these filters.';

export const getDrinkIngredient = async (ingredient) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const json = await response.json();
    return json;
  } catch (error) {
    global.alert(fail);
  }
};

export const getDrinkName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const json = await response.json();
  if (json.drinks === null) {
    global.alert(fail);
  }
  return json;
};

export const getDrinkFirstLetter = async (firstLetter) => {
  if (firstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);

  const json = await response.json();
  if (json.drinks === null) {
    global.alert(fail);
  }
  return json;
};
