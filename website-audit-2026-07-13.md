# Website Audit: Pixel Street (pixelstreet.in)

**Prepared for:** Pixel Street team
**Date:** 2026-07-13
**Target group (audited against):** B2B decision-makers (founders, marketing heads) at businesses in and around Kolkata evaluating agencies for branding, web design, or digital marketing
**Pages reviewed:** Homepage, About, Contact Us, Our Work, Branding Agency Kolkata, Digital Marketing Agency Kolkata, Web Design Company Kolkata, FAQ, Careers, Privacy Policy, Terms, Refer & Win, Case Studies, Blog (index + sample post)
**Primary conversion goal:** Enquiry — contact form submission, call, or WhatsApp message

## Executive Summary

Pixel Street's site has real strengths to build on: a bold, distinctive visual identity, genuinely responsive layouts, and — on the three Kolkata service pages and homepage — some of the best local-SEO/AEO structured data (LocalBusiness, FAQPage, AggregateRating) we see on agency sites this size. But three things are quietly costing leads and rankings right now. First, **every single page we checked ships an empty meta description**, so Google writes its own (often unflattering) snippet for every search result — an easy fix with outsized upside since the blog template proves the CMS supports it fine. Second, the site has **no security headers at all** (no HSTS, CSP, X-Frame-Options, etc.) and several leftover default/placeholder files are still publicly live, which looks unprofessional if a prospect's IT person checks and is simple to close off. Third, and specific to how B2B buyers now research vendors, **OpenAI's GPTBot is being actively blocked at the network level** while Perplexity, Claude, and Google's crawlers get through — meaning ChatGPT effectively cannot learn about Pixel Street. The single highest-leverage fix: populate meta descriptions site-wide and add a persistent, clearly-labelled "Get a Quote" CTA to the header — both are low-effort template changes with direct impact on click-through and enquiry volume.

## Priority Fixes (do these first)

| # | Issue | Lens | Why it matters (business impact) | Effort | Priority |
|---|---|---|---|---|---|
| 1 | Meta description is empty (`content=""`) on every non-blog page | SEO | Google fabricates the search snippet for every listing, directly suppressing click-through from search — the highest-traffic page (homepage) is affected | Low | P1 |
| 2 | No security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) | Security | Site is exposed to clickjacking and MIME-sniffing attacks; a prospect's IT/security reviewer checking this before signing a vendor would flag it immediately | Low | P1 |
| 3 | Leftover default/placeholder files are publicly live: `/default.php` (hosting-provider default page), `/Default.html` (orphaned "under construction" page), `/stack-file` (raw unstyled HTML fragment served as plain text) | Security | Unprofessional if found, reveals hosting stack, and can get crawled as junk/duplicate content | Low | P1 |
| 4 | No persistent, clearly-labelled "Get a Quote" / "Contact Us" CTA in the header or hero; "Contact Us" isn't even in the primary nav list | CRO | The main nav (Services, Our Work, Team, Referral, Blog, Careers) has no contact link at all — a time-poor B2B evaluator has to hunt for a way to act | Low–Med | P1 |
| 5 | H1 missing entirely on Contact Us, Our Work, FAQ, and Refer & Win pages | SEO | These are conversion/portfolio pages — no H1 weakens both topical relevance and screen-reader page orientation | Low | P1 |
| 6 | Contact form `<label>` elements all have empty `for=""`, not linked to any input `id` | Design/UX (Accessibility) | Screen readers and some autofill can't reliably associate labels with fields on the page whose entire job is collecting leads | Low | P1 |
| 7 | GPTBot connections are reset at the network/WAF layer (confirmed via repeated HTTP/2 PROTOCOL_ERROR); ChatGPT-User, PerplexityBot, ClaudeBot, Googlebot all succeed | AEO | OpenAI cannot crawl the site at all, so Pixel Street is structurally invisible to ChatGPT's knowledge — one of the two largest AI answer engines | Low–Med | P1 |
| 8 | Server TTFB is consistently ~1.0s across repeated requests (not a cache miss) | SEO / Performance | Slow first-byte time drags down Core Web Vitals and is the first thing a visitor waits on, before a single image loads | Med | P2 |
| 9 | Homepage loads 173 images but only 7 use `loading="lazy"` | Design/UX / Performance | Most images fight for bandwidth on first paint instead of loading as the visitor scrolls to them | Low–Med | P2 |
| 10 | `/faq` page itself has no `FAQPage` schema (the three Kolkata service pages do) | AEO | The one page literally named FAQ is the most obvious candidate for FAQ rich results / AI-answer extraction and is currently skipped | Low | P2 |
| 11 | `robots.txt` has no `Sitemap:` directive | SEO | Trivial to add; makes sitemap discovery explicit for all crawlers instead of relying on manual submission | Low | P3 |
| 12 | Blog hasn't published since ~January 2025 (schema `dateModified: 2025-01-28` on the blog index; newest post dated March 27, 2025) | Content | 17+ months of silence undercuts the fairly strong existing SEO content library and signals inactivity to both readers and search engines | Med | P2 |

## Findings by Lens

### 1. Design & UX

