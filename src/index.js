/**
 * Created by Andrea on 10/13/2017.
 */

//Array functions
export const at = index => arr => arr[index];
export const concat = item => arr => arr.concat(item);
export const entries = arr => arr.entries();
export const every = f => arr => arr.every(f);
export const filter = f => arr => arr.filter(f);
export const find = f => arr => arr.find(f);
export const findIndex = f => arr => arr.findIndex(f);
export const first = at(0);
export const forEach = f => arr => {arr.forEach(f); return arr;};
export const from  = arr => Array.from(arr);
export const includes = item => arr.includes(item);
export const indexOf = item => arr.indexOf(item);
export const isArray = obj => Array.isArray(obj);
export const joinWith = sep => arr => arr.join(sep);
export const join = joinWith('');
export const juxt = funcs => obj => funcs.map(f => f(obj));
export const keys = arr => arr.keys();
export const last = arr => at(arr.length-1)(arr);
export const lastIndexOf = item => arr.lastIndexOf(item);
export const map = f => arr => arr.map(f);
export const pop = arr => {arr = from(arr); arr.pop(); return arr};
export const push = item => arr => {arr = from(arr); arr.push(item); return arr;};
export const reduce = (f, initial) => arr => arr.reduce(f, initial);
export const reduceRight = (f, initial) => arr => arr.reduceRight(f, initial);
export const reverse = arr => from(arr).reverse();
export const shift = arr => {arr = from(arr); arr.shift(); return arr;};
export const slice = (start, end) => arr => arr.slice(start, end);
//TODO:  splice
export const some = f => arr => arr.some(f);
export const sort = f => arr => from(arr).sort(f);
export const unshift = item => arr => {arr = from(arr); arr.unshift(item); return arr;};
export const values = arr => arr.values();

//Object
export const prop = name => obj => obj[name];
export const toString = obj => obj.toString();
export const toLocaleString = obj => obj.toLocaleString();

//Helpers
export const compose = funcs => obj => funcs.reduceRight((data, f) => f(data), obj);
export const _ = compose;
export const debug = stuff => {console.log(stuff); return stuff;};

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
export const equal = a => b => a == b;
export const notEqual = a => b => a != b;

//String
export const charAt = index => str => str.charAt(index);
export const charCodeAt = index => str => str.charCodeAt(index);
export const append = suffix => str => str + suffix;
export const prepend = prefix => str => prefix + str;
export const endsWith = suffix => str.endsWith(suffix);
export const matches = regex => str =>str.match(regex);
export const repeat = count => str => str.repeat(count);
export const replace = search => replacement => str => str.replace(search, replacement);
export const search = term => str => str.search(term);
export const split = sep => str => str.split(sep);
export const startsWith = prefix => str => str.startsWith(term);
export const substr = (start, len) => str => str.substr(start, len);
export const toLowerCase = str => str.toLowerCase();
export const toUpperCase = str => str.toUpperCase();
export const trim = str => str.trim();
