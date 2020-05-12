import React from "react";
import { connect } from "react-redux";
import {
  addCount,
  resetCount,
  setCount,
  subtractCount,
} from "./redux/counter/counterActions";
import { addTodo } from "./redux/todo/todoActions";

class App extends React.Component {
  state = {
    setValue: 0,
    newTodo: {
      todoText: "",
      done: false,
      created: Date.now(),
    },
  };

  render() {
    // console.log(this.props);
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div className="counter-wrapper">
          <h1>React-Redux counter</h1>
          <h3>Counter: {this.props.counter}</h3>
          <button style={{ marginRight: "4px" }} onClick={this.props.addCount}>
            Add
          </button>
          <button
            style={{ marginRight: "4px" }}
            onClick={this.props.subtractCount}
          >
            Subtract
          </button>
          <button onClick={this.props.resetCount}>Reset</button>
          <br />
          <br />
          <div>
            <label htmlFor="setValue" style={{ marginRight: "4px" }}>
              Set value:
            </label>
            <input
              id="setValue"
              type="number"
              onInput={(e) => this.setState({ setValue: +e.target.value })}
              defaultValue={this.state.setValue}
            />
            <button onClick={() => this.props.setCount(this.state.setValue)}>
              Set value
            </button>
          </div>
        </div>
        {/*  counter-wrapper */}
        <br />
        <hr />
        <div
          className="todo-wrapper"
          style={{
            border: "1px solid #e2e2e2",
            padding: 11,
            margin: "11px auto",
          }}
        >
          <h1>Todos</h1>
          <div>
            <label htmlFor="addTodo">Add todo:</label>
            <input
              type="text"
              id="addTodo"
              defaultValue={this.state.newTodo.todoText}
              onInput={(e) =>
                this.setState({
                  newTodo: {
                    ...this.state.newTodo,
                    todoText: e.target.value,
                  },
                })
              }
            />
            <button
              onClick={() => {
                const newTodoInput = document.getElementById("addTodo");
                newTodoInput.value = "";
                this.props.addNewTodo(this.state.newTodo);
              }}
            >
              Add new note
            </button>
          </div>
        </div>
        <hr />
        <div style={{ textAlign: "left" }}>
          <ul style={{
            'list-style': 'none',
            margin: '0',
            padding: '0',
          }}>
            {Object.values(this.props.todos).length
              ? Object.values(this.props.todos).map((todo, index) => {
                  return (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        border: "1px solid #e2e2e2",
                        padding: '4px',
                        borderRadius: '4px',
                        marginBottom: '4px',
                      }}
                    >
                      <span>{todo.todoText}</span>
                      <span>{todo.done ? "done" : "undone"}</span>
                    </li>
                  );
                })
              : "You haven't any todo..."}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counterReducer.counter,
  todos: state.todoReducer.todos,
});

const mapDispatchToProps = (dispatch) => ({
  //counter
  addCount: () => dispatch(addCount()),
  subtractCount: () => dispatch(subtractCount()),
  resetCount: () => dispatch(resetCount()),
  setCount: (value) => dispatch(setCount(value)),
  //todos
  addNewTodo: (todo) => dispatch(addTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
