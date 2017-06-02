import React, { Component } from 'react';

import raf from 'raf';


import { Neuron, Architect, Trainer } from 'synaptic';


let NETWORK, TRAINER;

function reset() {
  NETWORK = new Architect.Perceptron(1,2,1);
  TRAINER = new Trainer(NETWORK);
}

reset();

export default class App extends Component {
  state = {
    a: 0.5,
    b: 0.5,
    enforcing: true
  }

  componentWillMount() {
    reset();
  }

  reset() {
    reset();
  }

  setA(a) {
    const { enforcing } = this.state;

    if (!enforcing) {
      this.setState({ a });
      return;
    }

    const [ out ] = NETWORK.activate([a]);
    this.setState({ a, b: out });
  }

  setB(b) {
    const { enforcing } = this.state;

    if (!enforcing) {
      this.setState({ b });
      return;
    }

    const [ out ] = NETWORK.activate([b]);
    this.setState({ a: out, b });
  }

  enforce() {
    const { a, b } = this.state;

    var trainingSet = [ {
      input: [a],
      output: [b]
    } ];

    TRAINER.train(trainingSet, {
      rate: 0.1,
      iterations: 60
    });

    const [ out ] = NETWORK.activate([ a ]);

    this.setState({ a: out, b: out });
  }

  toggleEnforcing() {
    this.setState({ enforcing: !this.state.enforcing });
  }

  render() {
    const { a, b } = this.state;

    return (
      <div>
        A = {a.toFixed(2)}
        <input
          type="range"
          value={a}
          max="1"
          min="0"
          step="0.01"
          onChange={ev => this.setA(Number(ev.target.value))}
        />

        <br />

        B = {b.toFixed(2)}
        <input
          type="range"
          value={b}
          max="1"
          min="0"
          step="0.01"
          onChange={ev => this.setB(Number(ev.target.value))}
        />

        <br />
        <br />

        <label>
          <input
            type="checkbox"
            value={this.state.enforcing}
            onChange={ev => this.toggleEnforcing()}
          />
          Enforcing mode
        </label>

        <br />

        <button onClick={() => this.enforce()}>
          Enforce
        </button>
        <button onClick={() => this.reset()}>
          Reset
        </button>
      </div>
    );
  }
}
