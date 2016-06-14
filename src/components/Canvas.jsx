import _ from 'lodash';
import classNames from 'classnames';

import BaseComponent from './BaseComponent';
import Emoji from './Emoji';

export default class Canvas extends BaseComponent {
    static get defaultProps(){
        return {
            editable: true,
            onCellClick: () => {}
        };
    }

    render(){
        const classes = classNames('canvas', {
            'canvas--editable': this.props.editable,
        });

        return (
            <div className={classes}>
                {this._renderRows()}
            </div>
        );
    }

    _renderRows(){
        return this.props.data.map((row, rowIndex) => {
            return this._renderRow(rowIndex);
        });
    }

    _renderRow(rowIndex){
        const cells = this.props.data[rowIndex].map((value, colIndex) => {
            return this._renderCell(rowIndex, colIndex);
        });

        return (
            <div className="canvas__row" key={`row-${rowIndex}`}>
                {cells}
            </div>
        )
    }

    _renderCell(rowIndex, colIndex){
        const rowMod = (rowIndex) % 10;
        const colMod = (colIndex) % 10;
        const shouldBeDark = (rowMod >= 0 && rowMod < 5) ?
                (colMod >= 0 && colMod < 5) :
                (colMod >= 5 && colMod < 10);

        let shouldBeExcluded = false;
        if (this.props.boundingRect){
            const rect = this.props.boundingRect;
            shouldBeExcluded = (rowIndex < rect.top ||
                colIndex < rect.left ||
                rowIndex >= (rect.top + rect.height) ||
                colIndex >= (rect.left + rect.width));
        }

        const cellClasses = classNames('canvas__cell', {
            'canvas__cell--dark': this.props.editable && shouldBeDark,
            'canvas__cell--excluded': shouldBeExcluded,
        });

        const value = this.props.data[rowIndex][colIndex];
        let emoji;
        if (value){
            if (this.props.emoji.stock[value]){
                emoji = (
                    <Emoji name={value} type="STOCK"
                            position={this.props.emoji.stock[value]} />
                );
            } else {
                emoji = (
                    <Emoji name={value} type="CUSTOM"
                            url={this.props.emoji.custom.emoji[value].url} />
                );
            }
        }

        return (
            <div key={`cell-${rowIndex}-${colIndex}`}
                onMouseDown={() => this._onCellClick(rowIndex, colIndex)}
                onMouseMove={(e) => this._onMouseOver(e, rowIndex, colIndex)}
                className={cellClasses}>{emoji}</div>
        );
    }

    _onCellClick(rowIndex, colIndex){
        this.props.onCellClick(rowIndex, colIndex);
    }

    _onMouseOver(evt, rowIndex, colIndex){
        if (evt.buttons === 1){
            this.props.onCellClick(rowIndex, colIndex);
        }
    }
}