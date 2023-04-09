//todo update name, add task to list, create list, delete list

const SETALLTASKS = 'tasks/ALL';
const SETSINGLETASK = 'tasks/SINGLE';

const getAllTasks = (arr) => {
  return {
    type: SETALLTASKS,
    arr
  };
};

const getSingleTask = (obj) => {
  return {
    type: SETSINGLETASK,
    obj
  };
};

 export const allTasks = () => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/all`)
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllTasks(data));
  };
  return response
};

 export const singleTask = (taskId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${taskId}`)
  if (response.ok) {
    const data = await response.json();
    dispatch(getSingleTask(data));
  };
  return response
};

const initialState = {
  allTasks: {},
  singleTask: {}
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETALLTASKS:
      let newState1 = {singleTask: {...state.allTasks}, allTasks: {}};
      action.arr.forEach(s => newState1.allTasks[s.id] = s);
      return newState1;
    case SETSINGLETASK:
      // we do not know if task.list will copy or not... if problems arise we can adjust
      let newState2 = {allTasks: {...state.allTasks}, singleTask: {}};
      newState2.singleTask = {...action.obj};
      return newState2;
    default:
      return state;
  }
};

export default tasksReducer;
