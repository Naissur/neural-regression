import React, { Component } from 'react';


const mapToBond = x => {
  const a = biForkate(x, 0.5);
  if (a <= 0.5) { return '-'; }

  const b = biForkate(x, a);
  if (a <= 0.5) { return '~'; }

  return '<';
}


const biForkate = (a, b) => {
  if (Math.random() <= 0.5) {
    return a;
  }
  return b;
}

export default class App extends Component {
  state = {
    x: 0.5
  }

  turn() {
    this.setState({ x: Math.random() });
  }

  render() {
    const choice = this.state.x;
    const m = x => mapToBond(x);

    const a = m(biForkate(choice, 0.5));
    const b = m(biForkate(a, 0.5));
    const c = m(biForkate(b, 0.5));

    return (
      <div onClick={() => this.turn()}>
        <div>{a}</div>
        <div>{b}</div>
        <div>{c}</div>
      </div>
    );
  }
}
