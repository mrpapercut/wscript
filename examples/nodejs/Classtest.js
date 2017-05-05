class MyClass {
    constructor(str) {
        this.msg = str;
    }

    getMsg() {
        return this.msg;
    }
}

const c = new MyClass('Hello world!');
console.log(c.getMsg());