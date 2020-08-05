# node-wsl

[![build status](https://img.shields.io/travis/com/grmlin/node-wsl.svg)](https://travis-ci.com/grmlin/node-wsl)
[![code coverage](https://img.shields.io/codecov/c/github/grmlin/node-wsl.svg)](https://codecov.io/gh/grmlin/node-wsl)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/grmlin/node-wsl.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/node-wsl.svg)](https://npm.im/node-wsl)

> A wrapper for the Windows Subsystem for Linux (WSL) cli


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

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
const NodeWsl = require('node-wsl');

const nodeWsl = new NodeWsl();

console.log(nodeWsl.renderName());
// script
```


## Contributors

| Name             | Website                     |
| ---------------- | --------------------------- |
| **Andreas Wehr** | <https://github.com/grmlin> |


## License

[MIT](LICENSE) © [Andreas Wehr](https://github.com/grmlin)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
