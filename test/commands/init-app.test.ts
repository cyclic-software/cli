import {expect, test} from '@oclif/test'

describe('init-app', () => {
  test
  .stdout()
  .command(['init-app'])
  .it('runs init-app', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['init-app', '--name', 'jeff'])
  .it('runs init-app --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
