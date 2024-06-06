# Name Days (cs)

[![NPM Downloads](https://img.shields.io/npm/dm/namedays-cs?style=for-the-badge)](https://www.npmjs.com/package/namedays-cs)
[![NPM Version](https://img.shields.io/npm/v/namedays-cs?style=for-the-badge)](https://www.npmjs.com/package/namedays-cs)
[![NPM License](https://img.shields.io/npm/l/namedays-cs?style=for-the-badge)](https://github.com/OzzyCzech/namedays-cs/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/OzzyCzech/namedays-cs?style=for-the-badge)](https://github.com/OzzyCzech/namedays-cs/commits/main)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/OzzyCzech/namedays-cs/main.yml?style=for-the-badge)](https://github.com/OzzyCzech/namedays-cs/actions)

Simple library to get Czech name days (`jmeniny`, `svátek`) for a given date.

## Functions

You can import the whole module or just specific functions:

```javascript
import * as namedays from 'namedays-cs';
import {getNameDay} from 'namedays-cs';
```

## Getting Name Days

You can get name days for a given date:

```javascript
import {getNameDay} from 'namedays-cs';

const date = new Date(2024, 11, 24); // 24. december 2024

// Get name days for a given date
getNameDay(date); // ['Adam', 'Eva']
getNameDay(date).join(' a '); // Adam a Eva
```

It is possible that there are no name days for a given date:

```javascript
import {getNameDay, getNameDayArray} from 'namedays-cs';

const date = new Date(2024, 11, 25); // 25. december 2024

getNameDay(date); // [] (empty array)
```

## Credits

- [Jmeniny v Česku](https://cs.wikipedia.org/wiki/Jmeniny_v_%C4%8Cesku)

## License

MIT