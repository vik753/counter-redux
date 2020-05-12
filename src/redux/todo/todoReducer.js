const initialState = {
  todos: {},
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: {
          ...state.todos,
          [action.todo.id]: action.todo,
        },
      };
    default:
      return state;
  }
}
