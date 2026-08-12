---
title: "A Comprehensive Guide to SSL and TLS in 2026"
url: "https://pixelstreet.in/blog/comprehensive-guide-to-ssl/"
author: "Khurshid Alam"
published: "2023-07-06"
updated: "2025-04-23"
categories: ["WEB DEVELOPMENT"]
words: "2207"
cited_sources: "19"
publisher: "Pixel Street"
description: "Certificate lifetimes dropped to 200 days on 15 March 2026 and fall to 47 by 2029. What that means for renewals, plus what the padlock stopped meaning in 2023."
machine_view: "https://pixelstreet.in/blog/ai/comprehensive-guide-to-ssl/"
license: "Quotable with attribution to pixelstreet.in"
---

# A Comprehensive Guide to SSL and TLS in 2026

**Summary.** SSL stands for Secure Sockets Layer. It encrypts traffic between a browser and a server so that anyone intercepting it sees scrambled bytes rather than a password or a card number. There are two keys: a public key, which anyone can have and which encrypts, and a private key, which never leaves your server and which decrypts.

Nearly every SSL article on the internet assumes something that stopped being true on 15 March 2026: that you buy a certificate, install it, and think about it again next year. The maximum life of a publicly trusted TLS certificate is now 200 days, and it is scheduled to fall to 47 days by 2029.

I run Pixel Street, a web design and branding studio in Salt Lake, Kolkata, and we design and build for brands like Coca-Cola, ITC and Marico. I am not a cryptographer and this guide will not make you one. What I can do is tell you what the industry has committed to in writing, with every date linked to the body that published it.

My position, and it is the whole point of this guide: the interesting question about SSL is no longer _which certificate should I buy_. It is _who renews it, automatically, at three in the morning, when nobody is looking_. The certificate is close to free. The renewal is the product.

## The short answer

- **Certificates are short now and getting shorter.** 200 days today, 100 days from 15 March 2027, 47 days from 15 March 2029, on a schedule the CA/Browser Forum voted through in April 2025.
- **You almost certainly should not pay for one.** Let's Encrypt is free, your host probably bundles it, and Cloudflare issues one on its free plan.
- **Automate the renewal or accept that your site will go down.** At 47 days, a human with a calendar reminder is a single point of failure.
- **Run TLS 1.2 and TLS 1.3.** Everything below TLS 1.2 is formally prohibited, including every version actually called SSL.
- **Stop selling the padlock.** Chrome removed it in 2023 and the green address bar died in 2019.

## What SSL is, and why nobody is really using SSL

SSL stands for Secure Sockets Layer. It encrypts traffic between a browser and a server so that anyone intercepting it sees scrambled bytes rather than a password or a card number. There are two keys: a public key, which anyone can have and which encrypts, and a private key, which never leaves your server and which decrypts.

