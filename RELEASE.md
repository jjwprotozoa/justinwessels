# Release handoff

Three independent builds. Kids Call Home is unchanged; no product checkout or write/deployment operation was performed.

## Justin
Original provider: Vercel, repository jjwprotozoa/justinwessels, master. Review branch codex/ecosystem-rebuild. Build: npm ci, npm run build. Public output: dist. Existing six routes preserved; /about -> /journey and /writing -> /evidence permanent redirects configured; dedicated 404.

## Fluid
Original provider: GitHub Pages, jjwprotozoa/fldinvgrp, main, root. Review branch codex/ecosystem-rebuild. Plain static source, CNAME and legal URLs retained. A root .nojekyll enables native directory routes. dist is a private review mirror; run python3 sync-preview.py after edits. PDF and HTML capability statements both include active SAM expiry February 15, 2027. No federal awards claimed.

## Axis
New standalone static source, public output dist. Existing .co.za forwards to the Hostinger .com site. Deployment to .co.za requires domain/forwarding changes; .com remains outside this build's write scope. Preserve /swartland-digital-services. Before changing forwarding, confirm ownership and coordinate any authorized .com redirects to avoid competing canonicals.

## Verification
Static HTML, schema, metadata and all local navigation/asset references tested. Browser checks cover desktop/tablet/mobile layouts and enquiry draft preparation. No enquiry was sent. The PDF is one visually inspected page; HTML equivalent remains available. Search research is qualitative; no Search Console, paid keyword-volume data, conversion analytics or field Core Web Vitals data was available.

## Cutover
Private Sites previews are separate from public domains. Before release, verify provider preview and redirects, then approve/merge the reviewed source for Justin and Fluid. Axis needs an authorized .co.za hosting/DNS connection. After cutover inspect domain certificate, each canonical URL, 404 responses, sitemap/robots and email links. Submit sitemaps to the existing Search Console properties if access is supplied. Keep the previous deployment available for rollback. Do not change kidscallhome.com or any Kids Call Home application configuration.
