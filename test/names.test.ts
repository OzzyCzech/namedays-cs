import { describe, expect, it } from "vitest";
import data from "../lib/names.json" with { type: "json" };
import { getDateByName, getNameDay } from "../lib";

describe("Test base days", () => {
	it("Check Štěpánka name", () => {
		expect(getNameDay(new Date(2024, 9, 31))).toEqual(["Štěpánka"]);
	});

	it("Check Zdeněk name", () => {
		expect(getNameDay(new Date(2024, 0, 23))).toEqual(["Zdeněk"]);
	});

	it("Check Horymír at leap year", () => {
		expect(getNameDay(new Date(2024, 1, 29))).toEqual(["Horymír"]);
	});

	it("Check Tobiáš at All Souls Day", () => {
		expect(getNameDay(new Date(2024, 10, 2))).toEqual(["Tobiáš"]);
	});
});

describe("Name days with multiple names", () => {
	it("Check Adam, Eva names", () => {
		expect(getNameDay(new Date(2024, 11, 24))).toEqual(["Adam", "Eva"]);
	});

	it("Check Jidáš and Alfréd at Independence Day", () => {
		expect(getNameDay(new Date(2024, 9, 28))).toEqual(["Jidáš", "Alfréd"]);
	});

	it("St. Cyril and Methodius Day", () => {
		expect(getNameDay(new Date(2024, 6, 5))).toEqual(["Cyril", "Metoděj"]);
	});

	it("Three Kings' Day - Kašpar, Melichar, Baltazar", () => {
		expect(getNameDay(new Date(2024, 0, 6))).toEqual(["Kašpar", "Melichar", "Baltazar"]);
	});
});

describe("Get date by name", () => {
	it("Find date for a single name", () => {
		expect(getDateByName("Štěpánka")).toEqual(["10-31"]);
	});

	it("Case insensitive lookup", () => {
		expect(getDateByName("štěpánka")).toEqual(["10-31"]);
		expect(getDateByName("ADAM")).toEqual(["12-24"]);
	});

	it("Return empty array for unknown name", () => {
		expect(getDateByName("Neexistující")).toEqual([]);
	});

	it("Find date for names sharing a day", () => {
		expect(getDateByName("Adam")).toEqual(["12-24"]);
		expect(getDateByName("Eva")).toEqual(["12-24"]);
	});

	it("Find multiple dates for the same name", () => {
		expect(getDateByName("Petr")).toEqual(["02-22", "06-29"]);
	});
});

describe("Name days without names", () => {
	it("Check days without names", () => {
		// New Year's Day
		expect(getNameDay(new Date(2024, 0, 1))).toEqual([]);
		// Labour Day
		expect(getNameDay(new Date(2024, 4, 1))).toEqual([]);
		// End of World War II
		expect(getNameDay(new Date(2024, 4, 8))).toEqual([]);
		// Christmas Day
		expect(getNameDay(new Date(2024, 11, 25))).toEqual([]);
	});
});

describe("Data completeness", () => {
	const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const emptyDays = ["01-01", "05-01", "05-08", "07-06", "12-25"];

	it("should have 361 entries (366 days minus 5 holidays)", () => {
		expect(Object.keys(data)).toHaveLength(366 - emptyDays.length);
	});

	it("should cover every day of the year (excluding known holidays)", () => {
		for (let m = 1; m <= 12; m++) {
			for (let d = 1; d <= daysInMonth[m - 1]!; d++) {
				const key = `${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
				if (emptyDays.includes(key)) {
					expect(data).not.toHaveProperty(key);
				} else {
					expect(data, `missing ${key}`).toHaveProperty(key);
				}
			}
		}
	});

	it("should not contain empty values", () => {
		for (const [key, value] of Object.entries(data)) {
			if (Array.isArray(value)) {
				expect(value.length, `empty array at ${key}`).toBeGreaterThan(0);
			} else {
				expect(value, `empty string at ${key}`).not.toBe("");
			}
		}
	});

	it("should not contain duplicate names within the same day", () => {
		for (const [key, value] of Object.entries(data)) {
			const names = Array.isArray(value) ? value : [value];
			const unique = new Set(names.map((n) => n.toLowerCase()));
			expect(unique.size, `duplicate name in ${key}`).toBe(names.length);
		}
	});
});

describe("Reverse lookup consistency", () => {
	it("getDateByName should include the correct date for all names", () => {
		for (const [key, value] of Object.entries(data)) {
			const names = Array.isArray(value) ? value : [value];
			for (const name of names) {
				expect(getDateByName(name), `${name} should include ${key}`).toContain(key);
			}
		}
	});
});
