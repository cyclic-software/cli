import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import * as path from 'path'

export default class Token extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    file: flags.string({char: 'f', description: 'file name and path of auth file'}),
  }

  async run() {
    const {flags} = this.parse(Token)

    const fileName = flags.file ?? path.join(this.config.configDir, 'config.json')

    try {
      const auth = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
      this.log(`Examples:
curl -i -XPOST https://api.endpoint.example.com \\
  --data '{"jawn":"dis nd dat","names":["alice","bob","cindy"]}' \\
  --header 'Content-Type: application/json' \\
  --header 'Authorization: Bearer ${auth.id_token}'
`)
    } catch (error) {
      this.log('Try logging in first.\n\n % cyclic login\n')
    }
  }
}
