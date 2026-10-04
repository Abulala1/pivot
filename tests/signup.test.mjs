import test from 'node:test'
import assert from 'node:assert/strict'
import { prepareSignup } from '../src/lib/signup.ts'

function submission(overrides = {}) {
 const data = new FormData()
 for (const [key,value] of Object.entries({name:'  Jo Rider  ',email:'jo@example.com',city:'  Montréal  ',riderType:'Cyclist',prototypeTesting:'Yes',_gotcha:'',...overrides})) data.set(key,value)
 return data
}
test('normalizes signup values and excludes unexpected fields', () => {
 const result = prepareSignup(submission({admin:'true'}))
 assert.equal(result.ok,true)
 assert.equal(result.data.get('name'),'Jo Rider')
 assert.equal(result.data.get('city'),'Montréal')
 assert.equal(result.data.has('admin'),false)
 assert.equal(result.data.get('_gotcha'),'')
})
test('accepts both rider types and both testing preferences', () => {
 for(const riderType of ['Cyclist','E-scooter rider']) for(const prototypeTesting of ['Yes','No']) assert.equal(prepareSignup(submission({riderType,prototypeTesting})).ok,true)
})
test('rejects missing, excessive, control-character, and malformed values', () => {
 for(const values of [{name:'  '},{city:''},{name:'a'.repeat(101)},{city:'a'.repeat(101)},{email:'a'.repeat(255)+'@example.com'},{email:'bad-address'},{email:'a\n@example.com'},{name:'Jo\u0000Rider'},{city:'New\nYork'},{riderType:'Car driver'},{prototypeTesting:'Maybe'},{_gotcha:'bot data'}]) assert.equal(prepareSignup(submission(values)).ok,false,JSON.stringify(values))
})
test('rejects file data supplied as a text field', () => {
 const data=submission()
 data.set('name',new Blob(['unexpected file']),'name.txt')
 assert.equal(prepareSignup(data).ok,false)
})
