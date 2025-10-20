import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { hostname } from 'os'
// https://vite.dev/config/
export default defineConfig({
  server: {
    hostname: '0.0.0.0',
    allowedHosts: ['echo-panda.itedev.online']
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
