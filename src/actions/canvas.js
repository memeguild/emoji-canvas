export const FILL = 'FILL';
export const SET_CELL = 'SET_CELL';
export const SHIFT_CANVAS = 'SHIFT_CANVAS';

export function fill(rowIndex, colIndex, value){
    return {
        type: FILL,
        rowIndex,
        colIndex,
        value,
    };
}


export function setCell(rowIndex, colIndex, value){
    return {
        type: SET_CELL,
        rowIndex,
        colIndex,
        value,
    };
}

export function shiftCanvas(direction){
    return {
        type: SHIFT_CANVAS,
        direction,
    };
}

export const DIRECTIONS = {
    UP: 'UP',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
};
