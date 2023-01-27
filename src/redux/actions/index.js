export const PAGE_TITLE = 'PAGE_TITLE';
export const SEARCH_VALUE = 'SEARCH_VALUE';

export const pageTitle = (title) => ({
  type: PAGE_TITLE,
  title,
});

export const searchValue = (search) => ({
  type: SEARCH_VALUE,
  search,
});
