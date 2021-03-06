
import typeOf from "type-of";
import kindOf from 'kind-of';

//Array functions
export const at = index => arr => arr[index];
export const concat = item => arr => [].concat(arr).concat(item);
export const createIndex = (getId, transform = identity) => arr => {
    const index = arr.reduce(
        (combined, cur) => ({
            ...combined,
            [getId(cur)]: transform(cur)
        }),
        {}
    );
    return id => index[id];
}
export const entries = arr => arr.entries();
export const every = f => arr => arr.every(f);
export const filter = f => obj => typeSwitch(obj, {
    array: () => obj.filter(f),
    object: () => Object.keys(obj).reduce((combined, key) => f(obj[key], key)
        ? {...combined, [key]: obj[key]}
        : combined,
        {}
    )
});
export const find = f => arr => arr.find(f);
export const findIndex = f => arr => arr.findIndex(f);
export const first = at(0);
export const flatten = arr => arr.reduce((combined, cur) => combined.concat(cur), []);
export const forEach = f => arr => {arr.forEach(f); return arr;};
export const from = arr => Array.from(arr);
export const includes = item => arr => arr.includes(item);
export const indexOf = item => arr => arr.indexOf(item);
export const isArray = obj => Array.isArray(obj);
export const joinWith = sep => arr => arr.join(sep);
export const join = joinWith('');
export const juxt = function() {return obj => map(f => typeof f == 'function' ? f(obj) : f)([...arguments]);};
export const keys = obj => typeSwitch(obj, {
    array: () => obj.keys(),
    object: () => Object.keys(obj)
});
export const last = arr => at(arr.length-1)(arr);
export const lastIndexOf = item => arr => arr.lastIndexOf(item);
export const map = f => obj => typeSwitch(obj, {
    array: () => obj.map(f),
    object: () => keys(obj).map((val, key) => ({[key]: f(val, key)})).reduce(merge)
});
export const partition = partitionFunc => arr => {
    const index = arr.reduce((partitioned, cur) => {
        const key = partitionFunc(cur);
        return {
            ...partitioned,
            [key]: partitioned[key]
                ? partitioned[key].concat(cur)
                : [cur]
        };
    }, {});
    return id => index[id] || [];
};
export const partitionOn = propName => partition(prop(propName));
export const pop = arr => {arr = from(arr); arr.pop(); return arr};
export const push = item => arr => {arr = from(arr); arr.push(item); return arr;};
export const range = (start, end) =>
    [...Array(Math.abs(end - start) + 1).keys()]
        .map(i => start < end ? i + start : start - i);
export const reduce = (f, initial) => arr => arr.reduce(f, initial);
export const reduceRight = (f, initial) => arr => reverse(arr).reduce(f, initial);
export const reverse = arr => from(arr).reverse();
export const shift = arr => {arr = from(arr); arr.shift(); return arr;};
export const slice = (start, end) => arr => arr.slice(start, end);
export const splice = (start, length, replace) => arr => {
    let newArr = [...arr];
    if(typeof replace !== 'undefined') {
        newArr.splice(start, length, replace);
    } else {
        newArr.splice(start, length);
    }
    return newArr;
};
export const some = f => arr => arr.some(f);
export const sort = f => arr => from(arr).sort(f);
export const union = (a, b) => unique([].concat(a).concat(b));
export const unique = arr =>  [...new Set(arr)];
export const unshift = item => arr => {arr = from(arr); arr.unshift(item); return arr;};
export const values = arr => arr.values();

//Object
export const clone = obj => ({...obj});
export const merge = (a, b) => unique(concat(keys(a))(keys(b)))
    .reduce((obj, key) => {
        //If something broke, just return nothing
        if(kindOf(obj) === 'undefined') return undefined;

        //Ensure that both attributes have the same type
        const aType = kindOf(a[key]);
        const bType = kindOf(b[key]);

        const val =
            aType === 'undefined' ? b[key] :
            bType === 'undefined' ? a[key] :
                                    switchOn(aType, {
                                        object: () => merge(a[key], b[key]),
                                        array: () => a[key].concat(b[key]),
                                        default: () => bType !== 'undefined' ? b[key] : a[key]
                                    });
        return {[key]: val, ...obj};
    }, {});
export const prop = name => obj => obj[name];
export const props = juxt;
export const remove = names => obj => {
    obj = {...obj};
    [].concat(names).forEach(name => {
        delete obj[name];
    });
    return obj;
};
export const toString = obj => obj.toString();
export const toLocaleString = obj => obj.toLocaleString();

//Function composition
export const compose = function(){
    return obj => reverse([...arguments]).reduce(
        (data, f) => typeof f === 'function' ? f(data) : data,
        obj
    );
};
export const composeR = function(){
    return obj => [...arguments].reduce(
        (data, f) => typeof f === 'function' ? f(data) : data,
        obj
    );
};
export const _ = compose;
export const __ = composeR;

//Helpers
export const debug = stuff => {console.log(stuff); return stuff;};
export const identity = a => a;
export const get = a => () => a;

//Math
export const add = a => b => a + b;
export const subFrom = a => b => a - b;
export const sub = a => b => b - a;
export const mult = a => b => a * b;
export const divideBy = a => b => b / a;
export const divide = a => b => a / b;
export const mod = a => b => b % a;

//Comparison
export const gt = a => b => b > a;
export const gte = a => b => b >= a;
export const lt = a => b => b < a;
export const lte = a => b => b <= a;
export const equals = a => b => a == b;
export const notEquals = a => b => a != b;
export const sortBy = field => (a, b) => typeof a[field] === 'string'
    ? a[field].localeCompare(b[field])
    : a[field] - b[field];

//String
export const append = suffix => str => str + suffix;
export const charAt = index => str => str.charAt(index);
export const charCodeAt = index => str => str.charCodeAt(index);
export const endsWith = suffix => str.endsWith(suffix);
export const hash = data => {
    const str = JSON.stringify(data);
    //const h = crypto.createHash('sha256');
    //h.update(str);
    //return h.digest('hex');
    return str;
};
export const matches = regex => str =>str.match(regex);
export const prepend = prefix => str => prefix + str;
export const repeat = count => str => str.repeat(count);
export const replace = search => replacement => str => str.replace(search, replacement);
export const search = term => str => str.search(term);
export const split = sep => str => str.split(sep);
export const startsWith = prefix => str => str.startsWith(term);
export const substr = (start, len) => str => str.substr(start, len);
export const toLowerCase = str => str.toLowerCase();
export const toUpperCase = str => str.toUpperCase();
export const trim = str => str.trim();

//Checks
export const checkAsync = f => new Promise((resolve, reject) => {

});
export const notEmpty = a => new Promise((resolve, reject) => {
    a ? resolve(a) : reject(a);
});

export const empty = a => new Promise((resolve, reject) => {
    a ? reject(a) : resolve(a);
});

//Control flow
export const switchOn = (obj, actions) => (actions[obj] || actions.default || (() => undefined))();
export const typeSwitch = (obj, actions) => switchOn(typeOf(obj), actions);