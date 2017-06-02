import React, { Component } from 'react';

import raf from 'raf';


import { Neuron } from 'synaptic';


let A = new Neuron();
let B = new Neuron();
let connection = A.project(B);

function reset() {
  A = new Neuron();
  B = new Neuron();
  connection = A.project(B);

  A.activate(0.5);
}

reset();

export default class App extends Component {
  state = {
    focus: A.activate(),
    fact: B.activate()
  }

  componentWillMount() {
    reset();
  }

  reset() {
    reset();
  }

  moveFocus(x) {
    A.activate(x);

    const fact = B.activate();

    this.setState({ focus: x, fact });
  }

  learn() {
    const { focus } = this.state;

    const learningRate = 0.3;

    for(var i = 0; i < 100; i++) {
      // when A activates focus
      A.activate(focus);

      // train B to activate focus
      B.activate();
      B.propagate(learningRate, focus);
    }

    const fact = B.activate();

    this.setState({ focus, fact });
  }

  render() {
    const { focus, fact } = this.state;

    return (
      <div>
        Focus:
        <input
          type="range"
          value={focus}
          max="1"
          min="0"
          step="0.01"
          onChange={ev => this.moveFocus(Number(ev.target.value))}
        />
        <div>A = {focus.toFixed(2)}</div>

        <div>Fact: {fact.toFixed(2)}</div>
        <div>Connection weight: {connection.weight.toFixed(2)}</div>

        <button onClick={() => this.learn()}>
          Train on focus
        </button>
        <button onClick={() => this.reset()}>
          Reset
        </button>
      </div>
    );
  }
}