**What's working:** The visual identity is genuinely distinctive — the color-blocked geometric hero (yellow/red/blue/teal shapes for Branding/Marketing/Website/Portfolio) is memorable and on-brand for a creative agency, and it holds up cleanly at mobile width (375px) with no overflow or broken stacking. The WhatsApp click-to-chat floating button is a smart, market-appropriate touch for Indian B2B/SMB buyers.

- **No persistent contact CTA.** The primary nav (Services ▸ Branding/Web Design/Digital Marketing, Our Work, Team, Referral, Blog, Careers) has no "Contact Us" entry, and there's no `cta`/`contact`-classed button anywhere in the homepage markup. The only always-visible way to act is the WhatsApp bubble — fine as a secondary channel, but many B2B buyers specifically want a form or a "Get a Quote" button they can act on from their desk, not a WhatsApp chat.
- **Navigation is hidden behind a hamburger even on desktop.** The full nav only appears inside a full-screen overlay triggered by the hamburger icon. That's a deliberate, defensible style choice for a portfolio-first creative agency, but it does add a click for a visitor scanning for "Services" or "Contact" at a glance — worth an intentional decision, not an accident.
- **Contact form labels aren't linked to inputs** (`for=""` on every `<label>` on `/contact-us`, not pointing at the corresponding input `id`). This is a WCAG 2.1 failure (labels must be programmatically associated) and it's the form that captures every lead the site generates.
- **Decorative image inside the H1.** The homepage H1 reads `Leading Creative Agency <img alt="Circle Pin"> In Kolkata` — the pin icon's alt text gets read inline by screen readers, interrupting the heading. Should be `alt=""` since it's purely decorative.

### 2. Security & Technical Health

**What's working:** HTTP → HTTPS and `www` → non-`www` both redirect correctly (301s verified). TLS 1.3 with a valid Let's Encrypt certificate (`CN=pixelstreet.in`, expires 2026-09-08). `.htaccess` correctly returns 403 rather than serving its contents.

- **No security headers at all.** Checked the live response headers on the homepage: no `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`. Without HSTS, a visitor's very first request to `http://` (before the redirect fires) is still interceptable; without `X-Frame-Options`/frame-ancestors, the site can be iframed elsewhere for clickjacking; without `X-Content-Type-Options: nosniff`, browsers may MIME-sniff responses in ways that enable content-type confusion attacks. These are a one-time server/CDN config change, not a code rewrite.
- **Leftover files are live and publicly reachable:**
  - `/default.php` → 200, a stock Hostinger "Default page" — reveals the hosting provider and is dead weight at the domain root.
  - `/Default.html` → 200, an orphaned "Under construction" page (`noindex`, but still directly loadable) — a leftover from an earlier deploy.
  - `/stack-file` → 200, served as raw text — it's a fragment of page markup (a "Personal Branding" section) with no `<html>`/`<head>` wrapper, sitting at the web root with no extension. None of these are linked from the site, but all three are one URL guess away and would look sloppy to any technically-minded prospect who pokes around.
- **A cache/proxy identifier leaks in response headers** (`host-header: 8441280b...`) — low risk on its own, but it's backend implementation detail that doesn't need to be public.
- **Note, not a finding:** we did not attempt any active testing (no injection, fuzzing, or auth bypass attempts) — this was a passive review of what's publicly served. If you want confirmation there's nothing deeper wrong, that requires an authorized penetration test, not this audit.

### 3. SEO

**What's working:** Canonical tags are present and correctly self-referencing on every page checked, including consolidating the trailing-slash service-page URLs. Open Graph tags are present (6 tags) on most pages. The three local service pages carry strong on-page structure with clear, keyword-matched titles (e.g., "Best Digital Marketing Agency In Kolkata | Pixel Street").

- **Every page checked has an empty meta description** — Home, About, Contact Us, Our Work, all three Kolkata service pages, FAQ, Careers, Privacy Policy, Terms, and Refer & Win all ship `<meta name="description" content="">`. This isn't a platform limitation: blog posts on the same domain (WordPress-powered) *do* have real, well-written descriptions (e.g., the "Advanced SEO Techniques" post). This is a template gap on the main site specifically, and it's the single easiest high-impact fix in this report.
- **H1 missing entirely** on `/contact-us`, `/our-work`, `/faq`, and `/refer-win`. These aren't obscure pages — Our Work is the portfolio and Contact Us is the conversion page.
- **`robots.txt` has no `Sitemap:` line.** `sitemap.xml` exists and is well-formed (102 URLs), but crawlers have to discover it without being told where it is.
- **Server response is slow.** TTFB measured at ~1.0s on three separate requests (not a cold-cache artifact) — this is pure server processing time before any HTML reaches the browser, and it's a direct Core Web Vitals input.
- **Trailing-slash duplication is handled correctly** for the service pages (non-slash URL serves content but declares the slash version canonical) — this is good practice, not a bug, worth explicitly not touching.

### 4. AEO / AI Search Readiness

**What's working:** This is genuinely a strength relative to most sites this size. The homepage and all three Kolkata service pages carry rich JSON-LD: `LocalBusiness`, `PostalAddress`, `OpeningHoursSpecification`, `AggregateRating`, `Service`, and `FAQPage`/`Question`/`Answer` blocks. That's exactly the structured signal AI answer engines and local search look for.

