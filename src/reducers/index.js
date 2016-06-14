import {combineReducers} from 'redux';

import canvas from './canvas';
import controls from './controls';
import emoji from './emoji';

export default combineReducers({
    canvas,
    controls,
    emoji,
});
