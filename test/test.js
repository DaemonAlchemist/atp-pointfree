/**
 * Created by Andrea on 9/3/2017.
 */

import {assert} from 'chai';
import {
    at, concat, createIndex,
    _, prop, props, map, subFrom, gt, filter, join, debug,
    clone
} from 'atp-pointfree';

const people = [
    {name: "Andy", birthday: {year: 1979, month: 3, day: 22}, occupation: "Programmer"},
    {name: "Andrea", birthday: {year: 1982, month: 3, day: 5}, occupation: "Modeler"},
    {name: "Adrian", birthday: {year: 2015, month: 2, day: 25}, occupation: "Toddler"},
    {name: "Aeron", birthday: {year: 2017, month: 5, day: 1}, occupation: "Baby"}
];

const birthday = prop("birthday");
const month = prop("month");
const year = prop("year");
const day = prop("day");
const birthYear = _(year, "of", birthday);
const birthMonth = _(year, "of", birthday);
const birthDoM = _(day, "of", birthday);
const thisYear = new Date().getFullYear();
const name = prop("name");
const names = map(name);
const occupation = prop("occupation");
const occupations = map(occupation);
const ageIn = currentYear => _(subFrom(currentYear), birthYear);
const age = ageIn(thisYear);
const isAdultIn = year => _(gt(18), ageIn(year));
const isAdult = isAdultIn(thisYear);
const adultsIn = currentYear => filter(isAdultIn(currentYear));
const adults = adultsIn(thisYear);
const id = _(join, props(name, ":", age));
const ids = map(id);

describe('ATP-Point-Free', () => {
    describe("Array functions", () => {
        describe("at", () => {
            it('should return the element in the array at the given index', () => {
                assert.equal(at(0)([0, 1, 2]), 0);
                assert.equal(at(1)([0, 1, 2]), 1);
                assert.equal(at(2)([0, 1, 2]), 2);
            });
            it("should return undefined for out-of-bound indices", () => {
                assert.isUndefined(at(-1)([0, 1, 2]));
                assert.isUndefined(at(3)([0, 1, 2]));
            })
        });
        describe("concat", () => {
            it("should concatenate arrays", () => {
                assert.deepEqual(concat([2])([0, 1]), [0, 1, 2]);
            });
            it("should work on raw values", () => {
                assert.deepEqual(concat(1)(0), [0, 1]);
                assert.deepEqual(concat(2)([0, 1]), [0, 1, 2]);
                assert.deepEqual(concat([1, 2])(0), [0, 1, 2]);
            });
        });
        describe("createIndex", () => {
            it("should create an index for an array of items", () => {
                const getPeople = createIndex(prop("name"))(people);
                assert.equal(getPeople("Andy").occupation, "Programmer");
            });
            it("should return undefined for non-existent items", () => {
                const getPeople = createIndex(prop("name"))(people);
                assert.isUndefined(getPeople("I don't exist"));
            });
            it("should create references (not copies) of indexed objects", () => {
                const peopleCopy = people.map(clone);
                const getPeople = createIndex(prop("name"))(peopleCopy);
                peopleCopy[0].occupation = "Test";
                assert.equal(getPeople("Andy").occupation, "Test");
            });
        });
    });
    describe('compose', () => {
        it('should compose functions', () => {
            const adultIds = _(ids, adultsIn(2017));
            assert.deepEqual(["Andy:39", "Andrea:36"], adultIds(people));
        });
        it('should ignore inline comments', () => {
            const adultIds = _(ids, "of the", adultsIn(2017));
            assert.deepEqual(["Andy:39", "Andrea:36"], adultIds(people));
        });
    });
});
