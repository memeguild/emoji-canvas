import classNames from 'classnames';

import BaseComponent from './BaseComponent';
import * as ControlsActions from '../actions/controls.js';
import Emoji from './Emoji';

export default class Controls extends BaseComponent {
    shouldComponentUpdate(nextProps, nextState){
        return this.props.selectedTool !== nextProps.selectedTool ||
                this.props.paints.join('') !== nextProps.paints.join('') ||
                this.props.selectedPaintIndex !== nextProps.selectedPaintIndex;
    }

    render(){
        const classes = Object.keys(ControlsActions.TOOLS).reduce(
                (acc, tool) => {

            acc[tool] = classNames('controls__button', {
                'controls__button--selected': tool === this.props.selectedTool,
            });

            return acc;
        }, {});

        return (
            <div className="controls">
                <div className="controls__buttons">
                    <button className={classes[ControlsActions.TOOLS.PENCIL]}
                        onClick={this._onToolClick}
                        data-tool="PENCIL"></button>
                    <button className={classes[ControlsActions.TOOLS.FILL]}
                        onClick={this._onToolClick}
                        data-tool="FILL"></button>
                    <button className={classes[ControlsActions.TOOLS.ERASER]}
                        onClick={this._onToolClick}
                        data-tool="ERASER"></button>
                    <button className={classes[ControlsActions.TOOLS.EYEDROP]}
                        onClick={this._onToolClick}
                        data-tool="EYEDROP"></button>
                </div>
                <div className="controls__paints">
                    {this._renderPaint(0)}
                    {this._renderPaint(1)}
                    {this._renderPaint(2)}
                    {this._renderPaint(3)}
                    {this._renderPaint(4)}
                </div>
            </div>
        );
    }

    _renderPaint(index){
        const classes = classNames('controls__paint-item', {
            'controls__paint-item--selected':
                    index === this.props.selectedPaintIndex,
        });

        let emoji;
        if (this.props.paints[index]){
            const name = this.props.paints[index];

            if (this.props.emoji.stock[name]){
                emoji = (
                    <Emoji name={name} type="STOCK"
                            position={this.props.emoji.stock[name]} />
                );
            } else {
                emoji = (
                    <Emoji name={name} type="CUSTOM"
                            url={this.props.emoji.custom.emoji[name].url} />
                );
            }
        }

        return (
            <div className={classes} data-index={index}
                    onMouseDown={this._onPaintClick}>
                <div className="controls__paint-item-number">{index + 1}</div>
                <div className="controls__paint-item-emoji">{emoji}</div>
            </div>
        );
    }

    _onToolClick(evt){
        this.props.onToolSelect(evt.currentTarget.dataset.tool)
    }

    _onPaintClick(evt){
        this.props.onPaintSelect(parseInt(evt.currentTarget.dataset.index, 10));
    }
}
