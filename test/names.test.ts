import { describe, expect, it } from "vitest";
import { getNameDay } from "../lib";

/**
 * Convert ISO date string to Date object
 * @param date
 */
function fromIso(date: string): Date {
	const [year, month, day] = date.split("-").map(Number);

	if (year === undefined || month === undefined || day === undefined) {
		throw new Error("Invalid date format");
	}

	return new Date(year, month - 1, day);
}

describe("Name Day Tests", () => {
	it("Check Štěpánka name", () => {
		const date = fromIso("2024-10-31");
		expect(getNameDay(date)).toEqual(["Štěpánka"]);
	});

	it("Check Zdeněk name", () => {
		// 2024-10-31 is the day of Štěpánka
		const date = fromIso("2024-01-23");
		expect(getNameDay(date)).toEqual(["Zdeněk"]);
	});

	it("Check Adam, Eva names", () => {
		const date = fromIso("2024-12-24");
		expect(getNameDay(date)).toEqual(["Adam", "Eva"]);
	});

	it("Check Horymír at leap year", () => {
		const date = fromIso("2024-02-29");
		expect(getNameDay(date)).toEqual(["Horymír"]);
	});

	it("Check Tobiáš at All Souls Day", () => {
		const date = fromIso("2024-11-02");
		expect(getNameDay(date)).toEqual(["Tobiáš"]);
	});

	it("Check Jidáš and Alfréd at Independence Day", () => {
		expect(getNameDay(fromIso("2024-10-28"))).toEqual(["Jidáš", "Alfréd"]);
	});

	it("St. Cyril and Methodius Day", () => {
		expect(getNameDay(fromIso("2024-07-05"))).toEqual(["Cyril", "Metoděj"]);
	});

	it("Three Kings' Day - Kašpar, Melichar, Baltazar", () => {
		expect(getNameDay(fromIso("2024-01-06"))).toEqual(["Kašpar", "Melichar", "Baltazar"]);
	});

	it("Check days without names", () => {
		// New Year's Day
		expect(getNameDay(fromIso("2024-01-01"))).toEqual([]);

		// Labour Day
		expect(getNameDay(fromIso("2024-05-01"))).toEqual([]);

		// End of World War II
		expect(getNameDay(fromIso("2024-05-08"))).toEqual([]);

		// Christmas Day
		expect(getNameDay(fromIso("2024-12-25"))).toEqual([]);
	});
});
