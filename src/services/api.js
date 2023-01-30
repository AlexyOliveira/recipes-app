export const getIngredient = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const json = await response.json();
  return json;
};

export const getName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const json = await response.json();
  return json;
};

export const getFirstLetter = async (firstLetter) => {
  if (firstLetter.length > 1) {
    return window.alert('Your search must have only 1 (one) character');
  }
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);

  const json = await response.json();
  return json;
};
