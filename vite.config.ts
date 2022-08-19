import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// });

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/components/index.ts"),
      name: "jsme-vue",
      fileName: (format) => `jsme-vue.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue()],
});
