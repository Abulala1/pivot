import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const html = fs.readFileSync('dist/index.html', 'utf8')
const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1]?.replaceAll('&#39;', "'").replaceAll('&apos;', "'")
assert.ok(policy, 'Production content policy is missing')
for (const directive of ["default-src 'none'", "script-src 'self'", "style-src 'self'", "font-src 'self'", 'connect-src https://formspree.io', "base-uri 'none'", "object-src 'none'"]) assert.ok(policy.includes(directive), `Missing policy directive: ${directive}`)
assert.ok(!policy.includes('unsafe-eval'), 'Do not allow script evaluation')
assert.ok(!/script-src[^;]*unsafe-inline/.test(policy), 'Do not allow inline scripts')
assert.ok(!/<script\b[^>]*>\s*[^<\s]/.test(html), 'Unexpected inline script')
assert.ok(html.includes('strict-origin-when-cross-origin'), 'Referrer policy missing')
assert.ok(!fs.readdirSync('dist').some(file => file.startsWith('.env')), 'Environment file published')

const resources = [...html.matchAll(/(?:src|href)="(\.\/assets\/[^"?#]+)"/g)].map(match => match[1])
assert.ok(resources.length >= 2, 'Built JS and CSS missing')
for (const resource of resources) {
 const file = path.join('dist', resource)
 assert.ok(fs.existsSync(file), `Missing asset: ${resource}`)
 if (file.endsWith('.css')) {
  const css = fs.readFileSync(file, 'utf8')
  assert.ok(!/https?:\/\/fonts\./.test(css), 'Unexpected remote font service')
  const fonts = [...css.matchAll(/url\((?:["'])?(\.\/[^)"']+\.woff2)(?:["'])?\)/g)].map(match => match[1])
  assert.equal(fonts.length, 2, 'Expected only the two local fonts')
  for (const font of fonts) assert.ok(fs.existsSync(path.join(path.dirname(file), font)), `Missing font: ${font}`)
 }
}
const workflow = fs.readFileSync('.github/workflows/deploy.yml', 'utf8')
const actions = [...workflow.matchAll(/uses:\s+([^\s]+)/g)].map(match => match[1])
assert.equal(actions.length, 5)
for (const action of actions) assert.match(action, /^actions\/[a-z-]+@[a-f0-9]{40}$/, 'Action must use an immutable SHA')
assert.ok(workflow.includes('persist-credentials: false'))
console.log('Production policy, local assets, fonts, environment exclusions, and action pins verified.')
