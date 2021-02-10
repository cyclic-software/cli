import {CloudFormationClient, DescribeStacksCommand, Stack} from '@aws-sdk/client-cloudformation'
import {STSClient, Credentials, AssumeRoleCommand, AssumeRoleCommandInput} from '@aws-sdk/client-sts'
import {Command, flags} from '@oclif/command'
const {fromIni} = require('@aws-sdk/credential-provider-ini')
import * as fs from 'fs'
import * as path from 'path'
const axios = require('axios').default

import {uniqueNamesGenerator, Config, adjectives, colors, animals} from 'unique-names-generator'

const genConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: '-',
  length: 2,
}

export default class InitApp extends Command {
  static description = 'Will initialize the an application in the AWS account you are credentialed against.'

  static examples = [
    `$ cyclic init-app --name $APP_NAME --profile $PROFILE
* Checking AWS account for bootstrapping
* Checking AWS account for required roles
* Creating Cyclic App: $APP_NAME
* Provisioning AWS pipeline resources
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'application name (defaults to random words)'}),
    profile: flags.string({char: 'p', description: 'aws credential profile (defaults to default)'}),
    api: flags.string({char: 'a', description: 'url to base of cyclic api for requests (default https://api.cyclic.sh/v1)'}),
    debug: flags.boolean({char: 'd', description: 'print debugging output'}),
  }

  // static args = [{name: '-n awesome-app-name'}]
  static args = []

  trace = false;

  authenticated(exit_on_not = true) {
    try {
      const auth = JSON.parse(fs.readFileSync(path.join(this.config.dataDir, 'config.json'), 'utf-8'))
      return auth
    } catch (error) {
      this.log(`Unable to find proof of authentication in ${this.config.dataDir}.\n\nTry logging in:\n  % cyclic login`)
      if (exit_on_not) {
        this.exit(1)
      }
    }
  }

  async assumeRoleForCredentials(sourceCreds: Credentials, params: AssumeRoleCommandInput): Promise<Credentials> {
    // no idea why we have to implement this ourselves.
    const sts = new STSClient(sourceCreds)
    const res = await sts.send(new AssumeRoleCommand(params))
    if (!res.Credentials) {
      throw new Error('Unable to assume role from profile - empty credential object')
    }
    return res.Credentials
  }

  async bootstrapped(profile = 'default'): Promise<{
    roleArn: string; bucketName: string; stackName: string;}|undefined> {
    const logger = this.log
    const cfn = new CloudFormationClient({
      // region: REGION, // 'us-east-2'
      credentials: fromIni({
        profile: profile,
        roleAssumer: this.assumeRoleForCredentials,
      }),
    })

    let stack: Stack | '' = ''

    logger('* Checking AWS account for bootstrapping stack')
    try {
      const data = await cfn.send(new DescribeStacksCommand({
        StackName: 'CyclicAppManagementStack',
      }))
      const stacks: Stack[] = data?.Stacks ?? []

      // stacks.forEach((s: Stack) => {
      //   logger(JSON.stringify(s))
      //   logger(JSON.stringify(s.Outputs))
      // })
      stack = stacks.pop() ?? ''
    } catch (error) {
      (this.trace) ? logger(error.stack) : ''
      logger('Unable to find a bootstrap stack.\n\nTry running bootstrap:\n  % cyclic bootstrap')
      this.exit(1)
    }

    if (stack !== '') {
      const bucketName = stack.Outputs?.find(o => o.OutputKey === 'BucketName')?.OutputValue
      const roleArn = stack.Outputs?.find(o => o.OutputKey === 'RoleArn')?.OutputValue
      // const stackId = stack.StackId
      const stackName = stack.StackName

      // logger(`  bucketName[${bucketName}]\n  roleArn[${roleArn}]\n  stackId[${stackId}]\n  stackName[${stackName}]`)

      return {
        roleArn: roleArn || '',
        bucketName: bucketName || '',
        stackName: stackName || '',
      }
    }
  }

  async run() {
    const logger = this.log
    // const {args, flags} = this.parse(InitApp)
    const {flags} = this.parse(InitApp)

    const app_name = flags.name ?? uniqueNamesGenerator(genConfig)
    const profile = flags.profile ?? 'default'
    const api_url = flags.api ?? 'https://api.cyclic.sh/v1'
    this.trace = flags.debug ?? false
    // const roleArn = ''
    // const roleSecret = ''

    this.authenticated()

    const res = await this.bootstrapped(profile)

    logger(res?.roleArn, res?.bucketName, app_name)

    axios.post(`${api_url}/app/`, {
      appName: app_name,
      stackName: res?.stackName,
      roleArn: res?.roleArn,
      bucketName: res?.bucketName,
    })
    .then((res: any) => {
      logger(res.status?.toString())
      logger(res.data)
      logger(res.headers)
    })
    .catch((error: Error) => {
      logger(`API end-point error for init-app [${app_name}].`)
      logger(error.message, error.stack)
    })
  }
}
