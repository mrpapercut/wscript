class ProxyGenerator {
    constructor(_class, _config) {
        const self = this;

        this._class  = _class;
        this._config = _config || {
            logFunction: global.proxy_config && global.proxy_config.logFunction ? global.proxy_config.logFunction : console.log
        };

        return class {
            constructor() {
                const args = [...arguments];
                self.initializedClass = new self._class(...args);
                self.log('CONSTRUCT', self.initializedClass.constructor.name, null, [...args]);

                return new Proxy(self.initializedClass, self.getProxyProps());
            }
        };
    }

    matchProperty(target, propKey) {
        const matched = {
            propKey: null,
            method: null
        }

        const methods = Object.getOwnPropertyNames(target.constructor.prototype);
        const props = Object.keys(target);

        let regex = null;
        try {
            regex = new RegExp(`^${propKey}$`, 'i');
        } catch(e) {
            return matched;
        }

        for (let i in props) {
            if (regex.test(props[i])) {
                matched.propKey = props[i];
            }
        }

        for (let i in methods) {
            if (regex.test(methods[i])) {
                matched.method = methods[i];
            }
        }

        return matched;
    }

    getProxyProps() {
        const self = this;

        return {
            get(target, propKey, receiver) {
                // Prepare for case-insensitivity
                const matched = self.matchProperty(target, propKey);

                // Accessing properties
                if (target.hasOwnProperty(matched.propKey)) {
                    self.log('GET', target.constructor.name, propKey, null, target[matched.propKey]);

                // Calling functions
                } else if (typeof target[matched.method] === 'function' && !self.isNative(target[matched.method])) {
                    return new Proxy(target[matched.method], {
                        apply(applyTarget, thisArg, args) {
                            self.log('CALL', thisArg.constructor.name, propKey, [...args]);

                            return Reflect.apply(applyTarget, thisArg, args);
                        }
                    });
                }

                return target[matched.propKey];
            },
            set(target, propKey, value, receiver) {
                const matched = self.matchProperty(target, propKey);
                self.log('SET', target.constructor.name, propKey, [value]);
                target[matched.propKey] = value;
                return true;
            }
        }
    }

    isNative(value) {
        const toString = Object.prototype.toString;

        const fnToString = Function.prototype.toString;

        const reHostCtor = /^\[object .+?Constructor\]$/;

        const reNative = RegExp('^'
            + String(toString)
            .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
            .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
            + '$');

        // TODO: use isNative for native properties too
        // const type = typeof value;
        // return type === 'function' ? reNative.test(fnToString.call(value))
        // : (value && type === 'object' && reHostCtor.test(toString.call(value))) || false;

        return reNative.test(fnToString.call(value));

    }

    parseType(arg) {
        let res;

        switch (typeof arg) {
            case 'string':
                res = '"' + arg + '"';
                break;
            case 'number':
            case 'boolean':
            case 'function':
            case 'undefined':
                res = '' + arg;
                break;
            case 'object':
                if (arg === null) res = 'null';
                else if (arg.constructor.name === 'Array') res = '[' + arg.map(a => this.parseType(a)).join(', ') + ']';
                else if (arg.constructor.name === 'Object') {
                    let obj = [];
                    for (let val in arg) obj.push(`${val}: ${this.parseType(arg[val])}`);
                    res = `{${obj.join(', ')}}`;
                } else res = arg;
        }

        return res;
    }

    log(method, parentName, propertyName, args, result) {
        args = args ? args.map(arg => this.parseType(arg)).join(', ') : '';
        if (method === 'CALL' || method === 'CONSTRUCT') args = `(${args})`;
        else if (method === 'SET') args = ` = ${args}`;

        if (method === 'CONSTRUCT') {
            this._config.logFunction(`> ${method} new ${parentName}${args}`);
        } else {
            if (propertyName.indexOf('_') !== 0) {
                this._config.logFunction(`> ${method} ${parentName}.${propertyName}${args}`);
                if (result) this._config.logFunction(`< ${this.parseType(result)}`);
            }
        }
    }
}

module.exports = ProxyGenerator;
