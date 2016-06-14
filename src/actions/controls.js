
export const SELECT_PAINT = 'SELECT_PAINT';
export const SELECT_TOOL = 'SELECT_TOOL';
export const SET_PAINT = 'SET_PAINT';

export function selectPaint(paintIndex){
    return {
        paintIndex,
        type: SELECT_PAINT,
    }
}

export function selectTool(toolType){
    return {
        toolType,
        type: SELECT_TOOL,
    };
}

export function setPaint(value){
    return {
        value,
        type: SET_PAINT,
    };
}

export const TOOLS = {
    ERASER: 'ERASER',
    EYEDROP: 'EYEDROP',
    FILL: 'FILL',
    PENCIL: 'PENCIL',
};
