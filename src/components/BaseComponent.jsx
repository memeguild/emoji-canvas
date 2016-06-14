import {Component} from 'react';

/**
 * A home for common extensions to Components.
 *
 * Currently adds:
 *     - method auto-binding.
 *     - _getInitialState() method.
 */
export default class BaseComponent extends Component {
    constructor(...args){
        super(...args);

        this._autoBindMethods();
        this.state = this._getInitialState();
    }

    /**
     * React ES6 classes do not autobind their methods by default, this method
     * loops over and binds every function defined on the subclass's prototype.
     */
    _autoBindMethods(){
        let methods = Object.getOwnPropertyNames(this.constructor.prototype)
            .filter(prop => typeof this[prop] === 'function');

        methods.forEach(methodName => {
            this[methodName] = this[methodName].bind(this);
        });
    }

    /**
     * Replacement for the standard getInitialState() method provided by
     * non-ES6 react components.
     */
    _getInitialState(){
        // Left for subclasses to define.
    }
}