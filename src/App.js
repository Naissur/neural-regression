import React, { Component } from 'react';

import raf from 'raf';


const MAX_BOUNDS = 600;
const MAX_SCALE = 100;
const MIN_DERIVATION = 100;


// SVG SHAPES

const min = '-';
const bond = '~';
const fork = '<';

const pickWithChoice = (arr, num) => {
  const length = arr.length;
  const choice = Math.floor([num * length]); // ^ +
  return arr[choice];
}

const SVG_FACT = (
  <circle
    cx="0" cy="0" r="3"

    stroke="black"
    strokeWidth="2"
  />
);

const SVG_MIN = scale => (
  <g>
    <line
      stroke="black"
      strokeWidth="2"
      x1="0" x2={-scale}
      y1 = "0" y2="0"
    />
    <circle
      cx={-scale} cy="0" r="6"

      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const SVG_BOND = scale => (
  <g>
    <line
      stroke="black"
      strokeWidth="2"
      x1="0" y1="0" 
      x2={scale / 4} y2={scale / 4}
    />
    <line
      stroke="black"
      strokeWidth="2"
      x1={scale / 4} y1={scale / 4}
      x2="0" y2={scale / 2}
    />
    <line
      stroke="black"
      strokeWidth="2"
      x1="0" y1={scale / 2}
      x2={-scale / 4} y2={scale * 3 / 4}
    />
    <line
      stroke="black"
      strokeWidth="2"
      x1={-scale / 4} y1={scale * 3 / 4}
      x2={0} y2={scale}
    />
    <circle
      cx="0" cy={scale} r="6"

      stroke="black"
      strokeWidth="2"
    />
  </g>
);

const SVG_FORK = scale => (
  <g>
    <line
      stroke="black"
      strokeWidth="2"
      x1="0" x2="0"
      y1 = "0" y2={-scale}
    />
    <line
      stroke="black"
      strokeWidth="2"
      x1="0" x1={scale}
      y2="0" y1="0"
    />
    <circle
      cx={scale} cy="0" r="6"
      stroke="black"
      strokeWidth="2"
    />
    <circle
      cx="0" cy={-scale} r="6"

      stroke="black"
      strokeWidth="2"
    />
  </g>
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
  if (x <= 0.5) { return SVG_MIN; }
  if (x <= 0.25) { return SVG_BOND; }

  return SVG_FORK;
}


export default class App extends Component {
  state = {
    shapeType: 0.3,
    mX: 0,
    mY: 0,
    lastPoint : { x: 0, y: 0 }
  }


  handleMouseMove(ev) {
    this.setState({ mX: ev.clientX, mY: ev.clientY });
  }

  handleMouseDown() {
    const shapeType = Math.random();

    this.setState({ shapeType });

    this.turn({
      pX: this.state.mX,
      pY: this.state.mY,
      shapeType
    })
  }

  turn({ pX, pY, type }) {
    const point = {
      x: pX,
      y: pY,
      shapeType
    };

    const { mx, my } = this.state;

    this.setState({ lastPoint: { x: mX, y: mY, shapeType: Math.random() }});
  }

  render() {
    const { mX, mY, shapeType, points, lastPoint } = this.state;

    const choice = Math.random();
    const SHAPE = (pickWithChoice([SVG_MIN, SVG_BOND, SVG_FORK], shapeType))(MAX_SCALE);

    const LAST_SHAPE = SVG_BOND; // (pickWithChoice([SVG_MIN, SVG_BOND, SVG_FORK], lastPoint.shapeType || shapeType))(MAX_SCALE / 2);

    return (
      <svg
        style={{ width: MAX_BOUNDS, height: MAX_BOUNDS, border: '1px solid #000', cursor: 'none' }}
        onMouseMove={::this.handleMouseMove}
        onMouseDown={::this.handleMouseDown}
      >
        <g transform={`translate(${mX}, ${mY}) rotate(${(mX * mY / MAX_BOUNDS) * 2  + 180 })`}>
          {SVG_FACT}
          {SHAPE}
        </g>
        <g transform={`translate(${lastPoint.x}, ${lastPoint.y}) rotate(${(lastPoint.x + lastPoint.y) % 360})`}>
          {LAST_SHAPE}
        </g>
      </svg>
    );
  }
}
