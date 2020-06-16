import React, { Component } from "react";

class CounterButton extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  render() {
    return (
      <div className="counterButton">
        <button onClick={this.increment}>+{this.props.by}</button>
        <button onClick={this.decrement}>-{this.props.by}</button>
      </div>
    );
  }

  decrement() {
    this.props.decMethod(this.props.by);
  }

  increment() {
    this.props.incMethod(this.props.by);
  }
}

export default CounterButton;
