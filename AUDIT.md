# Ecosystem audit — 11 September 2026

Scope: justinwessels.com, fluidinvestmentgroup.com, axisinnovationgroup.co.za. Kids Call Home is a read-only evidence source. No product checkout, edits, commands or deployments.

## Existing systems and URL preservation
- Justin: github.com/jjwprotozoa/justinwessels, master, React 19 / TypeScript / Vite 8 / npm. Vercel configuration verified. Existing HTML is an empty client-side shell. Preserve /, /kids-call-home, /journey, /evidence, /ventures, /contact. Replace client redirects /about and /writing with server redirects. Add complete prerendered HTML, unique metadata, 404 handling.
- Fluid: github.com/jjwprotozoa/fldinvgrp, main. GitHub Pages API confirms root publishing, custom domain fluidinvestmentgroup.com. Plain HTML, external Tailwind and Font Awesome. Preserve /capability-statement.html, /capability-statement.pdf, /privacy-policy.html, /terms-and-conditions.html, /disclaimer.html and useful home fragments. No sitemap/robots currently. Retain CNAME. Rebalance large undemonstrated facilities/construction/research catalog to supported software/product capabilities.
- Axis: .co.za redirects to axisinnovationgroup.com, Hostinger Website Builder. Current canonical and sitemap use .com. Only / and /swartland-digital-services in sitemap. Preserve regional route; root anchors #ourservices and #getintouch. No source repository or Hostinger deployment access established. New static replacement prepared separately. Domain cutover requires removing .co.za forwarding, pointing .co.za to new hosting, then coordinating .com redirects if authorized. No changes to .com made.

## Content and assets
- Justin email hello@justinwessels.com, GitHub jjwprotozoa, LinkedIn /in/justinwessels from source.
- Fluid: Ocala, Florida; Justin Wessels; justin@fluidinvestmentgroup.com; UEI CLNFQN8C4CT6; CAGE 9F8L6 from public website. Registration expiry shown March 1, 2026: stale relative to audit date. Renewal confirmation requested; do not advertise active registration until verified. No federal awards (user supplied). Keep procurement separate from venture identity.
- Axis: South Africa / Cape Town; hello@axisinnovationgroup.com from public site. Remove unsupported J. Smith testimonial and generic stock photography. Preserve regional search landing page but do not promise undocumented SEO outcomes.
- Kids Call Home: public product site, Apple and Google store listings, read-only package manifest and repository tree establish web, Capacitor mobile, desktop, Supabase and Stripe. No production data queried. Screenshots fetched from Apple's public listing and copied as assets without alteration; provenance in app-store-evidence.json. No fabricated UI.
- Apple's lookup API reports first iOS release May 28, 2026 and version 6.2.6 September 7, 2026. Old Justin source says mobile launch 2025 and founding 2024 without provenance. Do not reuse those dates. Old source labels country/call/adult metrics verified but supplies no evidence export; omit these figures.
- No employment chronology, qualifications, client attribution, revenue or product adoption figures verified. Present a professional summary and evidence-based delivery experience without invented employers or outcomes.

## Search intent research
Qualitative live search and primary-page review, not paid keyword-volume research. No Search Console access or search volume dataset; cannot infer current ranking, traffic, conversion or demand volumes.
- Branded queries for the three target domains produced no results in this search tool; this is not proof of deindexing.
- South African commercial results consistently use software development, product engineering, web/mobile applications, SaaS. Primary examples: https://stacksouth.com/, https://pocketdev.co.za/, https://espresso.dev/. Axis owns this intent, with Cape Town/South Africa and a preserved Swartland page.
- Justin targets name + product builder/developer/founder and proof-of-work pages. Avoid agency service/location copy here.
- Fluid targets exact legal name + technology ventures/operating company, with a separate government-contracting route. Avoid investment fund/federal past performance implications.
- Page titles and summaries should be unique. Existing URLs preserved instead of consolidated blindly. Production canonicals remain intended custom domains; private review hosts should not enter sitemaps.

## Design direction
Shared precise sans-serif typography, generous grid spacing, thin rules, restrained interaction and evidence captions. Justin: light editorial portfolio, ink type and rust accent, product-led feature. Fluid: navy institutional masthead, white content, venture index. Axis: charcoal engineering surface, sharp lime accent, stronger commercial contact. Different page compositions, not logo swaps.

## Release requirements
Review builds privately first. Preserve original provider setup; no push to deployment branches during rebuild. Verify all routes, assets, metadata, JSON-LD, keyboard navigation and responsive layouts. Validate production DNS/certificates/redirects and SAM status before custom-domain cutover. Core Web Vitals field results require post-launch data.

## SAM registration resolved by owner
User supplied current SAM record during this task: FLUID INVESTMENT GROUP LLC, Active Registration; UEI CLNFQN8C4CT6; CAGE 9F8L6; physical address 9752 NW HIGHWAY 225, OCALA FL 34482-1161 USA; expiry February 15, 2027; purpose All Awards. Use this owner-provided current record instead of the stale website date. Federal awards remain none.


## Final implementation and checks
27 static pages including three 404 pages. 382 local HTML links and asset references pass. All page titles and descriptions unique per site; canonicals and structured data parse. Fonts self-hosted. Justin production HTML serves directly at clean URLs and has no React hydration dependency; only a small print handler loads. Browser responsive checks cover all 24 content routes at mobile and tablet sizes. Axis email brief tested without sending. Fluid capability PDF is one rendered and inspected page. npm audit after compatible patches: zero vulnerabilities. No field Core Web Vitals measurements available; payload checks do not imply measured CWV scores.


## September 2026 refinement
User requested Axis-inspired styling across the ecosystem and fuller copy. Justin and Fluid now share Axis charcoal surfaces, lime accents and editorial typography. Expanded product, operating and engagement context.

User confirmed building and owning CODM SquadUp. Public Google Play listing reviewed 11 September 2026: https://play.google.com/store/apps/details?id=com.codmsquadup.app . Listing names Fluid Investment Group LLC as publisher and describes teammate discovery, team management and tournaments for Call of Duty Mobile players. Added as a second owned product; no client relationship, Activision affiliation, unverified architecture, revenue or performance claims added. Product itself remains outside the website editing scope.
