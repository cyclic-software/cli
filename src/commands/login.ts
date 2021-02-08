/* eslint-disable no-console, camelcase */

import {Issuer} from 'openid-client'
import * as open from 'open'
import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import * as path from 'path'

const ISSUER = 'https://cyclic.us.auth0.com'
const GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:device_code'

export default class Bootstrap extends Command {
  static description = 'Will log you into the Cyclic CLI and allow you to make authenticated api calls.'

  static examples = [
    '$ cyclic login',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    try {
      const issuer = await Issuer.discover(ISSUER)
      // console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);

      const client = new issuer.Client({
        grant_types: [GRANT_TYPE],
        client_id: 'oeqSBxxA9a0nfHkXwzuorkOxcYhEj7SC',
        response_types: [],
        redirect_uris: [],
        token_endpoint_auth_method: 'none',
        application_type: 'native',
        scope: 'openid email profile',
      })
      // console.log('client registered')

      console.log('dataDir:  ' + this.config.dataDir)
      console.log('cacheDir: ' + this.config.cacheDir)

      const handle = await client.deviceAuthorization()

      console.log(`You are being redirected to your browser to authenticate.\n User Code: ${handle.user_code}`)
      // console.log('Verification URI: ', handle.verification_uri);
      // console.log('Verification URI (complete): ', handle.verification_uri_complete);

      await open(handle.verification_uri_complete, {wait: false})
      // console.log('opened browser')

      const tokenSet = await handle.poll()

      try {
        fs.mkdirSync(this.config.dataDir)
      } catch (error) {
        console.log(error)
      }

      fs.writeFileSync(path.join(this.config.dataDir, 'config.json'), JSON.stringify(tokenSet))

      // console.log('got', tokenSet);
      // console.log('id token claims', tokenSet.claims());

      const userinfo = await client.userinfo(tokenSet)
      console.log('userinfo', userinfo)
    } catch (error) {
      console.log(error)
    }
  }
}

// got TokenSet {
//   access_token: '1hH...3rF',
//   id_token: 'eyJ...ncw',
//   scope: 'openid',
//   expires_at: 1612902486,
//   token_type: 'Bearer'
// }
// id token claims {
//   iss: 'https://cyclic.us.auth0.com/',
//   sub: 'auth0|602...d9c',
//   aud: 'oeq...7SC',
//   iat: 1612816086,
//   exp: 1612852086
// }
// userinfo { sub: 'auth0|602...d9c' }
