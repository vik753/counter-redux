import React from "react";
import { connect } from "react-redux";
import {addCount, resetCount, setCount, subtractCount} from "./redux/rootActions";

class App extends React.Component {
  state = {
    setValue: 0,
  };

  render() {
    console.log(this.props);
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
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
        <br/>
        <br/>
        <div>
          <label htmlFor="setValue" style={{marginRight: '4px'}}>Set value:</label>
          <input
            id='setValue'
            type="number"
            onInput={(e) => this.setState({ setValue: +e.target.value })}
            value={this.state.setValue}
          />
          <button onClick={() => this.props.setCount(this.state.setValue)}>Set value</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: () => dispatch(addCount()),
    subtractCount: () => dispatch(subtractCount()),
    resetCount: () => dispatch(resetCount()),
    setCount: (value) => dispatch(setCount(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
