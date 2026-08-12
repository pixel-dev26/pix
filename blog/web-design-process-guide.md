---
title: "From Vision to Reality: Exploring the Web Design Process"
url: "https://pixelstreet.in/blog/web-design-process-guide/"
author: "Khurshid Alam"
published: "2023-07-06"
updated: "2025-04-23"
categories: ["WEB DEVELOPMENT"]
words: "2771"
cited_sources: "21"
publisher: "Pixel Street"
description: "The web design process as it actually runs, including accessibility before it gets expensive — and the widely repeated web design statistics that turn out to have no traceable source."
machine_view: "https://pixelstreet.in/blog/ai/web-design-process-guide/"
license: "Quotable with attribution to pixelstreet.in"
---

# From Vision to Reality: Exploring the Web Design Process

Every published web design process I have read draws the same picture: discovery, wireframe, design, build, test, launch. Neat boxes, arrows pointing one way, nothing ever going backwards. I run a studio in Kolkata that designs and builds for brands including Coca-Cola, ITC and Marico, and I have never seen a project move like that.

Real projects loop. A stakeholder who missed the kickoff turns up in week six with opinions. Content that was promised in week two arrives after the design is locked. A layout that looked considered on a 27-inch monitor falls apart on a phone, which is where two thirds of Indian web traffic actually comes from.

So this is the process we run, in the order we run it, with the places it stalls marked rather than hidden. Two of the nine steps decide whether the project succeeds, and neither of them is the step where the design gets made.

## **The process in short**

1. **Goal identification.** Agree what the website is for and how you will know whether it worked.
2. **Platform choice.** Decide from the content model and from who updates the site, not from habit.
3. **Scope.** Write down what is included, what is not, and how many rounds of revision the price covers.
4. **Design creation.** Sitemap, wireframes, key page templates.
5. **Visual design.** Colour, typography, imagery, restraint.
6. **Content.** The step that breaks more timelines than everything else combined.
7. **Accessibility.** Inside the build, not bolted on after launch.
8. **Testing.** Forms, links, real phones, real browsers, consent notices.
9. **Launch, then maintenance.** A website is not a delivery, it is a commitment.

Steps 1 and 6 decide the outcome. A project with clear goals and finished content survives a mediocre designer. A project with vague goals and placeholder copy will not be rescued by a brilliant one, and I have watched people try.

![The nine steps run from goal identification to launch and maintenance, with steps 1 and 6 marked as the two that decide the outcome, and a loop drawn back from content to design creation because content arrives late and re-opens the design.](https://pixelstreet.in/blog/diagrams/web-design-process-guide-nine-steps.svg)

## **Key elements of web design**

A website has two layers: the layer people see, and the layer that works. Most briefs I receive describe the first in detail and assume the second happens by itself.

### **Visual elements**

- **Typography.** Pick a pairing you can live with at every size, then check it on a phone before you fall in love with it on a laptop.
- **Layout.** Arrange content around what the visitor came to do. If a page has four equally weighted calls to action, it has none.
- **Colour.** Choose for contrast before you choose for mood. WCAG success criterion 1.4.3 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text at level AA ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)). If the brand's pale grey on white fails that, the brand loses the argument, not the reader.
- **Imagery and icons.** Stock photography is fine when it is specific and terrible when it is a handshake in a boardroom. If you can swap the picture for a competitor's without anyone noticing, it is not doing work.

### **Functional elements**

