import React from "react";
import { connect } from "react-redux";
import {
  addCount,
  resetCount,
  setCount,
  setCountAsync,
  subtractCount,
} from "./redux/counter/counterActions";
import { addTodo } from "./redux/todo/todoActions";
import "./css/app.scss";

class App extends React.Component {
  state = {
    setValue: 0,
    asyncTimeout: 1000,
    timer: 0,
    timerGoing: false,
    asyncInterval: "",
    newTodo: {
      todoText: "",
      done: false,
      created: Date.now(),
    },
  };

  handleAddNewTodoClick = (e) => {
    if (!this.state.newTodo.todoText.trim().length) return;
    const newTodoInput = document.getElementById("addTodo");
    this.props.addNewTodo(this.state.newTodo);
    this.setState({
      newTodo: {
        todoText: "",
        done: false,
        created: Date.now(),
      },
    });
    newTodoInput.value = "";
  };

  startTimer = () => {
    this.setState(() => ({ timerGoing: true }));
    // eslint-disable-next-line no-unused-vars
    const asyncInterval = setInterval(() => {
      this.setState(() => ({
        timer: this.state.timer + 1,
        asyncInterval,
      }));
    }, 1000);
  };

  render() {
    //check timer
    if (
      this.state.timer > this.state.asyncTimeout / 1000 &&
      this.state.timerGoing
    ) {
      clearInterval(this.state.asyncInterval);
      this.setState(() => ({ timerGoing: false, timer: 0 }));
    }
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
          <button className="btn" style={{ marginRight: "4px" }} onClick={this.props.addCount}>
            Add
          </button>
          <button
            className="btn"
            style={{ marginRight: "4px" }}
            onClick={this.props.subtractCount}
          >
            Subtract
          </button>
          <button className="btn" onClick={this.props.resetCount}>Reset</button>
          <br />
          <br />
          <div>
            <label htmlFor="setValue" style={{ marginRight: "4px" }}>
              Set value:
            </label>
            <input
              style={{ maxWidth: "80px" }}
              id="setValue"
              type="number"
              onInput={(e) => this.setState({ setValue: +e.target.value })}
              defaultValue={this.state.setValue}
            />
            <button className="btn" onClick={() => this.props.setCount(this.state.setValue)}>
              Set value
            </button>
          </div>
          <div style={{ marginTop: "11px" }}>
            <label htmlFor="setValueAsync" style={{ marginRight: "4px" }}>
              Set async time "seconds":
            </label>
            <input
              style={{ maxWidth: "40px", marginRight: "4px" }}
              step="1"
              id="setValueAsync"
              type="number"
              onInput={(e) =>
                this.setState({ asyncTimeout: +e.target.value * 1000 })
              }
              defaultValue={+this.state.asyncTimeout / 1000}
            />
            <button
              className="btn"
              onClick={() => {
                this.startTimer();
                this.props.setCountAsync(
                  this.state.setValue,
                  this.state.asyncTimeout
                );
              }}
              disabled={this.state.timerGoing}
              style={{}}
            >
              {this.state.timerGoing ? (
                <span>{this.state.asyncTimeout / 1000 - this.state.timer}</span>
              ) : (
                <span>Set value async</span>
              )}
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
            <button className="btn" onClick={this.handleAddNewTodoClick}>Add new note</button>
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
          <ul
            style={{
              listStyle: "none",
              margin: "0",
              padding: "0",
            }}
          >
            {Object.values(this.props.todos).length
              ? Object.values(this.props.todos).map((todo, index) => {
                  return (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        border: "1px solid #e2e2e2",
                        padding: "4px",
                        borderRadius: "4px",
                        marginBottom: "4px",
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
  setCountAsync: (value, timeout) => dispatch(setCountAsync(value, timeout)),
  //todos
  addNewTodo: (todo) => dispatch(addTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
