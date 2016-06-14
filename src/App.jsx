import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';

import BaseComponent from './components/BaseComponent';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import * as CanvasActions from './actions/canvas.js';
import * as ControlsActions from './actions/controls.js';
import * as EmojiActions from './actions/emoji.js';
import ExportDialog from './components/ExportDialog';
import Palette from './components/Palette';

class App extends BaseComponent {
    componentDidMount(){
        // TODO(ndrwhr): Attempt to fetch custom emoji's if the user
        // has authenticated.
        // this.props.dispatch(EmojiActions.fetchCustomEmoji());

        document.body.addEventListener('keydown', this._onKeyDown);
    }

    componentWillUnmount(){
        document.body.removeEventListener('keydown', this._onKeyDown);
    }

    render(){
        let exportDialog;

        if (this.state.showExportDialog){
            exportDialog = (
                <div className="app__export-dialog">
                    <ExportDialog data={this.props.canvas.present}
                            emoji={this.props.emoji}
                            onClose={this._hideExportDialog} />
                </div>
            );
        }

        return (
            <div className="app" onKeyPress={this._onKeyPress}>
                <div className="app__contents">
                    <div className="app__panel app__panel--left">
                        <Controls {...this.props.controls}
                                emoji={this.props.emoji}
                                onToolSelect={this._onToolSelect}
                                onPaintSelect={this._onPaintSelect}/>
                    </div>
                    <div className="app__panel app__panel--center">
                        <Canvas data={this.props.canvas.present}
                                emoji={this.props.emoji}
                                onCellClick={this._onCellClick}/>
                        <div className="app__export-button"
                                onClick={this._showExportDialog}></div>
                    </div>
                    <div className="app__panel app__panel--right">
                        <Palette emoji={this.props.emoji}
                                onPaletteSelection={this._onPaletteSelection}/>
                    </div>
                </div>

                {exportDialog}
            </div>
        );
    }

    _getInitialState(){
        return {
            showExportDialog: false,
        };
    }

    _onKeyDown(evt){
        if (document.activeElement && document.activeElement.tagName === 'INPUT'){
            return;
        }

        const toolMap = {
            ['E'.charCodeAt(0)]: ControlsActions.TOOLS.ERASER,
            ['F'.charCodeAt(0)]: ControlsActions.TOOLS.FILL,
            ['P'.charCodeAt(0)]: ControlsActions.TOOLS.PENCIL,
            ['I'.charCodeAt(0)]: ControlsActions.TOOLS.EYEDROP,
        }

        const directionMap = {
            38: CanvasActions.DIRECTIONS.UP,
            39: CanvasActions.DIRECTIONS.RIGHT,
            40: CanvasActions.DIRECTIONS.DOWN,
            37: CanvasActions.DIRECTIONS.LEFT,
        };

        switch (evt.keyCode){
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
                this._onPaintSelect(evt.keyCode - 49);
                return;
            case 27:
                this._hideExportDialog();
                return;
            default:
                if (this.state.showExportDialog) return;

                if (toolMap[evt.keyCode]){
                    this._onToolSelect(toolMap[evt.keyCode]);
                    return
                }
                if (directionMap[evt.keyCode]){
                    this._shiftCanvas(directionMap[evt.keyCode]);
                    return
                }
        }
    }

    _onToolSelect(tool){
        this.props.dispatch(ControlsActions.selectTool(tool));
    }

    _onPaintSelect(paintIndex){
        this.props.dispatch(ControlsActions.selectPaint(paintIndex));
    }

    _onPaletteSelection(value){
        this.props.dispatch(ControlsActions.setPaint(value));
    }

    _onCellClick(rowIndex, colIndex){
        const {paints, selectedPaintIndex} = this.props.controls;
        const selectedPaintValue = paints[selectedPaintIndex];
        const data = this.props.canvas.present;

        let action;
        switch (this.props.controls.selectedTool){
            case ControlsActions.TOOLS.ERASER:
                action = CanvasActions.setCell(rowIndex, colIndex, null);
                break;
            case ControlsActions.TOOLS.EYEDROP:
                action = ControlsActions.setPaint(data[rowIndex][colIndex]);
                break;
            case ControlsActions.TOOLS.FILL:
                action = CanvasActions.fill(rowIndex, colIndex,
                        selectedPaintValue);
                break;
            case ControlsActions.TOOLS.PENCIL:
                action = CanvasActions.setCell(rowIndex, colIndex,
                        selectedPaintValue);
                break;
        }

        if (action){
            this.props.dispatch(action);
        }
    }

    _shiftCanvas(direction){
        this.props.dispatch(CanvasActions.shiftCanvas(direction));
    }

    _showExportDialog(){
        this.setState({
            showExportDialog: true,
        });
    }

    _hideExportDialog(){
        this.setState({
            showExportDialog: false,
        });
    }
}

function select(state){
    return state;
}

export default connect(select)(App);
