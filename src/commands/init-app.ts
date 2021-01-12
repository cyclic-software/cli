import {CloudFormationClient, DescribeStacksCommand, Stack} from '@aws-sdk/client-cloudformation'
import {Command, flags} from '@oclif/command'
const {fromIni} = require('@aws-sdk/credential-provider-ini')

// const axios = require('axios').default;

export default class InitApp extends Command {
  static description = 'Will initialize the an application in the AWS account you are credentialed against.'

  static examples = [
    `$ cyclic init-app --name=$NAME
* Checking AWS account for bootstrapping
* Checking AWS account for required roles
* Creating Cyclic App: $NAME
* Provisioning AWS pipeline resources
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'application name'}),
  }

  // static args = [{name: '-n awesome-app-name'}]
  static args = []

  async run() {
    const logger = this.log
    // const {args, flags} = this.parse(InitApp)
    const {flags} = this.parse(InitApp)

    const name = flags.name ?? 'second-default-string'
    // const roleArn = ''
    // const roleSecret = ''

    // Set the AWS Region and client params
    const REGION = 'us-east-2'
    const cfn = new CloudFormationClient({
      region: REGION,
      credentials: fromIni({profile: 'default'}),
    })

    logger('* Checking AWS account for bootstrapping')
    const listStacks = async () => {
      try {
        const data = await cfn.send(new DescribeStacksCommand({
          StackName: 'CyclicBootstrapStack',
        }))
        const stacks: Stack[] = data?.Stacks ?? []

        stacks.forEach((s: Stack) => {
          logger(JSON.stringify(s.Outputs))
        })
        // logger(stacks[0]?.Outputs ?? '':String);
      } catch (error) {
        logger('Error you probably need a bootstrap stack', error)
      }
    }
    listStacks()

    logger('* Checking AWS account for required roles')
    logger(`* Creating Cyclic App: ${name}`)
    logger('* Provisioning AWS pipeline resources')

    // axios.post('https://api.cyclic.sh/v1/app/', {
    //   name: name,
    //   roleArn: roleArn,
    //   roleSecret: roleSecret // pragma: allowlist secret
    //   })
    //   .then((response) => {
    //     logger(response);
    //   })
    //   .catch((error) => {
    //     logger(`API end-point error for init-app [${name}].`);
    //     // this.log(error);
    //   }
    // );
  }
}