Here is the part almost every guide skips. The protocol literally named SSL has been prohibited for years. RFC 7568, published in June 2015, states that "SSLv3 MUST NOT be used" and points back at RFC 6176, which had already prohibited SSL 2.0 ([IETF, June 2015](https://www.rfc-editor.org/rfc/rfc7568.html)). Its replacement then deprecated its own first two versions: RFC 8996, published as BCP 195 in March 2021, says "TLS 1.0 MUST NOT be used" and "TLS 1.1 MUST NOT be used", moving both to Historic status ([IETF, March 2021](https://www.rfc-editor.org/rfc/rfc8996.html)).

So when your host sells you an SSL certificate, you are buying a TLS certificate. The name survived because it is what people search for, and I have kept using it here for the same reason. I would rather tell you than let you believe the protocol is what it says on the invoice.

## Why Do You Need SSL on Your Website?

The honest answer in 2026 is that HTTPS has stopped being an advantage and become a condition of entry. Google's own numbers put HTTPS adoption between 84% on Linux and over 99% on Android and Mac; counting only public sites, it is nearly 97% on Linux, 98% on Windows and above 99% on Android and Mac ([Google Chrome Security Team, 28 October 2025](https://blog.google/security/https-by-defau/)). You are not joining a trend. You are avoiding being the exception.

### Confidentiality and integrity in transit

Passwords, card details and form submissions are unreadable to anyone sitting between the visitor and your server, and they cannot be silently altered on the way. That is the real product, and it is the same product whether the certificate cost nothing or cost fifty thousand rupees.

### Browsers are about to stop being polite about it

Chrome is turning on "Always Use Secure Connections" by default. Chrome 147 in April 2026 enabled it for everyone already enrolled in Enhanced Safe Browsing, which Google puts at over a billion users. Chrome 154, due October 2026, extends it to all Chrome users, who will be asked for permission before a public site loads without HTTPS ([Google, 28 October 2025](https://blog.google/security/https-by-defau/)). Google's experiments found the median user saw fewer than one such warning per week, which tells you how few sites are left on the wrong side of this.

### A small, real, oversold SEO effect

Google announced HTTPS as a lightweight ranking signal in August 2014 ([Google Online Security Blog, 7 August 2014](https://security.googleblog.com/2014/08/https-as-ranking-signal_6.html)). Nothing since has superseded or strengthened it. Anyone selling you a certificate on the promise of rankings is selling you a tiebreaker as though it were a strategy. The traffic consequence that matters is the browser warning above.

## The certificate lifetime schedule, which is the actual news

On 11 April 2025 the CA/Browser Forum passed ballot SC-081v3, with certificate issuers voting 25 in favour and none against, and the browser side 4 in favour and none against ([CA/Browser Forum, 11 April 2025](https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/)). It sets a dated staircase for how long a certificate may live, and for how long a CA may reuse the proof that you control your domain.

| From | Maximum certificate validity | Maximum domain validation reuse |
| --- | --- | --- |
| Until 14 March 2026 | 398 days | 398 days |
| 15 March 2026 | 200 days | 200 days |
| 15 March 2027 | 100 days | 100 days |
| 15 March 2029 | 47 days | 10 days |

Those dates and day counts are set out in DigiCert's breakdown of the ballot ([DigiCert, 16 May 2025](https://www.digicert.com/blog/tls-certificate-lifetimes-will-officially-reduce-to-47-days)). The same 15 March 2026 date also cut reuse of Subject Identity Information from 825 days to 398, which affects organisation-validated and extended-validation certificates only.

The first step has already happened. In July 2026 the Forum passed ballot SC102, which tidies the Extended Validation guidelines by deleting their hardcoded 398-day figures, and describes the current state plainly: the Baseline Requirements "cap Domain Name reuse at 200 days today and decline further on the published schedule, and they cap validity on the same trajectory" ([CA/Browser Forum, 14 July 2026](https://cabforum.org/2026/07/14/ballot-sc102-ev-domain-reuse-and-validity-alignment/)). If a certificate you bought this month is dated a year out, it was not issued by a publicly trusted CA following the rules.

![The maximum life of a publicly trusted TLS certificate falls on a dated staircase: 398 days until 14 March 2026, 200 days from 15 March 2026, 100 days from 15 March 2027 and 47 days from 15 March 2029 — where a diary entry once a year becomes eight renewals a year.](https://pixelstreet.in/blog/diagrams/comprehensive-guide-to-ssl-lifetime-staircase.svg)

### Let's Encrypt is moving faster than the rules require

Let's Encrypt has published its own schedule, ahead of the Forum's. Its `tlsserver` ACME profile switched to 45-day certificates on 13 May 2026. The default `classic` profile drops from 90 days to 64 days on 10 February 2027, then to 45 days on 16 February 2028 ([Let's Encrypt, 2 December 2025](https://letsencrypt.org/2025/12/02/from-90-to-45)). It has also made a `shortlived` profile generally available, issuing certificates valid for 160 hours, just over six days, alongside certificates for bare IP addresses ([Let's Encrypt, 15 January 2026](https://letsencrypt.org/2026/01/15/6day-and-ip-general-availability)).

Their framing of the consequence is the useful bit. Shorter lifetimes roughly double daily renewal volume, because a 45-day certificate renews around day 30 rather than a 90-day one renewing around day 60, and clients supporting ARI handle the timing themselves ([Let's Encrypt, 24 February 2026](https://letsencrypt.org/2026/02/24/rate-limits-45-day-certs)). Renewals are exempt from the rate limits, so nobody needs to ask for an increase.

What I take from this, and it is a judgement rather than a fact: manual certificate renewal is finished as a working habit. It was survivable at 398 days because a diary entry once a year is a thing a person can hold. At 47 days it is eight renewals a year, and the failure mode is not a warning email, it is your site showing an interstitial to every visitor at a time of the protocol's choosing.

### Nobody is going to email you when it expires

Let's Encrypt stopped sending expiration notification emails on 4 June 2025, citing the fact that most subscribers already automate renewal, that storing millions of email addresses sits badly with its privacy principles, and that the service cost tens of thousands of dollars a year ([Let's Encrypt, 22 January 2025](https://letsencrypt.org/2025/01/22/ending-expiration-emails/)). It recommends third-party monitoring instead.

The safety net was removed in the same period the tightrope got thinner. If your renewal process is a person who used to get an email, you no longer have a renewal process.

## Should you actually pay for a certificate?

Usually not, and I say that as someone who could quietly put a line item on a proposal for it.

Let's Encrypt describes itself as "A nonprofit providing free TLS certificates" and states that it serves "more than 700M websites" ([Let's Encrypt, ISRG](https://letsencrypt.org/)). Its published limits are generous for any normal business: up to 50 certificates per registered domain every 7 days, up to 5 for an identical set of names every 7 days, and up to 300 new orders per account every 3 hours ([Let's Encrypt rate limits](https://letsencrypt.org/docs/rate-limits/)). Cloudflare is equally blunt: "By default, Cloudflare issues — and renews — free, unshared, publicly trusted SSL certificates to all domains added to and activated on Cloudflare", on every plan including the free one ([Cloudflare Developer Docs](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/)). Most Indian shared hosting bundles Let's Encrypt as standard, though not always at the cheapest tier, which is one of the things I check plan by plan in my [comparison of hosting services in India](https://pixelstreet.in/blog/best-hosting-services-in-india/).

Paid certificates have legitimate uses. You need one if you want your legal entity named inside the certificate, which is what organisation and extended validation buy, and you may want the warranty, support contract or management platform if you run hundreds of certificates across systems that cannot speak ACME. What you should not be paying meaningfully for is basic domain-validated HTTPS on one website. If that appears as a significant number on a quote, treat it as a question rather than a cost, which is one of the [questions worth asking before you hire a web design agency](https://pixelstreet.in/blog/questions-before-hiring-web-design-agency/).

## How does SSL work?

When your browser connects over HTTPS, the two ends run a handshake before any real data moves. The server sends its certificate, and your browser checks that it was issued by an authority it already trusts, that it has not expired, and that it is actually for the domain in the address bar. That is the step proving you are talking to the site you typed rather than something sitting in between.

The two sides then agree a session key, used only for this conversation, and switch to fast symmetric encryption for everything that follows. The certificate's job ends once the session key exists. Signatures across the handshake mean that if anything was tampered with in transit, both ends find out and the connection fails rather than continuing quietly.

![How does SSL work](https://pixelstreet.in/blog/media/2023/07/How-does-SSL-work.png)

Source: [aboutssl.org](https://aboutssl.org/ssl-guide/)

## Which TLS version should you be running?

TLS 1.2 and TLS 1.3, and nothing else. TLS 1.2 remains current and compliant; TLS 1.3 is faster and drops the weak options that made 1.2 easy to misconfigure. Both are supported by every browser you care about, so enabling 1.3 costs you no audience.

| Version | Status | What to do |
| --- | --- | --- |
| SSL 2.0 | Prohibited by RFC 6176 | Disable |
| SSL 3.0 | "MUST NOT be used" (RFC 7568, June 2015) | Disable |
| TLS 1.0 | "MUST NOT be used" (RFC 8996, March 2021) | Disable |
| TLS 1.1 | "MUST NOT be used" (RFC 8996, March 2021) | Disable |
| TLS 1.2 | Current, widely required as a floor | Enable |
| TLS 1.3 | Current, preferred | Enable and prefer |

One practical reason to treat TLS 1.3 as mandatory rather than optional: HTTP/3 requires it. QUIC, which HTTP/3 runs on, specifies that "Clients MUST NOT offer TLS versions older than 1.3" and that an endpoint "MUST terminate the connection if a version of TLS older than 1.3 is negotiated" ([IETF RFC 9001, May 2021](https://www.rfc-editor.org/rfc/rfc9001.html)). If your performance plan involves HTTP/3, TLS 1.3 is a prerequisite.

## What is an SSL certificate?

A certificate is a signed statement from a certificate authority binding a public key to a name. The authority checks something about you, signs the result, and browsers trust the signature because they already trust the authority. What the authority checked is the only thing that varies between validation levels. The encryption does not.

### Types of SSL Certificate:

#### Domain Validated (DV)

The authority confirms you control the domain and nothing else. Issued in minutes, usually free, and this is what Let's Encrypt, Cloudflare and your host's one-click button all give you. You will still find DV described as offering "the least amount of trust" and suiting only personal and internal sites. That is wrong. A DV certificate encrypts identically to any other, and the overwhelming majority of the encrypted web runs on one.

#### Organisation Validated (OV)

The authority verifies your organisation's identity as well as your domain control, and the organisation name appears in the certificate. A claim that circulates widely in SSL explainers is that the CA also checks whether you are registered with the Better Business Bureau. I could find no basis for it anywhere. Validation requirements come from the CA/Browser Forum, not from a business ratings body.

#### Extended Validation (EV)

The most thorough check. The CA/Browser Forum's EV guidelines require verification that the site is controlled by a specific legal entity, identified by name, address of place of business, jurisdiction of incorporation or registration, and registration number ([CA/Browser Forum](https://cabforum.org/working-groups/server/extended-validation/about/)). There is no mention of the Better Business Bureau in that document either.

EV certificates are still sold on the promise that they "trigger the green bar in browsers, which can increase conversions". Delete that from your mental model. Chrome moved the EV indicator out of the address bar and into Page Info starting in Chrome 77, which shipped in September 2019 ([The Chromium Projects](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/ev-to-page-info.md)), and Firefox 70 did the same weeks later. There has been no green bar for nearly seven years, and a visitor would have to open a menu to discover you paid for EV at all.

#### Coverage variants

- **Wildcard:** secures unlimited subdomains of a single domain, such as `*.example.com`.
- **Multi-domain / SAN:** secures several distinct domain names on one certificate.
- **Unified Communications Certificate (UCC):** a multi-domain certificate marketed for Microsoft Exchange and Skype for Business environments.

These are coverage options, not validation levels. A wildcard can be DV, OV or EV, and the marketing that presents them as a tier list above DV is selling you scope as though it were security.

## The padlock was never a trust badge

Chrome 117, released in September 2023, replaced the padlock in the address bar with a neutral "tune" icon. Google's stated reason was that its own research found only 11% of study participants correctly understood what the lock meant, and that phishing sites use HTTPS too and displayed the same reassuring lock ([Help Net Security, 3 May 2023, reporting the Chromium Blog](https://www.helpnetsecurity.com/2023/05/03/google-chrome-https/)).

This matters commercially because a lot of SSL marketing sold the padlock as a conversion device. It told visitors the connection was encrypted. It never told them the business at the other end was honest, and Chrome removed it precisely because people read it as the second thing.

## How to get an SSL Certificate?

There are two paths, and most people should take the first.

**Automated, via ACME.** Turn on the free SSL option in your hosting control panel, point Cloudflare at your domain, or run an ACME client such as Certbot or Caddy on your own server. The client requests, validates, installs and renews without you. Confirm one thing afterwards: that renewal is scheduled and has run successfully at least once. A certificate that installed but never renews is a delayed outage.

**Manual, for OV and EV.** Generate a Certificate Signing Request on your server, submit it to the certificate authority, complete their organisation vetting, then install the certificate together with its intermediate chain. Budget real time for the vetting, because it involves documents and a human.

Either way, test the result rather than trusting the padlock. Run the site through a public TLS checker to confirm the chain is complete, the protocol versions are what you intended, and the expiry date is what you expected. An incomplete intermediate chain is the classic failure that works in your browser and fails on someone else's phone.

![How Does SSL Certificate works?](https://us.norton.com/content/dam/blogs/images/norton/am/how-ssl-certificates-work.png)

Source: [us.norton.com](https://us.norton.com/content/dam/blogs/images/norton/am/how-ssl-certificates-work.png)

## What SSL does not do

This is the misunderstanding that costs people the most money, so it gets its own heading. A certificate protects data in transit between browser and server. That is the entire scope.

- It does not stop SQL injection, cross-site scripting, or a plugin with a known vulnerability. Those attacks travel happily over an encrypted connection.
- It does not protect data once it lands in your database, which is a separate problem with separate controls.
- It does not vouch for the business. A DV certificate proves control of a domain, not honesty.
- It does not survive a stolen private key, which is the reason the whole industry is shortening lifetimes rather than improving revocation.

![The certificate's entire scope is the encrypted channel between the visitor's browser and your server. SQL injection, cross-site scripting, data at rest in your database, whether the business is honest and a stolen private key all sit outside it.](https://pixelstreet.in/blog/diagrams/comprehensive-guide-to-ssl-what-it-does-not-cover.svg)

If you want the layer that does address application vulnerabilities, and the Indian compliance obligations that now sit behind it, that is a different discipline and I have written about it separately in my [guide to VAPT for Indian businesses](https://pixelstreet.in/blog/vapt-guide/). Encryption and security are related, and they are not the same purchase.

## FAQ

### How long does an SSL certificate last in 2026?

A maximum of 200 days, since 15 March 2026. That falls to 100 days on 15 March 2027 and 47 days on 15 March 2029 under CA/Browser Forum ballot SC-081v3. Let's Encrypt is moving faster still, to 64 days in February 2027 and 45 days in February 2028.

### Is a free certificate less secure than a paid one?

No. The encryption is identical. What you buy with a paid certificate is identity vetting, a warranty, support, or management tooling, none of which changes the strength of the connection.

### Do I still need to worry about expiry emails?

Let's Encrypt stopped sending them on 4 June 2025. If you rely on a notification to trigger a renewal, set up independent certificate monitoring, or better, automate renewal so the notification is irrelevant.

### Will an SSL certificate improve my Google rankings?

Marginally at best. Google called HTTPS a lightweight ranking signal in 2014 and has not upgraded that description since. The traffic risk you should care about is Chrome 154 in October 2026 asking users for permission before loading a site without HTTPS.

### My host says SSL is included. Is that enough?

For most brochure sites and small stores, yes, provided renewal is automatic and you have verified it once. Check what happens at renewal rather than at signup, because that is where bundled offers differ.

## Where I would leave it

The received wisdom is that SSL is a padlock which makes visitors trust you. It was wrong when it was written and it is measurably wrong now. The padlock has been removed from the browser most of your visitors use, the green bar has been gone since 2019, and the certificate itself is close to a commodity you should expect for free.

What replaced all of it is unglamorous and much more useful: a renewal job that runs without you, monitoring that tells you when it did not, and TLS 1.2 and 1.3 configured properly. That is the whole of modern SSL practice for a normal business, and none of it is a purchase decision.

My advice is to stop treating the certificate as something you buy and start treating renewal as something you own. If you want someone to look at what your current setup actually renews, and when, [**Pixel Street**](https://pixelstreet.in/web-design-company-kolkata) is in Kolkata and you can reach us [**here**](https://pixelstreet.in/contact-us).

## Sources

- [CA/Browser Forum](https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/) — published 2025-04-11
- [CA/Browser Forum](https://cabforum.org/2026/07/14/ballot-sc102-ev-domain-reuse-and-validity-alignment/) — published 2026-07-14
- [CA/Browser Forum](https://cabforum.org/working-groups/server/extended-validation/about/) — published 2026
- [Cloudflare](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) — published 2026
- [DigiCert](https://www.digicert.com/blog/tls-certificate-lifetimes-will-officially-reduce-to-47-days) — published 2025-05-16
- [Google (Chrome Security Team: Chris Thompson, Mustafa Emre Acer, Serena Chen, Joe DeBlasio, Emily Stark, David Adrian)](https://blog.google/security/https-by-defau/) — published 2025-10-28
- [Google Online Security Blog](https://security.googleblog.com/2014/08/https-as-ranking-signal_6.html) — published 2014-08-07
- [Help Net Security (reporting Chromium Blog, 2 May 2023)](https://www.helpnetsecurity.com/2023/05/03/google-chrome-https/) — published 2023-05-03
- [IETF / RFC Editor](https://www.rfc-editor.org/rfc/rfc7568.html) — published 2015-06
- [IETF / RFC Editor](https://www.rfc-editor.org/rfc/rfc8996.html) — published 2021-03
- [IETF / RFC Editor](https://www.rfc-editor.org/rfc/rfc9001.html) — published 2021-05
- Khurshid Alam (own recommendation) (first-hand, Pixel Street) — published 2026-07-30
- [Let's Encrypt (ISRG)](https://letsencrypt.org/2025/01/22/ending-expiration-emails/) — published 2025-01-22
- [Let's Encrypt (ISRG)](https://letsencrypt.org/docs/rate-limits/) — published 2026
- [Let's Encrypt (ISRG)](https://letsencrypt.org/) — published 2026
- [Let's Encrypt (ISRG), Jacob Hoffman-Andrews](https://letsencrypt.org/2026/02/24/rate-limits-45-day-certs) — published 2026-02-24
- [Let's Encrypt (ISRG), Matthew McPherrin](https://letsencrypt.org/2025/12/02/from-90-to-45) — published 2025-12-02
- [Let's Encrypt (ISRG), Matthew McPherrin](https://letsencrypt.org/2026/01/15/6day-and-ip-general-availability) — published 2026-01-15
- [The Chromium Projects](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/ev-to-page-info.md) — published 2019

---

Published by Pixel Street — https://pixelstreet.in/. Human view: https://pixelstreet.in/blog/comprehensive-guide-to-ssl/ · Machine view: https://pixelstreet.in/blog/ai/comprehensive-guide-to-ssl/
