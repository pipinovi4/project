import React, {FC, useEffect} from 'react';
import {Cell} from "../models/Cell";
import { FigureNames } from '../figures/Figure';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  const zalupa = cell.figure?.name === FigureNames.KING && cell.cellAttacked 
  return (
    <div
      className={['cell', cell.color, selected ? "selected" : '', zalupa ? 'king-attacked' : ''].join(' ')}
      onClick={() => click(cell)}
      style={{background: cell.available && cell.figure ? '#6eb5d1' : ''}}
    >
      {cell.available && !cell.figure && <div className={"available"}/>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
    </div>
  );
};

export default CellComponent;