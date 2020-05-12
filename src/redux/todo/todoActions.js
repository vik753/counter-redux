const addTodo = (todo) => {
  todo.id = `${Math.random()}-${todo.created}`;
  return {
    type: "ADD_TODO",
    todo,
  };
};

export { addTodo };
