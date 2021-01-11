import {Command, flags} from '@oclif/command'

export default class InitApp extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ cyclic init-app
hello world from ./src/init-app.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(InitApp)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from ./src/commands/init-app.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
