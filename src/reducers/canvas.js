import _ from 'lodash';

import * as CanvasActions from '../actions/canvas';

const ROWS = 20;
const COLS = 30;

const DEFAULT_CANVAS = {
    future: [],
    past: [],
    present: _.range(ROWS).map(() => {
        return _.range(COLS).map(() => null);
    }),
};

function copyCanvas(canvas){
    return canvas.slice(0).map(row => {
        return row.slice(0);
    });
}

function fill(data, startRowIndex, startColIndex, newValue){
    const valueToReplace = data[startRowIndex][startColIndex];
    const toFill = [[startRowIndex, startColIndex]];

    // Nothing to do if they're trying to fill a cell with the current brush.
    if (valueToReplace === newValue) return;

    while (toFill.length){
        const [row, col] = toFill.shift();

        if (data[row][col] !== valueToReplace) continue;

        data[row][col] = newValue

        // Go up.
        if (row !== 0){
            toFill.push([row - 1, col]);
        }

        // Go right.
        if (col !== data[0].length - 1){
            toFill.push([row, col + 1]);
        }

        // Go down.
        if (row !== data.length - 1){
            toFill.push([row + 1, col]);
        }

        // Go left.
        if (col !== 0){
            toFill.push([row, col - 1]);
        }
    }
}

function handleFill(canvas, action){
    const newPresent = copyCanvas(canvas.present);

    fill(newPresent, action.rowIndex, action.colIndex, action.value);

    return Object.assign({}, canvas, {
        present: newPresent,
    });
}

function handleSetCell(canvas, action){
    const newPresent = copyCanvas(canvas.present);

    newPresent[action.rowIndex][action.colIndex] = action.value;

    return Object.assign({}, canvas, {
        present: newPresent,
    });
}

function handleShiftCanvas(canvas, action){
    const newPresent = copyCanvas(canvas.present);

    switch(action.direction){
        case CanvasActions.DIRECTIONS.UP:
            let firstRow = newPresent.shift();
            newPresent.push(firstRow);
            break;
        case CanvasActions.DIRECTIONS.RIGHT:
            newPresent.forEach((row) => {
                const right = row.pop();
                row.unshift(right);
            });
            break;
        case CanvasActions.DIRECTIONS.DOWN:
            let lastRow = newPresent.pop();
            newPresent.unshift(lastRow);
            break;
        case CanvasActions.DIRECTIONS.LEFT:
            newPresent.forEach((row) => {
                const left = row.shift();
                row.push(left);
            });
            break;
    }

    return Object.assign({}, canvas, {
        present: newPresent,
    });
}

export default function canvasReducer(canvas = DEFAULT_CANVAS, action){
    switch(action.type){
        case CanvasActions.FILL:
            return handleFill(canvas, action);
        case CanvasActions.SET_CELL:
            return handleSetCell(canvas, action);
        case CanvasActions.SHIFT_CANVAS:
            return handleShiftCanvas(canvas, action);
        default:
            return canvas;
    }
}