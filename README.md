cyclic-cli
==========

Cyclic cli: your plumbing for the cloud

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cyclic-cli.svg)](https://npmjs.org/package/cyclic-cli)
[![Codecov](https://codecov.io/gh/cyclic-software/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/cyclic-software/cli)
[![Downloads/week](https://img.shields.io/npm/dw/cyclic-cli.svg)](https://npmjs.org/package/cyclic-cli)
[![License](https://img.shields.io/npm/l/cyclic-cli.svg)](https://github.com/cyclic-software/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cyclic-cli
$ cyclic COMMAND
running command...
$ cyclic (-v|--version|version)
cyclic-cli/0.0.0 darwin-x64 node-v15.5.1
$ cyclic --help [COMMAND]
USAGE
  $ cyclic COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cyclic hello [FILE]`](#cyclic-hello-file)
* [`cyclic help [COMMAND]`](#cyclic-help-command)

## `cyclic hello [FILE]`

describe the command here

```
USAGE
  $ cyclic hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ cyclic hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/cyclic-software/cli/blob/v0.0.0/src/commands/hello.ts)_

## `cyclic help [COMMAND]`

display help for cyclic

```
USAGE
  $ cyclic help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_
<!-- commandsstop -->
