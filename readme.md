# React Chip

> Manage a list of chips based on a strings list.

Modified from https://github.com/cjpatolio/react-chip

## Install

**Install with npm**

```sh
$ npm install @astralservices/react-chip
```

**Install with Yarn**

```sh
$ yarn add @astralservices/react-chip
```

## Usage

```jsx
import React from 'react'
import ReactChip from '@astralservices/react-chip'

// basic usage
<ReactChip onChange={chips => {console.log(chips)}} />

// advanced usage
<ReactChip
  defaultChips={[]}
  id=""
  name=""
  labelClass=""
  inputClass=""
  chipClass=""
  focusClass=""
  regex={/([A-Z])\w+/g}
  onChange={(chips) => {
    console.log(chips)
  }}
/>
```

## License

Designed with ♥ by [CJ Patoilo](https://twitter.com/cjpatoilo).

Forked by [Astral Services](https://astralapp.io).

Licensed under the [MIT License](https://github.com/astralservices/react-chip#license).
