const isNative = require('./isNative');

class MyClass {
    constructor() {
        this.msg = null;

        this._msg = 'submessage';
    }

    setMsg(msg) {
        this.msg = msg;
    }

    getMsg() {
        return this.msg || 'No message';
    }
}



class MyClassProxy {
    constructor() {
        return new Proxy(new MyClass(...arguments), {
            get(target, propKey, receiver) {

                // Accessing properties directly
                if (target.hasOwnProperty(propKey)) {
                    // console.log('> ', target.constructor.name + '.' + propKey);
                    console.log('< ', target[propKey]);

                // Calling functions
                } else if (typeof target[propKey] === 'function' && !isNative(target[propKey])) {
                    return new Proxy(target[propKey], {
                        apply(applyTarget, thisArg, args) {
                            console.log(thisArg.constructor.name + '.' + propKey + '(', [...args], ')');

                            return Reflect.apply(applyTarget, thisArg, args);
                        }
                    });
                }

                return target[propKey];
            }
        });
    }
}

const c = new MyClassProxy('Hello world!');
c.getMsg();
c.setMsg('Hello world', undefined, null, 1, 0);
c.getMsg();
c._msg;



