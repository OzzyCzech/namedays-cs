import data from "./names.json" with { type: "json" };

const names = data as Record<string, string[]>;

const nameToDate = new Map<string, string>();
for (const [date, dateNames] of Object.entries(names)) {
	for (const name of dateNames) {
		nameToDate.set(name.toLowerCase(), date);
	}
}

/**
 * Get names as a string for the given date
 * @param date
 */
export function getNameDay(date: Date): string[] {
	const key = `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
	return names[key] ?? [];
}

/**
 * Get the date (MM-DD) when the given name has its name day
 * @param name - Czech first name (case-insensitive)
 * @returns date string in MM-DD format, or null if not found
 */
export function getDateByName(name: string): string | null {
	return nameToDate.get(name.toLowerCase()) ?? null;
}
