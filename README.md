cyclic-cli
==========

Cyclic cli: your plumbing for the cloud

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cyclic-cli.svg)](https://npmjs.org/package/cyclic-cli)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/pre-commit/pre-commit)
[![Downloads/week](https://img.shields.io/npm/dw/cyclic-cli.svg)](https://npmjs.org/package/cyclic-cli)
[![License](https://img.shields.io/npm/l/cyclic-cli.svg)](https://github.com/cyclic-software/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [Development Notes](#development-notes)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cyclic-cli
$ cyclic COMMAND
running command...
$ cyclic (-v|--version|version)
cyclic-cli/0.0.14 darwin-x64 node-v14.15.5
$ cyclic --help [COMMAND]
USAGE
  $ cyclic COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cyclic bootstrap`](#cyclic-bootstrap)
* [`cyclic help [COMMAND]`](#cyclic-help-command)
* [`cyclic init-app`](#cyclic-init-app)
* [`cyclic login`](#cyclic-login)
* [`cyclic token`](#cyclic-token)

## `cyclic bootstrap`

Will create CyclicAppManagementStack stack in your AWS account.

```
USAGE
  $ cyclic bootstrap

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  aws credential profile (defaults to default)

EXAMPLE
  $ cyclic bootstrap --profile $PROFILE
  * Checking AWS account for bootstrapping
  * Creating CfN stack: CyclicAppManagementStack
  * Provisioning ...
```

_See code: [src/commands/bootstrap.ts](https://github.com/cyclic-software/cli/blob/v0.0.14/src/commands/bootstrap.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `cyclic init-app`

Will initialize the an application in the AWS account you are credentialed against.

```
USAGE
  $ cyclic init-app

OPTIONS
  -a, --api=api          url to base of cyclic api for requests (default https://api.cyclic.sh/v1)
  -d, --debug            print debugging output
  -h, --help             show CLI help
  -n, --name=name        application name (defaults to random words)
  -p, --profile=profile  aws credential profile (defaults to default)

EXAMPLE
  $ cyclic init-app --name $APP_NAME --profile $PROFILE
  * Checking AWS account for bootstrapping
  * Checking AWS account for required roles
  * Creating Cyclic App: $APP_NAME
  * Provisioning AWS pipeline resources
```

_See code: [src/commands/init-app.ts](https://github.com/cyclic-software/cli/blob/v0.0.14/src/commands/init-app.ts)_

## `cyclic login`

Will log you into the Cyclic CLI and allow you to make authenticated api calls.

```
USAGE
  $ cyclic login

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

EXAMPLE
  $ cyclic login
```

_See code: [src/commands/login.ts](https://github.com/cyclic-software/cli/blob/v0.0.14/src/commands/login.ts)_

## `cyclic token`

describe the command here

```
USAGE
  $ cyclic token

OPTIONS
  -f, --file=file  file name and path of auth file
  -h, --help       show CLI help
```

_See code: [src/commands/token.ts](https://github.com/cyclic-software/cli/blob/v0.0.14/src/commands/token.ts)_
<!-- commandsstop -->

# Development Notes

## Run Locally
`./bin/run init-app`

## Publish

There is a github action that takes care of that. Just bump version.

`npm version [major | minor | patch]`
