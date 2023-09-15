import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';

interface BatchViewProps {
    board: Board
    setBoard: (board: Board) => void
}

const BatchView: FC<BatchViewProps> = ({board, setBoard}) => {
    return (
        <div>

        </div>
    );
};

export default BatchView;