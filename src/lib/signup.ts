const riderTypes = new Set(['Cyclist', 'E-scooter rider'])
const testingPreferences = new Set(['Yes', 'No'])
const controls = /[\u0000-\u001f\u007f]/

/** Browser-side quality checks, not a substitute for Formspree's server checks. */
export function prepareSignup(input: FormData): { ok: true; data: FormData } | { ok: false; message: string } {
 const text = (key: string) => {
  const value = input.get(key)
  return typeof value === 'string' ? value.trim() : ''
 }
 const name = text('name')
 const email = text('email')
 const city = text('city')
 const riderType = text('riderType')
 const prototypeTesting = text('prototypeTesting')
 if (text('_gotcha')) return { ok: false, message: 'We couldn’t submit your signup. Please try again.' }
 if (!name || !city || name.length > 100 || city.length > 100 || controls.test(name) || controls.test(city)) {
  return { ok: false, message: 'Please enter a name and city of up to 100 characters each.' }
 }
 if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || controls.test(email)) {
  return { ok: false, message: 'Please enter a valid email address.' }
 }
 if (!riderTypes.has(riderType) || !testingPreferences.has(prototypeTesting)) {
  return { ok: false, message: 'Please select your rider type and testing preference.' }
 }
 // Do not forward arbitrary added form inputs.
 const data = new FormData()
 for (const [key, value] of Object.entries({ name, email, riderType, city, prototypeTesting, _gotcha: '' })) data.set(key, value)
 return { ok: true, data }
}
