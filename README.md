cyclic-cli
==========

Cyclic cli: your plumbing for the cloud

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cyclic-cli.svg)](https://npmjs.org/package/cyclic-cli)
[![Codecov](https://codecov.io/gh/cyclic-software/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/cyclic-software/cli)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/pre-commit/pre-commit)
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
cyclic-cli/0.0.3 darwin-x64 node-v15.5.1
$ cyclic --help [COMMAND]
USAGE
  $ cyclic COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cyclic help [COMMAND]`](#cyclic-help-command)
* [`cyclic init-app`](#cyclic-init-app)

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

## `cyclic init-app`

Will initialize the an application in the AWS account you are credentialed against.

```
USAGE
  $ cyclic init-app

OPTIONS
  -h, --help             show CLI help
  -n, --name=name        application name (defaults to random string)
  -p, --profile=profile  aws credential profile (defaults to default)

EXAMPLE
  $ cyclic init-app --name $NAME --profile $PROFILE
  * Checking AWS account for bootstrapping
  * Checking AWS account for required roles
  * Creating Cyclic App: $NAME
  * Provisioning AWS pipeline resources
```

_See code: [src/commands/init-app.ts](https://github.com/cyclic-software/cli/blob/v0.0.3/src/commands/init-app.ts)_
<!-- commandsstop -->

# Development Notes

## Run Locally
`./bin/run init-app`
