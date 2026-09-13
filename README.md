# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## September 2026 ecosystem rebuild

`src/App.tsx` holds the final pages. `src/prerender.tsx` and `scripts/prerender.mjs` generate complete HTML and page metadata for every route during `npm run build`; browser navigation uses ordinary links. The previous placeholder visuals and unsubstantiated metric/timeline modules were removed. npm and the Vite/Vercel configuration remain in use. Transitive dependency patches resolve the initial audit findings.

Existing routes remain available. /about redirects to /journey and /writing to /evidence on Vercel. Unknown routes return the static 404 page. This repository contains a private Sites review configuration, not a change to the live custom domain. See AUDIT.md for evidence and cutover requirements. Fonts are self-hosted with their OFL license.

Production is static HTML with a small standalone print handler; React remains the authoring and development surface. Self-hosted font files avoid third-party page requests.