- **Navigation.** A visitor should be able to say where they are and what else exists without thinking about it.
- **User interaction.** No interstitials over the content someone just clicked to read, no autoplay with sound, no newsletter popup before the first paragraph.
- **Speed.** Core Web Vitals changed under a lot of people: Interaction to Next Paint replaced First Input Delay as a Core Web Vital on **12 March 2024**, and a good INP is under 200 milliseconds for at least 75% of visits ([Google, web.dev](https://web.dev/blog/inp-cwv-launch)). If your speed audit still reports FID, it is two years out of date.
- **Structure.** URL patterns, internal linking and a sitemap that reflects how the business is actually organised.
- **Device compatibility.** Test on real hardware, not only on a resized browser window. The details are in our guide to [responsive web design](https://pixelstreet.in/blog/responsive-web-design/).

## **Key advantages of having a good web design**

Design does not sell anything by itself. What it does is remove the reasons people leave, and that is worth paying for. Here is what each of the usual claimed benefits is actually worth.

### **Reduced bounce rates**

Worth knowing before you set this as a target: in GA4, bounce rate is the percentage of sessions that were _not_ engaged, which makes it the exact opposite of engagement rate ([Google Analytics Help](https://support.google.com/analytics/answer/12195621)). It is not the old metric with the same name. Chasing it is chasing an inverse. Watch engaged sessions, scroll depth on the pages that matter, and the conversions you actually named in step 1.

### **Consistency of brand**

Logo, palette, type and tone repeated across every page do more for recall than any single clever visual. This is where the website and the [branding process](https://pixelstreet.in/blog/complete-branding-process/) meet, and where a website built without a brand system quietly becomes five websites in a trench coat.

### **Improved Google rankings**

Design is not a ranking factor. Design removes the reasons a page underperforms: slow templates, unreadable text, buried content, a mobile layout that hides the answer. Google's own generative-AI optimization guidance is blunt about where the leverage sits, saying that creating content people find "unique, compelling, and useful" will influence a site's presence in AI search "more than any of the other suggestions in this guide" ([Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). A beautiful page with commodity content still loses. Our [SEO checklist](https://pixelstreet.in/blog/seo-checklist/) covers the rest.

### **A powerful first impression**

Skip the famous milliseconds statistic about how fast a visitor forms an impression. The practical test is better: open your homepage on a phone, and before scrolling, see whether a stranger could say what you sell, who you sell it to, and what to do next. Most homepages fail on the second one.

### **Responsive websites**

In India this is not a nice-to-have. Statcounter put mobile at **67.15%** of web traffic in India in June 2026, against 32.29% for desktop ([Statcounter Global Stats](https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/india)). Two thirds of your visitors are holding the site in one hand. Design there first.

## **The process of web design, from discovery to launch**

Before the steps, the table I wish more clients saw at kickoff. Every row has a prerequisite, and every project that ran late in my experience ran late because a prerequisite was skipped and everyone agreed to proceed anyway.

| Stage | What must exist before it starts | Where it stalls |
| --- | --- | --- |
| Goals | One person who can decide | A committee with no tiebreaker |
| Platform | The content model and the update cadence | Choosing the tool the last agency used |
| Scope | A page list and a revision count in writing | "Just one small change" in week seven |
| Design | Sitemap and real content structure | Designing around placeholder text |
| Content | A named author and a deadline | Waiting on copy nobody was assigned |
| Accessibility | A target: WCAG version and level | Discovering it during a client's legal review |
| Testing | A staging environment matching production | Testing on the designer's laptop only |
| Launch | A redirect map from the old URLs | Losing rankings nobody thought to protect |

### **1. Goal identification**

The first working session is not about design. It is about agreeing what the site has to achieve and how you will know. The questions we ask:

- Who is the audience, and what do they already know before they arrive?
- What is the single most valuable action a visitor can take?
- What message has to land, in the visitor's words rather than the internal ones?
- What do the three closest competitors look like, and where can you be legitimately different?
- How will we measure this in ninety days?
- Who updates this site in six months, and what happens if that person leaves?

That last question is the one most briefs skip and the one that most often predicts what the site looks like a year later. Write the answers down. A goal that lives only in a conversation is not a goal, it is a mood. If you are still choosing between studios, our list of [questions to ask before hiring a web design agency](https://pixelstreet.in/blog/questions-before-hiring-web-design-agency/) covers the same ground from the buyer's side.

### **2. Choose the right platform**

The version of this article that ran until today told you to pick WordPress and then listed WordPress's advantages. That is not a decision, that is a default with a justification attached.

The decision follows two things: the content model, and who updates the site. WordPress remains the safe answer for content-heavy sites where a non-technical team publishes regularly, and it is still the platform most of the web runs on. W3Techs put it at **41.2% of all websites** and 59.1% of sites with a known CMS on 30 July 2026 ([W3Techs](https://w3techs.com/technologies/details/cm-wordpress)). That popularity buys you a hiring pool, a plugin for most problems, and a large attack surface that you are then responsible for maintaining.

If the site is a store, the decision is a different one and we have argued it out in [Shopify vs WooCommerce](https://pixelstreet.in/blog/shopify-vs-woocommerce/). If it is a marketing site that changes twice a year, a heavy CMS is overhead you will pay for monthly. If nobody in the business will ever open the admin panel, be honest about that before you buy a publishing system. The wider comparison sits in our guide to the [best CMS platforms](https://pixelstreet.in/blog/best-cms-platforms/).

### **3. Scope of the design project**

Scope is where a friendly project becomes an unfriendly one. Three things belong in writing before design starts:

- **Time.** A schedule tied to dependencies, not to optimism. Write the milestones as "design starts when the content for the key pages is delivered", because a date with no prerequisite attached to it is a wish.
- **Cost.** An estimate built from the page list and the integrations, with milestones attached to payments. What the components actually cost in this market is broken down in our guide to [web design cost in Kolkata](https://pixelstreet.in/blog/web-designing-cost-in-kolkata/).
- **Revisions.** Name the number of rounds the price covers and what a round means. Not to be difficult, but because "unlimited revisions" is a phrase that ends friendships. The client who knows they have a fixed number of rounds gives better, more consolidated feedback, which is better for the work.

Scope creep is rarely one big change. It is eleven small ones, each individually reasonable, none of them costed.

### **4. Design creation**

This is the step everyone thinks of as web design, and it is roughly a fifth of the work. It has three parts:

- **Structure.** A sitemap that reflects how visitors think, not how the org chart is drawn.
- **Wireframes.** Layout and hierarchy before colour, so that the argument about the layout does not become an argument about the shade of blue. If you want to see the range of fidelity these come in, look at our [wireframe examples](https://pixelstreet.in/blog/top-20-wireframe-examples-for-web-design/).
- **Key templates.** Not every page. The homepage, the main landing template, an article template, a form page. Everything else is a variation.

Where AI genuinely changed this step: the blank page. Generating layout variations, first-pass moodboards and throwaway options costs almost nothing now, and Figma bundles AI credits into every plan including the free Starter tier ([Figma](https://www.figma.com/pricing/)). That is what it is good for: volume at the exploratory stage, where being wrong is cheap.

Where it did not change anything: the decisions. And be careful about assuming the tools are making you faster. In a randomised controlled trial run by METR in 2025, sixteen experienced open-source developers working on 246 real issues took **19% longer** with AI tools than without, while believing the tools had sped them up by 20% ([METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)). The gap between felt speed and measured speed is the thing to watch. If AI is compressing your early phases, measure it rather than assume it.

### **5. Elements of design and visual appeal**

- **Colour.** Choose a palette with a genuine hierarchy: one dominant, one supporting, one for actions. If everything is emphasised, nothing is.
- **Typography.** Two families is plenty. Set body text at a size you would read on a bus, then check line length on desktop where it tends to sprawl.
- **Graphics.** Illustrations and icons carry brand personality cheaply. DrawKit publishes free and paid illustration sets in Figma, SVG and Lottie formats ([DrawKit](https://www.drawkit.com/)), and Unsplash's licence permits commercial use without permission or attribution ([Unsplash](https://unsplash.com/license)). Both need editing to look like yours.
- **Restraint.** The most common mistake in small business design is not ugliness, it is volume.

### **6. Content creation**

Here is the step that decides your timeline, and almost nobody plans for it. Design is a fixed amount of work. Content is an open-ended amount of work owned by someone whose actual job is something else.

Content does two jobs. It moves people towards the action you named in step 1, and it is the thing search engines and AI assistants read. On the second point, Google's guidance is explicit and it cuts against most SEO advice from a few years ago: do not split content into fragments for machines, and do not write in a special style for AI systems. Write pages for people, and be non-commodity. Its own contrast is between an article titled "7 Tips for First-Time Homebuyers" and one titled "Why We Waived the Inspection & Saved Money" ([Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). One of those could have been written by anyone.

For keyword work, Google Keyword Planner is still the primary source for search volume, though it now requires you to complete Google Ads account setup including billing details ([Google Ads Help](https://support.google.com/google-ads/answer/7337243)), and [Google Trends](https://trends.google.com/trends/) is free and better for direction of travel. Put the target term in the title and the H1 because that is where a reader looks first, not because a machine demands it.

The practical rule we work to: no page enters visual design until its content brief exists, even in rough form. Designing around placeholder text produces layouts that break the moment real sentences arrive.

### **7. Accessibility, before it becomes expensive**

Most published web design processes have no step for this at all, and that omission is the biggest thing wrong with them. Accessibility is now both a design constraint and a legal one, and retrofitting it after launch costs several times what building it in costs.

The standard to name in the contract is WCAG, which reached version 2.2 as a W3C Recommendation on **12 December 2024**, adding nine new success criteria covering focus visibility, dragging movements, target size, consistent help and accessible authentication ([W3C](https://www.w3.org/TR/WCAG22/)). "Accessible" on its own is not a testable requirement. A version and a conformance level are.

The legal edge matters for Indian businesses that sell abroad. The European Accessibility Act applies as of **28 June 2025** and covers e-commerce platforms among its listed services ([AccessibleEU, European Commission](https://accessible-eu-centre.ec.europa.eu/content-corner/news/new-era-inclusion-begins-eaa-enters-force-2025-06-27_en)). A Kolkata exporter with a checkout serving EU consumers is inside that scope regardless of where the servers sit.

What this means in practice, during design rather than after it: contrast checked as part of the palette, focus states designed rather than removed, forms with real labels, headings in a sensible order, and a keyboard-only pass on every template. The free axe DevTools browser extension catches the automated share of the problems ([Deque](https://www.deque.com/axe/devtools/)), and the rest needs a human with a keyboard and a screen reader. The full treatment is in our guide to [website accessibility compliance](https://pixelstreet.in/blog/website-accessibility-compliance/).

### **8. Before launching, test the design**

Launching and then discovering the contact form has been quietly dropping enquiries is a particular kind of misery. Test on a staging environment that matches production, because conflicts that never appear locally appear there.

- **Forms.** Submit every one of them, from a phone, and confirm the message arrives at a mailbox someone reads.
- **Links.** Crawl the site. Screaming Frog's SEO Spider crawls 500 URLs free, which covers most marketing sites, and is $279 a year beyond that ([Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/)).
- **Real devices.** A mid-range Android on a patchy connection is the honest test in this market, not a simulator on office wifi.
- **Browsers.** You built it in one. Check it in the others, including the in-app browsers inside Instagram and WhatsApp, where a large share of Indian traffic arrives.
- **Consent and notices.** This has changed at home. India notified the Digital Personal Data Protection Rules, 2025 on **14 November 2025**, with an eighteen-month period for phased compliance, and they require every data fiduciary to issue a separate consent notice that is clear and easy to understand and that explains the specific purpose for which personal data is collected ([Press Information Bureau](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)). That reaches the innocuous contact form on the site you are about to launch, not only the large platforms.

### **9. Go live**

Before the switch: a redirect map from every old URL to its new home, analytics and Search Console verified on the new property, and a rollback plan. Sites lose rankings at launch for one boring reason, which is that nobody mapped the old URLs. Configure measurement now rather than after, so the first month is not a blank.

After the switch, expect a list. There is always a list. The first week after launch is part of the project, not a warranty claim, and pricing it that way keeps everyone honest.

## **Post-launch work on the site**

Launching is not the end of the web design process. It is the point at which the site starts costing money in a different way, and the projects that go badly are usually the ones where nobody budgeted for this.

### **Maintain your website**

Security first. Nothing damages traffic, rankings and reputation faster than a compromise, and on WordPress the usual entry point is an abandoned plugin nobody has updated. Core and plugin updates on a schedule, backups you have actually restored once, and an activity log someone reads. If you want to understand what a real security assessment involves rather than a plugin's marketing claim, our [VAPT guide](https://pixelstreet.in/blog/vapt-guide/) covers it.

### **Continue to add and create content**

A site that never changes stops earning attention. Publishing builds relevance for more queries and gives people a reason to trust the business. Decide at handover who does it, the client or us, and put that in the agreement rather than assuming.

## **What tools can help you improve your website design?**

A caution before the list. Tools die, and processes that were built around a tool die with it. Adobe XD, which a great many process guides still recommend, is in maintenance mode: Adobe has said it is "not investing in ongoing development or shipping new features" and that XD "is no longer being sold as a single application to new customers" ([The Register, quoting Adobe](https://www.theregister.com/software/2024/01/31/adobe_no_plans_to_invest_in_xd_despite_its_figma_failure/1119427)). InVision, once the default for prototype review, is gone entirely: invisionapp.com now returns a permanent redirect to Miro. Any article still building a workflow on either is describing a workflow that cannot be run.

What I would build a process on today, chosen for the fact that the work survives the tool:

- **Design and prototyping.** Figma, which has a free Starter plan and a $16 per month Professional seat ([Figma](https://www.figma.com/pricing/)). The important part is that the source files are yours and exportable, whatever the tool.
- **Crawling and pre-launch checks.** Screaming Frog SEO Spider, free to 500 URLs.
- **Accessibility.** The axe DevTools extension for the automated pass, then a keyboard and a screen reader for the part automation cannot do.
- **Illustration and imagery.** DrawKit and Unsplash, both edited rather than dropped in raw.

## **The web design statistics you should not repeat**

Four figures follow this subject everywhere: that 94% of first impressions relate to design, that the average website costs $3,200, that a basic site takes two months, and that 54.8% of traffic was mobile in 2021. I have tried to trace each of them to a primary study I could name and link, and every one leads to another agency blog citing another agency blog.

Where a number genuinely helps, use one you fetched and dated: Statcounter for mobile share, W3Techs for platform share, W3C for contrast, Google for INP. For what a site costs in this market, we publish our own breakdown in the [Kolkata pricing guide](https://pixelstreet.in/blog/web-designing-cost-in-kolkata/) rather than quoting an American average. For timelines, say what drives them instead of inventing a number that sounds authoritative.

## **Frequently asked questions**

### **How long does a web design project take?**

Longer than the design work justifies, and the reason is almost always content and approvals rather than production. The variables that move a schedule are the number of pages needing original copy, the number of people who can say no, the integrations, and whether photography has to be shot. Ask any studio to tie their schedule to those dependencies rather than to a flat number of weeks.

### **Does the process change if AI writes the first draft?**

The early phases compress. Exploration, layout variants and first-pass copy are cheap now. The deciding phases do not compress, because they are decisions rather than production: what the site is for, what goes on the homepage, what gets cut. And measure the saving instead of assuming it, given that the METR trial found experienced developers were slower with AI while feeling faster.

### **Do Indian businesses need to follow WCAG?**

If you sell to consumers in the EU, the European Accessibility Act has applied since 28 June 2025 and covers e-commerce, regardless of where your business sits. Domestically the direction of travel is the same, and I set out the Indian rulings and regulator circulars in the [agency hiring guide](https://pixelstreet.in/blog/questions-before-hiring-web-design-agency/). In either case WCAG 2.2 is the standard to name in a contract, because it is testable. [Our accessibility guide](https://pixelstreet.in/blog/website-accessibility-compliance/) has the detail.

### **Can I run this process myself?**

For a small site, yes, and the honest walkthrough is in [how to design a website by yourself](https://pixelstreet.in/blog/designing-a-website/). The step that does not survive DIY is the decision about what to leave out.

### **What is the difference between web design and web development?**

Design decides what should exist and how it behaves. Development makes it work under load, with real data. On small projects the same people do both, which is where the confusion starts. We separate the two in [web design vs web development](https://pixelstreet.in/blog/web-design-vs-web-development/).

## **What I would do first**

If you are about to start a website project, do not begin with a moodboard. Begin with one sentence describing what the site must achieve and one name of the person who decides. Then get the content for five pages written before anyone opens a design tool. Do those two things and the rest of this process gets easier and cheaper. Skip them and no amount of visual craft will save the schedule.

That is the process we run at Pixel Street when we [design websites](https://pixelstreet.in/web-design-company-kolkata) for clients. Take it, adapt it, argue with the parts you disagree with. The one part I would not drop is step 1.

## Sources

- [AccessibleEU (European Commission)](https://accessible-eu-centre.ec.europa.eu/content-corner/news/new-era-inclusion-begins-eaa-enters-force-2025-06-27_en) — published 2025-06-27
- [Deque Systems](https://www.deque.com/axe/devtools/)
- [DrawKit](https://www.drawkit.com/)
- [European Commission](https://commission.europa.eu/news-and-media/news/eu-becomes-more-accessible-all-2025-07-31_en) — published 2025-07-31
- [Figma](https://www.figma.com/pricing/) — published 2026-07-30
- [Google (web.dev)](https://web.dev/blog/inp-cwv-launch) — published 2024-03-12
- [Google Ads Help](https://support.google.com/google-ads/answer/7337243)
- [Google Analytics Help](https://support.google.com/analytics/answer/12195621)
- [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) — published 2026-07-10
- [InVision (redirect observed on fetch)](https://www.invisionapp.com/)
- Khurshid Alam (own recommendation) (first-hand, Pixel Street)
- [METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — published 2025-07-10
- [Press Information Bureau, Government of India](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf) — published 2025-11-17
- Repudiated in-post (quoted in full in the article)
- [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) — published 2026-07-30
- [Statcounter Global Stats](https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/india) — published 2026-06-30
- [The Register, quoting Adobe](https://www.theregister.com/software/2024/01/31/adobe_no_plans_to_invest_in_xd_despite_its_figma_failure/1119427) — published 2024-01-31
- [Unsplash](https://unsplash.com/license)
- [W3C](https://www.w3.org/TR/WCAG22/) — published 2024-12-12
- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [W3Techs](https://w3techs.com/technologies/details/cm-wordpress) — published 2026-07-30

---

Published by Pixel Street — https://pixelstreet.in/. Human view: https://pixelstreet.in/blog/web-design-process-guide/ · Machine view: https://pixelstreet.in/blog/ai/web-design-process-guide/
