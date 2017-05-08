class MyClass {
    constructor(msg, index) {
        this.msg = msg || null;
        this._index = index || 0;

        this._msg = 'submessage';
    }

    setMsg(msg) {
        this.msg = msg;

        return true;
    }

    getFn() {
        return function(x) {
            return x * x;
        }
    }

    increment() {
        return ++this._index;
    }

    getMsg() {
        return this.msg;
    }
}

class MyProxy {
    constructor() {
        const args = [...arguments];
        this._class = args.shift();

        this.collect('CONSTRUCT', 'new MyClass', [...args]);

        return new Proxy(new this._class(...args), this.getProxyProps());
    }

    getProxyProps() {
        const self = this;

        return {
            get(target, propKey, receiver) {
                // Accessing properties
                if (target.hasOwnProperty(propKey)) {
                    self.collect('GET', target.constructor.name + '.' + propKey, null, target[propKey]);

                // Calling functions
                } else if (typeof target[propKey] === 'function' && !self.isNative(target[propKey])) {
                    return new Proxy(target[propKey], {
                        apply(applyTarget, thisArg, args) {
                            self.collect('CALL', thisArg.constructor.name + '.' + propKey, [...args]);

                            return Reflect.apply(applyTarget, thisArg, args);
                        }
                    });
                }

                return target[propKey];
            },
            set(target, propKey, value, receiver) {
                self.collect('SET', target.constructor.name + '.' + propKey, [value]);
                return target[propKey] = value;
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

        const type = typeof value;

        return type === 'function' ? reNative.test(fnToString.call(value))
            : (value && type === 'object' && reHostCtor.test(toString.call(value))) || false;
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

    collect(method, name, args, result) {
        args = args ? args.map(arg => this.parseType(arg)).join(', ') : '';
        if (method === 'CALL' || method === 'CONSTRUCT') args = `(${args})`;
        else if (method === 'SET') args = ` = ${args}`;

        console.log(`> ${method} ${name}${args}`);
        if (result) console.log(`< ${this.parseType(result)}`);
    }
}

const c = new MyProxy(MyClass, 'Hello world!', 17);
c.getMsg();
c.increment();
console.log('\nStrings, primitives');
console.log("'Hello world', undefined, null, true, false");
c.setMsg('Hello world', undefined, null, true, false);
c.getMsg();

console.log('\nNumbers');
console.log("1, 0, 0x11, 0b11, 0o11");
c.setMsg(1, 0, 0x11, 0b11, 0o11);
c.getMsg();

console.log('\nArrays');
console.log("['a', 'b', 'c', function(){console.log('Hello world')}, [1, 3, 5], {a: 3}]");
c.setMsg(['a', 'b', 'c', function(){console.log('Hello world')}, [1, 3, 5], {a: 3}]);
c.getMsg();

console.log('\nObjects');
console.log("{a:1, b:3, c: (()=>3*2), d: ['gf', 'e'], e: {f: '342', g: '`(${c})`'}}");
c.setMsg({a:1, b:3, c: (()=>3*2), d: ['gf', 'e'], e: {f: '342', g: '`(${c})`'}});
c.getMsg();

console.log('\nFunctions');
console.log("(r => r * r), function(x) {return x * x}, new Promise(resolve => setTimeout(() => resolve(3 * 4), 250))");
c.setMsg((r => r * r), function(x) {return x * x}, new Promise(resolve => setTimeout(() => resolve(3 * 4), 250)));
console.log('\n');
c.getMsg();
c._msg;
var f = c.getFn();
console.log(f(3));

