const initialState = {
  counter: 0,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return {
        counter: state.counter + 1,
      };
    case "SUBTRACT":
      return {
        counter: state.counter - 1,
      };
    case "RESET":
      return {
        counter: 0,
      };
      case "SET":
      return {
        counter: action.value,
      };
    default:
      return state;
  }
}
