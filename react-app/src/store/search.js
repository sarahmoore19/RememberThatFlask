const ADDSEARCHRESULTS = 'search/ADDSEARCHRESULTS';

const setSearchResults = (array) => {
  return {
    type: ADDSEARCHRESULTS,
    array
  };
};

 export const allSearch = (query) => async (dispatch) => {
  const response = await csrfFetch(`/api/search?search=${query}`)
  if (response.ok) {
    const data = await response.json();
    dispatch(setSearchResults(data));
  };
  return response
};

const initialState = {
  searchResults: {}
 };

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDSEARCHRESULTS:
      let newState = {searchResults: {}};
      action.array.forEach(s => newState.searchResults[s.id] = s);
      return newState;
    default:
      return state;
  }
};

export default searchReducer;
