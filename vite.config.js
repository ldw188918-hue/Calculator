import { defineConfig } from 'vite';

export default defineConfig({
    base: '/Calculator/',
    root: './',
    build: {
        outDir: 'dist',
        minify: 'terser',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
});
