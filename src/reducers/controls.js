import * as ControlsActions from '../actions/controls.js';

const DEFAULT_CONTROLS = {
    selectedTool: ControlsActions.TOOLS.PENCIL,
    selectedPaintIndex: 0,
    paints: [":grinning:", ":clap:", ":fire:", ":100:", ":poop:"],
}

export default function controlsReducer(controls = DEFAULT_CONTROLS, action){
    switch(action.type){
        case ControlsActions.SELECT_PAINT:
            return Object.assign({}, controls, {
                selectedPaintIndex: action.paintIndex,
            });
        case ControlsActions.SELECT_TOOL:
            return Object.assign({}, controls, {
                selectedTool: action.toolType,
            });
        case ControlsActions.SET_PAINT:
            const paints = [...controls.paints];
            paints[controls.selectedPaintIndex] = action.value;
            return Object.assign({}, controls, {
                paints,
            });
        default:
            return controls;
    }
}