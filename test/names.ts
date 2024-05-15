import test from 'ava';
import {getNameDay} from '../lib/index.js';

/**
 * Convert ISO date string to Date object
 * @param date
 */
function fromIso(date: string): Date {
	const [year, month, day] = date.split('-').map(Number);

	if (year === undefined || month === undefined || day === undefined) {
		throw new Error('Invalid date format');
	}

	return new Date(year, month - 1, day);
}

test('Check Štěpánka name', t => {
	const date = fromIso('2024-10-31');
	t.deepEqual(getNameDay(date), ['Štěpánka']);
});

test('Check Zdeněk name', t => {
	// 2024-10-31 is the day of Štěpánka
	const date = fromIso('2024-01-23');
	t.deepEqual(getNameDay(date), ['Zdeněk']);
});

test('Check Adam, Eva names', t => {
	const date = fromIso('2024-12-24');
	t.deepEqual(getNameDay(date), ['Adam', 'Eva']);
});

test('Check Horymír at leap year', t => {
	const date = fromIso('2024-02-29');
	t.deepEqual(getNameDay(date), ['Horymír']);
});

test('Check Tobiáš at All Souls Day', t => {
	const date = fromIso('2024-11-02');
	t.deepEqual(getNameDay(date), ['Tobiáš']);
});

test('Check Jidáš and Alfréd at Independence Day', t => {
	t.deepEqual(getNameDay(fromIso('2024-10-28')), ['Jidáš', 'Alfréd']);
});

test('St. Cyril and Methodius Day', t => {
	t.deepEqual(getNameDay(fromIso('2024-07-05')), ['Cyril', 'Metoděj']);
});

test('Check days without names', t => {
	// New Year's Day
	t.deepEqual(getNameDay(fromIso('2024-01-01')), []);

	// Labour Day
	t.deepEqual(getNameDay(fromIso('2024-05-01')), []);

	// End of World War II
	t.deepEqual(getNameDay(fromIso('2024-05-08')), []);

	// Three Kings' Day
	t.deepEqual(getNameDay(fromIso('2024-01-06')), []);

	// Christmas Day
	t.deepEqual(getNameDay(fromIso('2024-12-25')), []);
});
