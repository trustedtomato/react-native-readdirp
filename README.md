# react-native-readdirp

Recursive, React Native version of fs.readdirp.

## Installation

`react-native-fs` is a peer dependency, you'll have to [install that](https://www.npmjs.com/package/react-native-fs) first!
After that, no more setup is needed than just installing the package:

```sh
npm install react-native-readdirp
```

## Usage

```js
import fs from 'react-native-fs';
import readdirp from 'react-native-readdirp';

const uri = fs.ExternalStorageDirectoryPath;

readdirp(uri).forEach(file => {
  console.log(file.path);
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
