import React, { Component } from "react";
import CounterButton from "./CounterButton";

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  render() {
    return (
      <div className="counter">
        <CounterButton
          by={1}
          incMethod={this.increment}
          decMethod={this.decrement}
        />
        <CounterButton
          by={5}
          incMethod={this.increment}
          decMethod={this.decrement}
        />
        <CounterButton
          by={10}
          incMethod={this.increment}
          decMethod={this.decrement}
        />
        <span className="count-1">{this.state.counter}</span>
        <button className="reset" onClick={this.reset}>
          RESET
        </button>
      </div>
    );
  }

  reset() {
    this.setState(() => {
      return { counter: 0 };
    });
  }

  decrement(by) {
    this.setState((prevState) => {
      return { counter: prevState.counter - by };
    });
  }
  increment(by) {
    this.setState((prevState) => {
      return { counter: prevState.counter + by };
    });
  }
}

export default Counter;
