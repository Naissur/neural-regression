import React, { Component } from 'react';


const lessThan = (x, point) => {
  if (x <= point) { return 0; }
  return 1;
}

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

    const a = biForkate(choice, 0.5);
    const b = biForkate(a, 0.5);
    const c = biForkate(b, 0.5);

    console.log(a,b,c);

    const A = mapToBond(a);
    const B = mapToBond(b);
    const C = mapToBond(c);


    return (
      <div onClick={() => this.turn()}>
        <div>{mapToBond(A)}</div>
        <div>{mapToBond(B)}</div>
        <div>{mapToBond(C)}</div>
      </div>
    );
  }
}
