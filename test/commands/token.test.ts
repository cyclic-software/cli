import {expect, test} from '@oclif/test'
import * as fs from 'fs'

describe('token', () => {
  test
  .stdout()
  .command(['token'])
  .it('runs token unauthed', ctx => {
    expect(ctx.stdout).to.contain('cyclic login')
  })

  const tempFileName = 'token-test-file.json'
  const tempAuthData = {
    access_token: 'sYfjuetHsKul8tZBt1l-TqziLzZGNQ5T',
    id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZmQmpQS29xUVpYaUFTVG9JS3ZVSSJ9.eyJpc3MiOiJodHRwczovL2N5Y2xpYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjAyMTlhZDE1MzFiNzEwMDZjYjBiZDljIiwiYXVkIjoib2VxU0J4eEE5YTBuZkhrWHd6dW9ya094Y1loRWo3U0MiLCJpYXQiOjE2MTMwNzczNDksImV4cCI6MTYxMzY4MjE0OX0.xyz',
    scope: 'openid',
    expires_at: 1613163749,
    token_type: 'Bearer',
  }

  test
  .do(() => {
    fs.writeFileSync(tempFileName, JSON.stringify(tempAuthData))
  })
  .finally(() => {
    fs.unlinkSync(tempFileName)
  })
  .stdout()
  .command(['token', '--file', 'token-test-file.json'])
  .it('runs token with an auth file', ctx => {
    expect(ctx.stdout).to.contain(`Authorization: Bearer ${tempAuthData.id_token}`)
  })
})
