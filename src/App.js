import React, { Component } from 'react';


// SVG SHAPES

const min = '-';
const bond = '~';
const more = '<';

const SVG_MIN = scale => (
  <line
    stroke="black"
    strokeWidth="2"
    x1="0" x2={scale}
    y1 = "0" y2={scale}
  />
);

const SVG_BOND = (
  <line
    stroke="black"
    strokeWidth="2"
    x1="0" x2="1"
    y1 = "0" x2="1"
  />
);

const SVG_MORE = (
  <line
    stroke="black"
    strokeWidth="2"
    x1="0" x2="1"
    y1 = "0" x2="1"
  />
);


// 0 <= x <= 1
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

const mapToSVGShape = x => {
  const min = SVG_MIN;
  return SVG_MIN;
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
      <svg onClick={() => this.turn()}>
        <g transform="scale(1)">
          {SVG_MIN(20)}
          {mapToSVGShape(SVG_BOND)}
          {mapToSVGShape(SVG_MORE)}
        </g>
      </svg>
    );
  }
}
