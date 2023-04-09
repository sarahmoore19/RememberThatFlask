//todo update name, add task to list, create list, delete list

const SETALLTASKS = 'tasks/ALL';
const SETSINGLETASK = 'tasks/SINGLE';
const UPDATETASKNAME = 'tasks/UPDATENAME';
const UPDATECOMPLETESTATUS = 'tasks/UPDATECOMPLETE';

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


const renameATask = (obj) => {
  return {
    type: UPDATETASKNAME,
    obj
  };
};

const updatecompletestatus = (obj) => {
  return {
    type: UPDATECOMPLETESTATUS,
    obj
  };
};


// thunk
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

export const renameTask = (taskId, name) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(name)
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(renameATask(data));
    dispatch(singleTask(taskId))
  };
  return response
};

export const changecompletestatus = (taskId) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${taskId}/completed`, {
    method: 'PUT'
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(updatecompletestatus(data));
    dispatch(singleTask(taskId))
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
      let newState1 = { singleTask: { ...state.allTasks }, allTasks: {} };
      action.arr.forEach(s => newState1.allTasks[s.id] = s);
      return newState1;
    case SETSINGLETASK:
      // we do not know if task.list will copy or not... if problems arise we can adjust
      let newState2 = { allTasks: { ...state.allTasks }, singleTask: {} };
      newState2.singleTask = { ...action.obj };
      return newState2;
    case UPDATETASKNAME:
      let newState3 = { allTasks: { ...state.allTasks }, singleTask: {} };
      let task = action.obj
      newState3.allTasks.task.id = { ...task };
      return newState3
    case UPDATECOMPLETESTATUS:
      let newState4 = { allTasks: { ...state.allTasks }, singleTask: {} };
      let task1 = action.obj
      newState4.allTasks.task1.id = { ...task1 };
      return newState4

    default:
      return state;
  }
};

export default tasksReducer;
