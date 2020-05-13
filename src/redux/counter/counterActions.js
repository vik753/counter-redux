import { ADD, SUBTRACT, RESET, SET } from "../actionTypes";

const addCount = () => ({ type: ADD });
const subtractCount = () => ({ type: SUBTRACT });
const resetCount = () => ({ type: RESET });
const setCount = (value) => ({ type: SET, value });
const setCountAsync = (value, timeout) => (dispatch) => {
  setTimeout(() => {
    dispatch({ type: SET, value });
  }, timeout);
};

export { addCount, subtractCount, resetCount, setCount, setCountAsync };
