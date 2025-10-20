# Assignment 8 — Demo Application

A Vite-powered web app styled with Tailwind CSS. Includes production build via Vite.

## Tech Stack
- Vite (build/dev server)
- Tailwind CSS v4
- PostCSS (+ @tailwindcss/postcss)

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
npm i
```

## Scripts
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Tailwind v4 setup (PostCSS)
- Install dev deps:
```bash
npm i -D tailwindcss@^4 @tailwindcss/postcss
```
- PostCSS config should use the new plugin:
```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```
- Import Tailwind in your entry CSS:
```css
@import "tailwindcss";
```

## Asset Usage (Images & Logo)

- For images in `src/assets/`, always use:
  ```js
  const imgUrl = new URL('../assets/your-image.png', import.meta.url).href;
  <img src={imgUrl} alt="..." />
  ```
- For images in `public/`, use `/your-image.png`.

## Netlify SPA Routing

To support client-side routing (refresh on any route), add a file:
```
public/_redirects
```
with this content:
```
/* /index.html 200
```
This ensures all routes serve your SPA.

## Troubleshooting
- PostCSS plugin moved warning:
  - Install `@tailwindcss/postcss` and use it in `postcss.config.js`.
  - Ensure your CSS uses `@import "tailwindcss";`.
- Large bundle warning:
  - Use dynamic `import()` to lazy-load heavy routes.
  - Configure `build.rollupOptions.output.manualChunks` in Vite.
  - Adjust `build.chunkSizeWarningLimit` if needed.