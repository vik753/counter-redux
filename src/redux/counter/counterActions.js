const addCount = () => ({ type: "ADD" });
const subtractCount = () => ({ type: "SUBTRACT" });
const resetCount = () => ({ type: "RESET" });
const setCount = (value) => ({ type: "SET", value });

export { addCount, subtractCount, resetCount, setCount };
