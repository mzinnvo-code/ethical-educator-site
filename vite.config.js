import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change this to '/' if you're using a custom domain (e.g. theethicaleducator.com)
  // Keep it as '/<repo-name>/' only if you're using the default github.io/<repo-name> URL
  base: '/',
})
