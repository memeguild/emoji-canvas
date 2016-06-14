import React from 'react';

import BaseComponent from './BaseComponent';
import Canvas from './Canvas';

export default class ExportDialog extends BaseComponent {
    render(){
        const {data, onClose} = this.props;
        const {boundingRect} = this.state;

        return (
            <div className="export-dialog">
                <div className="export-dialog__mask"
                        onClick={onClose}></div>
                <div className="export-dialog__content">
                    <div className="export-dialog__canvas">
                        <Canvas data={data}
                            emoji={this.props.emoji}
                            boundingRect={boundingRect}
                            editable={false} />
                    </div>
                    <div className="export-dialog__controls">
                        <div className="export-dialog__controls-wrapper">
                            <h2 className="export-dialog__h2">Cropping:</h2>

                            <div className="export-dialog__control">
                                <label>Top: <input type="number"
                                    className="export-dialog__input"
                                    ref="top"
                                    min="0"
                                    defaultValue={boundingRect.top}
                                    max={data.length - boundingRect.height}
                                    onInput={this._onInput}/></label>
                            </div>
                            <div className="export-dialog__control">
                                <label>Left: <input type="number"
                                        className="export-dialog__input"
                                        ref="left"
                                        min="0"
                                        defaultValue={boundingRect.left}
                                        max={data[0].length - boundingRect.width}
                                        onInput={this._onInput}/></label>
                            </div>
                            <div className="export-dialog__control">
                                <label>Width: <input type="number"
                                        className="export-dialog__input"
                                        ref="width"
                                        min="1"
                                        defaultValue={boundingRect.width}
                                        max={data[0].length - boundingRect.left}
                                        onInput={this._onInput}/></label>
                            </div>
                            <div className="export-dialog__control">
                                <label>Height: <input type="number"
                                        className="export-dialog__input"
                                        ref="height"
                                        min="1"
                                        defaultValue={boundingRect.height}
                                        max={data.length - boundingRect.top}
                                        onInput={this._onInput}/></label>
                            </div>
                        </div>

                        <button className="export-dialog__save-button"
                                onClick={this._saveToClipBoard}>console.log</button>
                    </div>
                </div>
            </div>
        );
    }

    _getInitialState(){
        let minX = this.props.data[0].length - 1;
        let minY = this.props.data.length - 1;
        let maxX = 0;
        let maxY = 0;

        this.props.data.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                // Don't need to do anything if the cell is blank.
                if (!cell) return;

                minX = Math.min(minX, colIndex);
                minY = Math.min(minY, rowIndex);
                maxX = Math.max(maxX, colIndex);
                maxY = Math.max(maxY, rowIndex);
            });
        });

        const boundingRect = {
            top: minY,
            left: minX,
            width: (maxX - minX) + 1,
            height: (maxY - minY) + 1,
        };

        return {
            boundingRect,
            defaultValue: ':blank:',
        };
    }

    _saveToClipBoard(){
        const {top, left, width, height} = this.state.boundingRect;

        const endRegex = new RegExp(`(?:${this.state.defaultValue})+$`, 'g');

        var serializedCanvas = this.props.data.slice(top, top + height).map(row => {
            return row.slice(left, left + width).map(value => {
                return value === null ? this.state.defaultValue : value;
            }).join('').replace(endRegex, '');
        }).join('\n');

        // TODO(ndrwhr): Add this to a textarea for users to copy out.
        console.log(serializedCanvas);
    }

    _onInput(){
        this.setState({
            boundingRect: {
                top: parseInt(this.refs.top.value, 10),
                left: parseInt(this.refs.left.value, 10),
                width: parseInt(this.refs.width.value, 10),
                height: parseInt(this.refs.height.value, 10),
            }
        });
    }
}