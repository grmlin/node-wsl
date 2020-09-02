# node-wsl

[![build status](https://img.shields.io/travis/grmlin/node-wsl.svg)](https://travis-ci.com/grmlin/node-wsl)
[![code coverage](https://img.shields.io/codecov/c/github/grmlin/node-wsl.svg)](https://codecov.io/gh/grmlin/node-wsl)
[![code style](https://img.shields.io/badge/code_style-eslint-5ed9c7.svg)](https://github.com/eslint/eslint)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/github/license/grmlin/node-wsl.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/node-wsl.svg)](https://npm.im/node-wsl)

> A wrapper for the Windows Subsystem for Linux (WSL) cli

## Install

[wsl][]:

You'll need Windows with WSL 2 to use this library. `node-wsl` uses `wsl.exe` under the hood.

> **⚠️ if Microsoft changes the `wsl.exe` interface with a future update, this package will probly break!**

[npm][]:

```sh
npm install node-wsl
```

[yarn][]:

```sh
yarn add node-wsl
```


## Usage

```js
const { status } = require('node-wsl');

const status = await status();
assert.deepEqual(status, {
    distributions: [
     {
       default: true,
       running: true,
       stopped: false,
       name: 'Ubuntu',
       state: 'Running',
       version: '2',
     },
     {
       default: false,
       running: false,
       stopped: true,
       name: 'kali-linux',
       state: 'Stopped',
       version: '2',
     },
     {
       default: false,
       running: true,
       stopped: false,
       name: 'Debian',
       state: 'Running',
       version: '2',
     },
    ],
    runningDistributions: [
     {
       default: true,
       running: true,
       stopped: false,
       name: 'Ubuntu',
       state: 'Running',
       version: '2',
     },
     {
       default: false,
       running: true,
       stopped: false,
       name: 'Debian',
       state: 'Running',
       version: '2',
     },
    ],
    stoppedDistributions: [
     {
       default: false,
       running: false,
       stopped: true,
       name: 'kali-linux',
       state: 'Stopped',
       version: '2',
     },
    ],
    defaultDistribution: {
     default: true,
     running: true,
     stopped: false,
     name: 'Ubuntu',
     state: 'Running',
     version: '2',
    },
    total: 3,
    running: 2,
    stopped: 1,
});

```


----------------



## API

> ⚠️ **execa does not use a shell by default. So features like variable substitution will not work without specifying a shell**



-------



## Contributors

| Name             | Website                     |
| ---------------- | --------------------------- |
| **Andreas Wehr** | <https://github.com/grmlin> |


## FAQ

* **WSL fails because a path/file was not found**
    That probably if you some form of variable substitution in a path, eg. `~/backup.tar`, without specifying a shell for `execa`. Check the [execa documentation](https://github.com/sindresorhus/execa/blob/master/readme.md#execafile-arguments-options) for a detailed explanation.


## Windows Compatibility

`node-wsl` was tested with the following versions of Windows

| Version | Build     | tested             |
| ------- | --------- | ------------------ |
| 2004    | 19041.450 | :white_check_mark: |


## License

[MIT](LICENSE) © [Andreas Wehr](https://github.com/grmlin)


##

[wsl]: https://docs.microsoft.com/windows/wsl/

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[execa-documentation]: https://github.com/sindresorhus/execa/blob/master/readme.md#execafile-arguments-options "execa documentation"
