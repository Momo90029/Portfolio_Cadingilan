import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import express from "express";
import polishRoute from "./server/polish.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
    base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }

});

