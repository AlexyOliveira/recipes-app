export const PAGE_TITLE = 'PAGE_TITLE';
export const SEARCH_VALUE = 'SEARCH_VALUE';
export const DRINK_RESULTS = 'DRINK_RESULTS';
export const MEAL_RESULTS = 'DRINK_RESULTS';

export const pageTitle = (title) => ({
  type: PAGE_TITLE,
  title,
});

export const searchValue = (search) => ({
  type: SEARCH_VALUE,
  search,
});

export const drinkResults = (drinks) => ({
  type: DRINK_RESULTS,
  drinks,
});

export const mealResults = (meals) => ({
  type: DRINK_RESULTS,
  meals,
});
