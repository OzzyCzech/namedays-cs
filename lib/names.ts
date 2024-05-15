import data from './names.json' with {type: 'json'};

const names = data as Record<string, string[]>;

/**
 * Get names as a string for the given date
 * @param date
 */
export function getNameDay(date: Date): string[] {
	const key = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;
	return names[key] ?? [];
}
