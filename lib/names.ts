import data from "./names.json" with { type: "json" };

const names = data as Record<string, string | string[]>;

const pad = (n: number) => String(n).padStart(2, "0");

function toArray(value: string | string[] | undefined): string[] {
	if (!value) return [];
	return Array.isArray(value) ? value : [value];
}

const nameToDate = new Map<string, string[]>();
for (const [date, value] of Object.entries(names)) {
	for (const name of toArray(value)) {
		const key = name.toLowerCase();
		const dates = nameToDate.get(key);
		if (dates) {
			dates.push(date);
		} else {
			nameToDate.set(key, [date]);
		}
	}
}

/**
 * Get names for the given date
 * @param date
 */
export function getNameDay(date: Date): string[] {
	const key = `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
	return toArray(names[key]);
}

/**
 * Get the dates (MM-DD) when the given name has its name day
 * @param name - Czech first name (case-insensitive)
 * @returns array of date strings in MM-DD format
 */
export function getDateByName(name: string): string[] {
	return nameToDate.get(name.toLowerCase()) ?? [];
}
