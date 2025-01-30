import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "ShadeMaker",
        short_name: "ShadeMake.",
        description:
          "ShadeMaker is a color shade generator that empowers designers and developers to create and customize a wide range of color shades and schemes for their projects.",
        theme_color: "#385cfa",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
    Sitemap({
      hostname: "https://mfm-347.github.io/shademaker/",
      changefreq: "weekly",
      generateRobotsTxt: true,
    }),
  ],
  base: "/shademaker/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