- **GPTBot is blocked at the network level.** Testing the same URL with different user-agent strings: `curl` default, a full Chrome UA, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, and `Googlebot` all return 200. Requesting with UA `GPTBot` specifically gets its HTTP/2 connection reset (`PROTOCOL_ERROR`) on every one of three separate attempts — not a one-off network blip. `robots.txt` itself has no `Disallow` for GPTBot, so this is happening at a WAF/CDN layer, not intentionally in robots directives. Practically: OpenAI cannot crawl this site, so ChatGPT has no way to learn about Pixel Street from the site itself. Worth checking with your host/CDN (the `nginx`/proxy headers suggest a managed hosting WAF) for a bot-management rule that's catching the GPTBot UA string.
- **The FAQ page itself has no `FAQPage` schema**, even though the three service pages do (each with their own embedded FAQ section). The dedicated `/faq` page is the most natural place for this and is currently the gap.
- **Empty meta descriptions compound the AEO gap** — several AI engines use the meta description as a fallback summary source alongside crawled body text, so this fix benefits both lenses at once.

### 5. Conversion (CRO)

- **No concrete, persistent CTA above the fold or in the header.** The hero leads entirely with brand personality ("Leading Creative Agency... Where big ideas meet bold designs to make your brand impossible to ignore!") with no stated proof point (years active, client count, notable names) and no button. For a TG actively comparing multiple agencies, the first five seconds need to answer "why you, and what do I click."
- **WhatsApp is the de facto CTA**, which fits the regional buying pattern well, but it's not a substitute for an explicit form/email path for buyers who prefer to send a brief in writing or loop in a colleague — right now that requires navigating into the hamburger menu to find Contact.
- **The broken form-label association (see Design & UX)** compounds this: the one form on the site built to capture leads has an accessibility gap that also increases the odds of misfilled fields.
- **Case studies are a real asset here** — footer references to Mangaldeep, ShipZip, The Hindu, and Marico are strong, recognizable social proof for a B2B buyer, but that credibility is buried in the footer rather than surfaced near the CTA where it would do the most persuasive work.

### 6. Target-Group Fit

- **Kolkata-specific service pages are the right move.** `branding-agency-kolkata`, `digital-marketing-agency-kolkata`, and `web-design-company-kolkata` map directly onto how a local B2B buyer actually searches, and they're the best-optimized pages on the site (schema, H1, OG tags all present). This is good TG-matched information architecture.
- **Recognizable client names (Marico, The Hindu) are a strong trust signal** for this audience — a mid-market founder deciding between agencies weighs "who else uses them" heavily, and Pixel Street has real answers here, just not surfaced prominently enough (see CRO).
- **A dedicated Careers page** is a quiet but real signal of agency stability to a buyer sizing up whether a vendor will still be around in a year — worth keeping current if this is being used as a trust signal.

### 7. Content

- **The blog is a real asset but has gone stale.** The blog index's own schema reports `dateModified: 2025-01-28`, and the most recent post we could confirm is dated March 27, 2025 — over 17 months with no new posts as of this audit. The existing library (SEO techniques, web design trends, AI-in-design pieces) is well-optimized (proper meta descriptions, `BlogPosting`/`Person`/`Organization` schema all present, unlike the main site) — it's specifically the publishing cadence that's stopped, not the underlying setup.
- **Service pages carry solid on-page FAQ content** addressing likely objections, which is good both for conversion and (once the `/faq` page itself gets matching schema) for AEO.
- **Legal pages (Terms, Privacy Policy) are thin but that's expected** — not a finding on its own, just noting they weren't a focus area.

## Quick Wins vs. Bigger Bets

**Fixable this week:**
- Write and add real meta descriptions to every main-site page (start with Home, Contact Us, the three Kolkata service pages)
- Delete or block `/default.php`, `/Default.html`, `/stack-file`
- Add missing security headers at the server/CDN config level
- Add H1s to Contact Us, Our Work, FAQ, Refer & Win
- Fix `<label for="">` to reference actual input `id`s on the contact form
- Add `Sitemap:` line to `robots.txt`
- Add `FAQPage` schema to `/faq`

**Bigger bets (real project time):**
- Add a persistent, clearly-labelled "Get a Quote" CTA across the header and hero, and surface a case-study/client-logo strip near it
- Investigate and resolve the GPTBot network block with your hosting/CDN provider
- Diagnose the ~1s TTFB (server processing, PHP layer, or proxy config) and set up systematic image lazy-loading
- Revive the blog with a regular publishing cadence, using the same structured-data pattern already proven on existing posts

## What We'd Do Next

Sequence: knock out the Quick Wins list first — it's almost entirely config and copy changes with no design risk, and it fixes the two most damaging issues (invisible search snippets, missing security headers) within days. In parallel, scope the header/CTA redesign as a small, contained design task since it touches the template used across every page. Once GPTBot access and TTFB are diagnosed, re-run the AEO and performance checks in this report to confirm resolution before considering this pass closed.
