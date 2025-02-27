//Vite
import { defineConfig } from 'vite'

//React
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4510
  }
})
