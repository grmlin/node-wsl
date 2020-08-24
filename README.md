# node-wsl

[![build status](https://img.shields.io/travis/grmlin/node-wsl.svg)](https://travis-ci.com/grmlin/node-wsl)
[![code coverage](https://img.shields.io/codecov/c/github/grmlin/node-wsl.svg)](https://codecov.io/gh/grmlin/node-wsl)
[![code style](https://img.shields.io/badge/code_style-eslint-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/grmlin/node-wsl.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/node-wsl.svg)](https://npm.im/node-wsl)

> A wrapper for the Windows Subsystem for Linux (WSL) cli


## Table of Contents

- [node-wsl](#node-wsl)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
  - [API](#api)
    - [status()](#status)
    - [run(command[, args [, options]])](#runcommand-args--options)
    - [exportDistribution(distribution, fileName[, options])](#exportdistributiondistribution-filename-options)
    - [importDistribution(distribution, installLocation, fileName[, args[, options]])](#importdistributiondistribution-installlocation-filename-args-options)
    - [list([args[, options]])](#listargs-options)
    - [setDefault(distribution[, options])](#setdefaultdistribution-options)
    - [setDefaultVersion(version[, options])](#setdefaultversionversion-options)
    - [setVersion(distribution, version[, options])](#setversiondistribution-version-options)
    - [shutdown([options])](#shutdownoptions)
    - [terminate(distribution[, options])](#terminatedistribution-options)
    - [unregister(distribution[, options])](#unregisterdistribution-options)
    - [wsl(args[, options])](#wslargs-options)
  - [Contributors](#contributors)
  - [FAQ](#faq)
  - [Windows Compatibility](#windows-compatibility)
  - [License](#license)
  - [](#)


## Install

[wsl][]:

You'll need Windows with WSL 2 to use this library. `node-wsl` uses `wsl.exe` under the hood.

> **:warning: if Microsoft changes the `wsl.exe` interface with a future update, this package will probly break!**

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
assert.deepEqual(status, [
  {
    name: 'Debian',
    state: 'Running',
    version: '2',
    isDefault: true,
    isRunning: true,
    isStopped: false
  },
  {
    name: 'kali-linux',
    state: 'Stopped',
    version: '2',
    isDefault: false,
    isRunning: false,
    isStopped: true
  },
  {
    name: 'Ubuntu',
    state: 'Stopped',
    version: '2',
    isDefault: false,
    isRunning: false,
    isStopped: true
  }
]);

```


----------------



## API

> :warning: **execa does not use a shell by default. So features like variable substitution will not work without specifying a shell**



### status()

`async`

Utility function to get a processed list of distributions currently installed. It parses the output of  `wsl.exe --list --verbose --all`.
Not ideal, but there is currently no other way to get a list of wsl distros used in Windows.

**Returns**: `Promise` that resolves an array of distribution status objects

```javascript
{
  name: String,
  state: String,
  version: String,
  isDefault: Boolean,
  isRunning: Boolean,
  isStopped: Boolean,
}
```

#### Usage

```javascript
const assert = require('assert').strict;
const { status } = require('node-wsl');

const status = await status();
const rawList = await list({
  all: true,
  verbose: true
});
// 'wsl.exe --list --verbose --all'

console.log(rawList.stdout);
/**
 *     NAME                   STATE           VERSION
 *   * Debian                 Running         2
 *     kali-linux             Stopped         2
 *     Ubuntu                 Stopped         2
 */
assert.deepEqual(status, [
  {
    name: 'Debian',
    state: 'Running',
    version: '2',
    isDefault: true,
    isRunning: true,
    isStopped: false
  },
  {
    name: 'kali-linux',
    state: 'Stopped',
    version: '2',
    isDefault: false,
    isRunning: false,
    isStopped: true
  },
  {
    name: 'Ubuntu',
    state: 'Stopped',
    version: '2',
    isDefault: false,
    isRunning: false,
    isStopped: true
  }
]);
```



### run(command[, args [, options]])

`async`

Run a command inside a distro with `wsl.exe`

| parameter           | type     | default | description                                                                      |
| ------------------- | -------- | ------- | -------------------------------------------------------------------------------- |
| `command`           | string   |         | The command to execute inside the targeted wsl distribution                      |
| `args`              | [object] | `{}`    | arguments passed to `wsl.exe`                                                    |
| `args.distribution` | [string] |         | Run the specified distribution. If missing the default distribution will be used |
| `args.user`         | [string] |         | Run as the specified user                                                        |
| `options`           | [object] | `{}`    | options passed to `execa`                                                        |

**Returns**: [Promise / `child_process`][execa-documentation] from execa

#### Usage

```javascript
const { run } = require('node-wsl');

let uptime = await run('uptime'); 
// "wsl.exe uptime"
console.log(uptime.stdout); 
// 10:26:19 up 2 days,  1:43,  0 users,  load average: 1.50, 1.54, 0.77

uptime = await run('uptime', { distribution: 'Debian', user: 'root' }); 
//  'wsl.exe --distribution Debian --user root uptime'
console.log(uptime.stdout); 
// 10:26:19 up 2 days,  1:43,  0 users,  load average: 1.50, 1.54, 0.77
```



### exportDistribution(distribution, fileName[, options])

`async`

Export a distribution into a file

> :heavy_exclamation_mark: exporting a distribution takes time and `wsl.exe` does not report any progress whatsoever

| parameter      | type     | default | description                     |
| -------------- | -------- | ------- | ------------------------------- |
| `distribution` | string   |         | name of the distribution        |
| `fileName`     | [object] | `{}`    | path/filename. Will be a `.tar` |
| `options`      | [object] | `{}`    | options passed to `execa`       |

**Returns**: [Promise / `child_process`][execa-documentation] from execa

#### Usage

```javascript
const { exportDistribution } = require('node-wsl');

const exported = await exportDistribution('Ubuntu', '/home/user/ubuntu.tar'); 
// 'wsl.exe --export Ubuntu /home/user/ubuntu.tar'
```



### importDistribution(distribution, installLocation, fileName[, args[, options]])

`async`

 Imports the specified tar file as a new distribution.

> :heavy_exclamation_mark: importing a distribution takes time and `wsl.exe` does not report any progress whatsoever

| parameter         | type     | default | description                                                                           |
| ----------------- | -------- | ------- | ------------------------------------------------------------------------------------- |
| `distribution`    | string   |         | name of the distribution                                                              |
| `installLocation` | string   |         | location to install the distribution to                                               |
| `fileName`        | string   |         | path to the exported distribution `.tar`. The filename can be "-" for standard input. |
| `args`            | [object] | `{}`    | arguments passed to `wsl.exe`                                                         |
| `args.version`    | [number] |         | version of the new distribution                                                       |
| `options`         | [object] | `{}`    | options passed to `execa`                                                             |

**Returns**: [Promise / `child_process`][execa-documentation] from execa

#### Usage

```javascript
const { importDistribution } = require('node-wsl');

const imported = await importDistribution('Debian', 'path/to/distribution', 'path/to/my/backup.tar'); 
// wsl.exe --import Debian path/to/distribution path/to/my/backup.tar

```



### list([args[, options]])

Lists distributions and informations. This will return plain text from the `wsl.exe` command. Use `wslStatus()` to get a parsed representation of that information.

Some combinations of command line arguments don't work and will throw an error

* `args.running` + `args.all`
* `args.quiet` + `args.verbose`

| parameter      | type      | default | description                                        |
| -------------- | --------- | ------- | -------------------------------------------------- |
| `args`         | [object]  | `{}`    | arguments passed to `wsl.exe`                      |
| `args.all`     | [boolean] |         | List all distributions                             |
| `args.running` | [boolean] |         | List only distributions that are currently running |
| `args.quiet`   | [boolean] |         | shows distribution names only                      |
| `args.verbose` | [boolean] |         | shows detailed distribution informations           |
| `options`      | [object]  | `{}`    | options passed to `execa`                          |

**Returns**: [Promise / `child_process`][execa-documentation] from execa

#### Usage

```javascript
const { list } = require('node-wsl');

const response = await list({
  all: true,
  verbose: true
});
// 'wsl.exe --list --verbose --all'

console.log(response.stdout);
/**
 *     NAME                   STATE           VERSION
 *   * Debian                 Running         2
 *     kali-linux             Stopped         2
 *     Ubuntu                 Stopped         2
 */
```



### setDefault(distribution[, options])

Sets the distribution as the default.

| parameter      | type     | default | description               |
| -------------- | -------- | ------- | ------------------------- |
| `distribution` | string   |         | name of the distribution  |
| `options`      | [object] | `{}`    | options passed to `execa` |

**Returns**: [Promise / `child_process`][execa-documentation] from execa

#### Usage

```javascript
const { setDefault } = require('node-wsl');

await setDefault('Debian'); // Debian should now be the default distribution
```

### setDefaultVersion(version[, options])

Sets the version as the default for all newly installed distributions.

| parameter | type     | default | description               |
| --------- | -------- | ------- | ------------------------- |
| `version` | 1 \| 2   |         | version to set            |
| `options` | [object] | `{}`    | options passed to `execa` |

**Returns**: [Promise / `child_process`][execa-documentation] from execa

#### Usage

```javascript
const { setDefaultVersion } = require('node-wsl');

await setDefaultVersion(2); // the version of newly installed distros will be 2 now
```



### setVersion(distribution, version[, options])

Sets the wsl version of an already installed version.

| parameter      | type     | default | description               |
| -------------- | -------- | ------- | ------------------------- |
| `distribution` | string   |         | name of the distribution  |
| `version`      | 1 \| 2   |         | version to set            |
| `options`      | [object] | `{}`    | options passed to `execa` |

**Returns**: [Promise / `child_process`][execa-documentation] from execa

#### Usage

```javascript
const { setVersion } = require('node-wsl');

await setVersion('Debian', 1); // Debian will use WSL 1 from now on
```



### shutdown([options])

Shuts down all running distribution and the virtual WSL utility machine immediately.

| parameter | type     | default | description               |
| --------- | -------- | ------- | ------------------------- |
| `options` | [object] | `{}`    | options passed to `execa` |

**Returns**: [Promise / `child_process`][execa-documentation] from execa

#### Usage

```javascript
const { shutdown } = require('node-wsl');

await shutdown(); // turn it off already
```



### terminate(distribution[, options])

| parameter      | type     | default | description               |
| -------------- | -------- | ------- | ------------------------- |
| `distribution` | string   |         | name of the distribution  |
| `options`      | [object] | `{}`    | options passed to `execa` |

**Returns**: [Promise / `child_process`][execa-documentation] from execa

#### Usage

```javascript
const { terminate } = require('node-wsl');

await terminate('Debian'); // turn off Debian
```



### unregister(distribution[, options])

Unregister the selected distribution

| parameter      | type     | default | description               |
| -------------- | -------- | ------- | ------------------------- |
| `distribution` | string   |         | name of the distribution  |
| `options`      | [object] | `{}`    | options passed to `execa` |

**Returns**: [Promise / `child_process`][execa-documentation] from execa

#### Usage

```javascript
const { unregister } = require('node-wsl');

await unregister('Debian'); // turn off Debian
```




### wsl(args[, options])

low level wrapper for `wsl.exe` that creates and executes a wsl call using [`execa`](https://github.com/sindresorhus/execa)

**Returns**: [Promise / `child_process`][execa-documentation] from execa




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
