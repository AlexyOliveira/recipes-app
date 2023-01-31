export const getDrinkIngredient = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const json = await response.json();
  console.log(json);
  return json;
};

export const getDrinkName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const json = await response.json();
  return json;
};

export const getDrinkFirstLetter = async (firstLetter) => {
  if (firstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);

  const json = await response.json();
  return json;
};
