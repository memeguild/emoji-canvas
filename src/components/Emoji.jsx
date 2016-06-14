import classNames from 'classnames';

import BaseComponent from './BaseComponent';

export default class Emoji extends BaseComponent {
    static get defaultProps(){
        return {
            aliases: [],
        };
    }

    render(){
        const classes = classNames('emoji', {
            [`emoji--${this.props.type.toLowerCase()}`]: true,
        });


        const styles = {};

        if (this.props.type === 'STOCK'){
            styles.backgroundPosition = this.props.position;
        } else {
            styles.backgroundImage = `url("${this.props.url}")`;
        }

        const title = [this.props.name, ...this.props.aliases].join(', ');

        return (
            <div className={classes} style={styles}
                    title={title}
                    data-name={this.props.name}></div>
        );
    }
}