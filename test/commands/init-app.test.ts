import {test} from '@oclif/test'

describe('init-app', () => {
  test
  .command(['init-app'])
  .exit(1)
  .it('exits non-zero when not logged in')
})
