import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
        cssInjectedByJsPlugin() // for adding css to javascript directly otherwise it currently gets ignored
    ],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/lib/index.tsx'),
            name: 'react-fullscreen-carousel',
            // the proper extensions will be added
            fileName: 'react-fullscreen-carousel',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['react', 'react-dom'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                },
            },
        },
    },
})
