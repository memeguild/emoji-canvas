import classNames from 'classnames';

import BaseComponent from './BaseComponent';
import Emoji from './Emoji';

export default class Palette extends BaseComponent {
    shouldComponentUpdate(nextProps, nextState){
        return this.state.filter !== nextState.filter ||
                this.props.emoji.custom.fetched !== nextProps.emoji.custom.fetched ||
                Object.keys(this.props.emoji.custom.emoji).length !== Object.keys(nextProps.emoji.custom.emoji).length;
    }

    render(){
        return (
            <div className="palette">
                <div className="palette__search">
                    <input className="palette__search-input"
                            onInput={this._onSearchInput}
                            type="text"
                            placeholder="Search" />
                </div>
                <div className="palette__emojis">
                    {this._renderEmoji()}
                </div>
            </div>
        );
    }

    _renderEmoji(){
        const {stock, custom} = this.props.emoji;

        const emoji = Object.keys(stock).reduce((acc, name) => {
            if (!this.state.filter || name.includes(this.state.filter)){
                acc.push(
                    <div key={name} className="palette__emoji"
                            onClick={() => {this._onEmojiClick(name)}}>
                        <Emoji name={name} type="STOCK"
                                position={this.props.emoji.stock[name]} />
                    </div>
                );
            }

            return acc;
        }, []);

        Object.keys(custom.emoji).reduce((acc, name) => {
            const emoji = this.props.emoji.custom.emoji[name];

            if (!this.state.filter || name.includes(this.state.filter)){
                acc.push(
                    <div key={name} className="palette__emoji"
                            onClick={() => {this._onEmojiClick(name)}}>
                        <Emoji name={name} type="CUSTOM"
                                url={emoji.url} />
                    </div>
                );
            }

            return acc;
        }, emoji);

        return emoji;
    }

    _getInitialState(){
        return {
            filter: '',
        };
    }

    _onSearchInput(evt){
        this.setState({
            filter: evt.currentTarget.value.trim(),
        });
    }

    _onEmojiClick(name){
        this.props.onPaletteSelection(name);
    }
}
