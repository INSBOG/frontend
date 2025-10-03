import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000/api', // Dirección del servidor al que deseas redirigir
        changeOrigin: true,             // Cambia el encabezado "Origin" de la solicitud para coincidir con el del servidor
        rewrite: (path) => path.replace(/^\/api/, ''), // Opcional: reescribe la URL eliminando el prefijo /api
      },
    },
  },
})
