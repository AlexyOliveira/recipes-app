export const PAGE_TITLE = 'PAGE_TITLE';
export const SEARCH_VALUE = 'SEARCH_VALUE';
export const DRINK_RESULTS = 'DRINK_RESULTS';
export const MEAL_RESULTS = 'MEAL_RESULTS';
export const GLOBAL_HISTORY = 'GLOBAL_HISTORY';
export const LOADING = 'LOADING';

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
  type: MEAL_RESULTS,
  meals,
});

export const globalStateHistory = (history) => ({
  type: GLOBAL_HISTORY,
  history,
});

export const isLoading = (loading) => ({
  type: LOADING,
  loading,
});
