import data from './names.json' assert {type: 'json'};

const names = data as Record<string, string[]>;

/**
 * Get names as a string for the given date
 * @param date
 * @param joinWith
 */
export function getNameDay(date: Date, joinWith = ' a '): string {
	return getNameDayArray(date)?.join(joinWith) ?? '';
}

/**
 * Get the key for the given date
 * Key is a string in the format ddMM
 * @param date
 */
function getKey(date: Date): string {
	return date.getDate().toString().padStart(2, '0')
		+ (date.getMonth() + 1).toString().padStart(2, '0');
}

/**
 * Get the names of the name day for the given date
 * @param date
 */
export function getNameDayArray(date: Date): string[] | undefined {
	const day = getKey(date);
	return day in names ? names[day] : [];
}
