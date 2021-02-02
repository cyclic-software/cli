import {CloudFormationClient, DescribeStacksCommand, Stack} from '@aws-sdk/client-cloudformation'
import {Command, flags} from '@oclif/command'
const {fromIni} = require('@aws-sdk/credential-provider-ini')

// const axios = require('axios').default;

export default class InitApp extends Command {
  static description = 'Will initialize the an application in the AWS account you are credentialed against.'

  static examples = [
    `$ cyclic init-app --name $NAME --profile $PROFILE
* Checking AWS account for bootstrapping
* Checking AWS account for required roles
* Creating Cyclic App: $NAME
* Provisioning AWS pipeline resources
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'application name (defaults to random string)'}),
    profile: flags.string({char: 'p', description: 'aws credential profile (defaults to default)'}),
  }

  // static args = [{name: '-n awesome-app-name'}]
  static args = []

  async run() {
    const logger = this.log
    // const {args, flags} = this.parse(InitApp)
    const {flags} = this.parse(InitApp)

    const name = flags.name ?? 'second-default-string'
    const profile = flags.profile ?? 'default'
    // const roleArn = ''
    // const roleSecret = ''

    // Set the AWS profile and client params
    const cfn = new CloudFormationClient({
      // region: REGION, // 'us-east-2'
      credentials: fromIni({profile: profile}),
    })

    // let stack:Stack|string

    let stack: Stack | '' = ''

    logger('* Checking AWS account for bootstrapping')
    try {
      const data = await cfn.send(new DescribeStacksCommand({
        StackName: 'CyclicBootstrapStack',
      }))
      const stacks: Stack[] = data?.Stacks ?? []

      stacks.forEach((s: Stack) => {
        logger(JSON.stringify(s))
        logger(JSON.stringify(s.Outputs))
      })
      stack = stacks.pop() ?? ''
      // logger(stacks[0]?.Outputs ?? '':String);
    } catch (error) {
      logger('Error you probably need a bootstrap stack', error)
      return
    }

    logger('* Checking AWS account for required roles')
    logger(`* Creating Cyclic App: ${name}`)
    logger('* Provisioning AWS pipeline resources')

    if (stack !== '') {
      const bucketName = stack.Outputs?.find(o => o.OutputKey === 'BucketName')?.OutputValue
      const roleArn = stack.Outputs?.find(o => o.OutputKey === 'RoleArn')?.OutputValue
      const stackId = stack.StackId
      const stackName = stack.StackName

      logger(`  bucketName[${bucketName}]\n  roleArn[${roleArn}]\n  stackId[${stackId}]\n  stackName[${stackName}]`)

      // axios.post('https://api.cyclic.sh/v1/app/', {
      //   axios.post('https://5lyarx6bgf.execute-api.us-east-2.amazonaws.com/app', {
      //       name: name,
      //       stackName: stackName,
      //       stackId: stackId,
      //       roleArn: roleArn,
      //       bucketName: bucketName,
      //     })
      //     .then((res) => {
      //       logger(res.status?.toString())
      //       logger(res.data)
      //       logger(res.headers);
      //     })
      //     .catch((err) => {
      //       logger(`API end-point error for init-app [${name}].`);
      //       logger(err);
      //     }
      //   );
    }
  }
}
