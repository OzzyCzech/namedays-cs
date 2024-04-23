import test from 'ava';
import {getNameDayArray, getNameDay} from '../lib/index.js';

/**
 * Convert ISO date string to Date object
 * @param date
 */
function froIso(date: string): Date {
	const [year, month, day] = date.split('-').map(Number);

	if (year === undefined || month === undefined || day === undefined) {
		throw new Error('Invalid date format');
	}

	return new Date(year, month - 1, day);
}

test('Check some significant names', t => {
	// 2024-10-31 is the day of Štěpánka
	t.deepEqual(getNameDayArray(froIso('2024-10-31')), ['Štěpánka']);
	t.is(getNameDay(froIso('2024-10-31')), 'Štěpánka');

	// 2024-01-23 is the day of Zdeněk
	t.deepEqual(getNameDayArray(froIso('2024-01-23')), ['Zdeněk']);
	t.is(getNameDay(froIso('2024-01-23')), 'Zdeněk');

	// 2024-12-24 is the day of Adam and Eve (Adam a Eva)
	t.deepEqual(getNameDayArray(froIso('2024-12-24')), ['Adam', 'Eva']);
	t.is(getNameDay(froIso('2024-12-24')), 'Adam a Eva');
});

test('Check Horymír at leap year', t => {
	t.deepEqual(getNameDayArray(froIso('2024-02-29')), ['Horymír']);
	t.is(getNameDay(froIso('2024-02-29')), 'Horymír');
});

test('Check Tobiáš at All Souls Day', t => {
	t.deepEqual(getNameDayArray(froIso('2024-11-02')), ['Tobiáš']);
	t.is(getNameDay(froIso('2024-11-02')), 'Tobiáš');
});

test('Check Jidáš and Alfréd at Independence Day', t => {
	t.deepEqual(getNameDayArray(froIso('2024-10-28')), ['Jidáš', 'Alfréd']);
	t.is(getNameDay(froIso('2024-10-28')), 'Jidáš a Alfréd');
});

test('St. Cyril and Methodius Day', t => {
	t.deepEqual(getNameDayArray(froIso('2024-07-05')), ['Cyril', 'Metoděj']);
	t.is(getNameDay(froIso('2024-07-05')), 'Cyril a Metoděj');
});

test('Check days without names', t => {
	// New Year's Day
	t.deepEqual(getNameDayArray(froIso('2024-01-01')), []);
	t.is(getNameDay(froIso('2024-01-01')), '');

	// Labour Day
	t.deepEqual(getNameDayArray(froIso('2024-05-01')), []);
	t.is(getNameDay(froIso('2024-05-01')), '');

	// End of World War II
	t.deepEqual(getNameDayArray(froIso('2024-05-08')), []);
	t.is(getNameDay(froIso('2024-05-08')), '');

	// Three Kings' Day
	t.deepEqual(getNameDayArray(froIso('2024-01-06')), []);
	t.is(getNameDay(froIso('2024-01-06')), '');

	// Christmas Day
	t.deepEqual(getNameDayArray(froIso('2024-12-25')), []);
	t.is(getNameDay(froIso('2024-12-25')), '');
});
