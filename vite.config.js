// vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig(({ command }) => ({
//   // base: command === 'serve' ? '/' : '/assets/',  // '/' for dev, '/assets/' for build
//     base: command === 'serve' ? '/' : '',  // empty string for production

//   plugins: [react(), tailwindcss()],
//   build: {
//     outDir: 'dist',
//     assetsDir: '',
//   }
// }))
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/', // no /assets/ prefix
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: '', // put JS/CSS/images at root of dist
  }
}))
