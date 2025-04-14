// import path from "path"
// import react from "@vitejs/plugin-react"
// import eslint from 'vite-plugin-eslint';
// import { defineConfig } from "vite"

// export default defineConfig({
//   plugins: [react(),eslint()],
//   assetsInclude: ['**/*.lottie'],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })
import path from "path";
import react from "@vitejs/plugin-react";
// @ts-ignore
import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    // eslint(),
    process.env.NODE_ENV === 'development' ? eslint() : undefined, // Apply eslint only in dev
    visualizer({
      open: true, // Automatically opens the report in browser
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  assetsInclude: ["**/*.lottie"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
