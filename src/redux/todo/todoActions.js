const getId = () => `${Math.random()}-${Date.now()}`;

const addTodo = (todo) => {
  todo.id = getId();
  // console.log("todoAddAction", todo);
  return {
    type: "ADD_TODO",
    todo,
  };
};

export { addTodo };
