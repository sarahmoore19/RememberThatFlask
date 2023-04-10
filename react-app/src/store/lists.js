//todo add task to list, create list, delete list

const SETALLLISTS = 'lists/ALL';
const SETSINGLELIST = 'lists/SINGLE';
const UPDATELISTNAME = 'tasks/UPDATENAME';

const allLists1 = (arr) => {
  return {
    type: SETALLLISTS,
    arr
  };
};

const singleList1 = (obj) => {
  return {
    type: SETSINGLELIST,
    obj
  };
};

const renameList1 = (obj) => {
  return {
    type: UPDATELISTNAME,
    obj
  };
};

export const allLists = () => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/all`)
  if (response.ok) {
    const data = await response.json();
    dispatch(allLists1(data));
  };
  return response
};

export const singleList = (listId) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${listId}`)
  if (response.ok) {
    const data = await response.json();
    dispatch(singleList1(data));
  };
  return response
};


export const renameList = (listId, name) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${listId}`, {
    method: 'PUT',
    body: JSON.stringify(name)
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(renameList1(data));
    dispatch(singleList1(listId))
  };
  return response
};

const initialState = {
  allLists: {},
  singleList: {}
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETALLLISTS:
      let newState1 = { singleList: { ...state.singleList }, allLists: {} };
      action.arr.forEach(s => newState1.allLists[s.id] = s);
      return newState1;
    case SETSINGLELIST:
      // we do not know if list.tasks will copy or not... if problems arise we can adjust
      let newState2 = { allLists: { ...state.allLists }, singleList: {} };
      newState2.singleList = { ...action.obj };
      return newState2;
    case UPDATELISTNAME:
      let newState3 = { allLists: { ...state.allLists }, singleList: {} };
      let list = action.obj
      newState3.allLists.list.id = { ...list };
      return newState3

    default:
      return state;
  }
};

export default listReducer;
