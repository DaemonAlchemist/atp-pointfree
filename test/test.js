/**
 * Created by Andrea on 9/3/2017.
 */

import assert from 'assert';
import {_, prop, props, map, subFrom, gt, filter, join, debug} from 'atp-pointfree';

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
    describe('compose', () => {
        it('should compose functions', () => {
            const adultIds = _(ids, adultsIn(2017));
            assert.deepEqual(["Andy:38", "Andrea:35"], adultIds(people));
        });
        it('should ignore inline comments', () => {
            const adultIds = _(ids, "of the", adultsIn(2017));
            assert.deepEqual(["Andy:38", "Andrea:35"], adultIds(people));
        });
    });
});
