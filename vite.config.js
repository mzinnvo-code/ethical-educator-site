import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change this to '/' if you're using a custom domain (e.g. examinedclassroom.com)
  // Keep it as '/<repo-name>/' only if you're using the default github.io/<repo-name> URL
base: '/',
  build: {
    rollupOptions: {
      output: {
        // gsap/three are only reachable through dynamic import() in the
        // landing engine — naming them keeps each in its own cacheable chunk
        // instead of merging into whichever lazy chunk imports them first.
        manualChunks(id) {
          if (id.includes("node_modules/three/")) return "vendor-three";
          if (id.includes("node_modules/gsap/")) return "vendor-gsap";
        },
      },
    },
  },
})
