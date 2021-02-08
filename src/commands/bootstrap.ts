import {
  CloudFormationClient,
  CreateChangeSetCommand,
  ExecuteChangeSetCommand,
  DescribeStacksCommand,
} from '@aws-sdk/client-cloudformation'
import {Command, flags} from '@oclif/command'
const {fromIni} = require('@aws-sdk/credential-provider-ini')
import * as fs from 'fs'
import * as path from 'path'

export default class Bootstrap extends Command {
  static stackName = 'CyclicAppManagementStack'

  static notificationArn = 'arn:aws:sns:us-east-2:758562997317:test-cloudformation-notification'

  static description = `Will create ${Bootstrap.stackName} stack in your AWS account.`

  static examples = [
    `$ cyclic bootstrap --profile $PROFILE
* Checking AWS account for bootstrapping
* Creating CfN stack: ${Bootstrap.stackName}
* Provisioning ...
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    profile: flags.string({char: 'p', description: 'aws credential profile (defaults to default)'}),
  }

  static args = []

  async run() {
    const logger = this.log
    const {flags} = this.parse(Bootstrap)

    const profile = flags.profile ?? 'default'

    const cfn = new CloudFormationClient({
      // region: REGION, // 'us-east-2'
      credentials: fromIni({profile: profile}),
    })

    // let stack:Stack|string

    // const stack: Stack | '' = ''
    let exists = true

    logger('* Checking AWS account for bootstrapping')
    try {
      const data = await cfn.send(new DescribeStacksCommand({
        StackName: Bootstrap.stackName,
      }))
      logger(JSON.stringify(data.Stacks?.pop()?.Outputs))
    } catch (error) {
      // const { requestId, cfId, extendedRequestId } = error.$metadata;
      // console.log({ requestId, cfId, extendedRequestId });
      logger(error)
      exists = false
    }

    const nowInMs = Date.now()
    // fs.readFileSync(path.join(__dirname, '../templates') + '/my-template.html', 'utf8');
    const templateBody = fs.readFileSync(path.join(__dirname, '/bootstrap-template.yaml'), 'utf-8')

    const changeSet = await cfn.send(new CreateChangeSetCommand({
      ChangeSetName: `ChangeSetAsOf-${nowInMs}`,
      StackName: Bootstrap.stackName,
      Capabilities: ['CAPABILITY_NAMED_IAM'],
      ChangeSetType: (exists) ? 'UPDATE' : 'CREATE',
      Description: `Cyclic Apps Bootstrap stack with latest and greatest as of: ${nowInMs}`,
      NotificationARNs: [Bootstrap.notificationArn],
      Parameters: [],
      Tags: [
        {Key: 'cyclic.source', Value: 'cli:v0.0.3'}, // TODO: how do we inject version?
        {Key: 'cyclic.commit', Value: '55eee80'},
      ],
      TemplateBody: templateBody,
    }))

    logger(changeSet.toString())

    setTimeout(async () => {
      const execChangeSetResult = await cfn.send(new ExecuteChangeSetCommand({
        ChangeSetName: changeSet.Id,
      }))
      logger(execChangeSetResult.toString())
    }, 3000) // TODO probably wanna check that the change set is ready
  }
}
