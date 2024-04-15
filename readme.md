# Name Days (cs)

[![NPM Downloads](https://img.shields.io/npm/dm/namedays-cs?style=for-the-badge)](https://www.npmjs.com/package/namedays-cs)
[![NPM Version](https://img.shields.io/npm/v/namedays-cs?style=for-the-badge)](https://www.npmjs.com/package/namedays-cs)
[![NPM License](https://img.shields.io/npm/l/namedays-cs?style=for-the-badge)](https://github.com/OzzyCzech/namedays-cs/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/OzzyCzech/namedays-cs?style=for-the-badge)](https://github.com/OzzyCzech/namedays-cs/commits/main)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/OzzyCzech/namedays-cs/main.yml?style=for-the-badge)](https://github.com/OzzyCzech/namedays-cs/actions)

Super simple library for getting Czech name days for a given date.

## Functions

All functions are available in the main module. You can import them like this:

```javascript
import * as namedays from 'namedays-cs';
```

## Name days

There are basically two functions for getting name days.
The first one returns a **string** of name days separated by
`a` letter. The second one returns an **array** of name days.

```javascript
import {getNameDay, getNameDayArray} from 'namedays-cs';

const date = new Date(2024, 11, 24); // 24. december 2024

// String of name days
getNameDay(date); // Adam a Eva
getNameDay(date, ', '); // Adam, Eva

// Array of name days
getNameDayArray(date); // ['Adam', 'Eva']
```

It is possible that there are no name days for a given date:

```javascript
import {getNameDay, getNameDayArray} from 'namedays-cs';

const date = new Date(2024, 11, 25); // 25. december 2024

getNameDay(date); // '' (empty string)
getNameDayArray(date); // [] (empty array)
```

## License

MIT