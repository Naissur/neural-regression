import React, { Component } from 'react';
import Game from './Game';

import raf from 'raf';

const CELL_WIDTH = 20;

const Cell = ({ active, onClick }) => {
  const color = active? 'black' : 'white';

  return(
    <div style={{
      backgroundColor: color,
      display: 'inline-block',
      width: CELL_WIDTH,
      height: CELL_WIDTH,

      cursor: 'pointer'
    }}
      onClick={onClick}
    />
  );
}

const CellRow = ({ children }) => (
  <div
    style={{
      fontSize: 0,
      marginTop: -1
    }}
  >
    <div style={{
      display: 'inline-block', fontSize: 0, border: '1px solid #000'
    }}>
      {children}
    </div>
  </div>
)


export default ({ data }) => {
  return (
    <div>
      {data.map((row, index) => (
        <CellRow key={index}>
          {row.map((cell, i) => <Cell active={cell > 0.5} key={i}/>)}
        </CellRow>
      ))}
    </div>
  );
}
