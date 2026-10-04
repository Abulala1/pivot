import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Vite development needs inline refresh scripts and WebSockets; restrict production.
const securityPolicy: Plugin = {
 name: 'pivot-security-policy',
 apply: 'build',
 transformIndexHtml: {
  order: 'post',
  handler: () => [{
   tag: 'meta',
   attrs: {
    'http-equiv': 'Content-Security-Policy',
    content: "default-src 'none'; script-src 'self'; style-src 'self'; style-src-attr 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src https://formspree.io; form-action https://formspree.io; base-uri 'none'; object-src 'none'; upgrade-insecure-requests",
   },
   injectTo: 'head-prepend',
  }],
 },
}
export default defineConfig({ plugins: [react(), tailwindcss(), securityPolicy], base: './', server: { host: '127.0.0.1' }, preview: { host: '127.0.0.1' } })
