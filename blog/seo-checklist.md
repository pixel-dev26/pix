---
title: "Ultimate SEO Checklist For Beginners"
url: "https://pixelstreet.in/blog/seo-checklist/"
author: "Khurshid Alam"
published: "2023-07-05"
updated: "2025-04-24"
categories: ["Digital Marketing"]
words: "5185"
cited_sources: "24"
publisher: "Pixel Street"
description: "Discover the ultimate SEO checklist for 2025, Follow our comprehensive guide to boost your rankings and drive high quality organic traffic."
machine_view: "https://pixelstreet.in/blog/ai/seo-checklist/"
license: "Quotable with attribution to pixelstreet.in"
---

# Ultimate SEO Checklist For Beginners

Most SEO checklists are written to be long. That is the wrong design goal. A beginner opens a seventy-item list, does the first four things, and never comes back to it.

I sell SEO work, so the commercial move here is to make the list look enormous and complicated. I am going to do the opposite. Below is a shorter, ordered list, with the items that stopped being true named as such rather than quietly carried forward.

The quiet carrying-forward is the real disease in this genre. Checklists still circulating tell you to optimise for EAT, to test your site with Google’s Mobile-Friendly Test, and to build links with a tactic Google’s own spam policy names as spam. Google added the second E in December 2022 and switched the Mobile-Friendly Test off in December 2023. None of that advice was dishonest when it was written. It is simply what a checklist becomes when it is published once and never audited.

So this page does two jobs. It gives you the checks, and it tells you which of yesterday’s checks to stop running. Where a correction matters, I have linked the primary document from Google, web.dev or Microsoft rather than a summary of it, because in this field the summaries are where stale advice goes to breed.

## The Short Version

If you only do six things, do these, in this order.

1. **Get verified and measurable.** Google Search Console, Bing Webmaster Tools, Google Analytics 4. Without these you are guessing, and guessing costs more than any tool.
2. **Make sure Google can crawl and render the mobile version of your site.** Google indexes the mobile version. If content is missing on a phone, it is missing from the index.
3. **Pick one primary keyword per page and actually map it.** One page, one job. Most beginner sites have four pages fighting over the same query and none of them winning.
4. **Write the page only you could write.** Google’s own guidance says unique, useful content matters more than every technical suggestion it makes.
5. **Fix the three page-speed numbers.** LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1.
6. **Earn links you did not buy.** Original data, broken-link outreach, being genuinely quotable. The shortcuts most checklists still recommend are named in Google’s spam policy.

Everything after this is detail. Useful detail, but detail.

## SEO Advice That Stopped Being True

If you are working from any SEO checklist written before 2025, assume it contains most of the left-hand column. I have linked the primary document for every correction so you can check me rather than take my word for it.

| Old advice | What is actually true now |
| --- | --- |
| Optimise for EAT | E-E-A-T. Google added a second E, for Experience, in [December 2022](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t). Trust is the most important of the four. |
| Fix your First Input Delay | FID was retired. [INP replaced it on 12 March 2024](https://web.dev/blog/inp-cwv-march-12). |
| Run Google’s Mobile-Friendly Test | Google retired the tool, the API and the Search Console Mobile Usability report on [1 December 2023](https://searchengineland.com/google-officially-drops-mobile-usability-report-mobile-friendly-test-tool-and-mobile-friendly-test-api-435377) and pointed people at Lighthouse. |
| Add FAQ schema for rich results | FAQ rich results stopped appearing in Google Search on [7 May 2026](https://developers.google.com/search/updates). Keeping the markup does no harm, but it buys you nothing in the results page. |
| Shorter URLs rank better | Google does not say this. Its [URL structure guidance](https://developers.google.com/search/docs/crawling-indexing/url-structure) only asks you to trim parameters that do not change the content. |
| Use LSI keywords | There is no such thing. Latent semantic indexing is a 1980s technique Google never used for this. Write about the topic properly instead. |
| Build links through ghost posting and guest posts | Google’s [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) name “links with optimized anchor text in articles, guest posts, or press releases distributed on other sites” as link spam, alongside “low-quality directory or bookmark site links”. |
| Go to google.com/webmasters | That URL now lands on Search Central documentation. Search Console lives at [search.google.com/search-console](https://search.google.com/search-console/about). |
| Add your Analytics Tracking ID | Universal Analytics is gone. GA4 uses a [Measurement ID](https://support.google.com/analytics/answer/9539598) beginning with G-. |
| Set up Google My Business | Renamed Google Business Profile in November 2021, and the standalone app was retired. Websites built inside Business Profile were switched off in March 2024. |
| List on Foursquare | Foursquare City Guide [shut down on 15 December 2024](https://foursquare.com/city-guide-sunset/); the web version followed in April 2025. |
| Check Search Console for penalties | Google’s word is [manual action](https://support.google.com/webmasters/answer/9044175), issued when a human reviewer finds a spam-policy breach. Algorithmic drops never appear in that report, which is why most people looking there find nothing. |

![Stale checklist advice fails in three distinct ways: retired, where the tool or feature was switched off, such as First Input Delay and the Mobile-Friendly Test; renamed, where the same product carries a new name, such as EAT becoming E-E-A-T and Google My Business becoming Google Business Profile; and never true, such as LSI keywords and the claim that shorter URLs rank better.](https://pixelstreet.in/blog/diagrams/seo-checklist-how-advice-rots.svg)

## The Order I Would Work In

Checklists usually fail because they present seventy equal-looking boxes. They are not equal. This is the sequence I would defend, and the reason each stage comes where it does.

1. **Access and measurement first.** Roughly an hour of work. Every later decision depends on data you do not have yet.
2. **Technical crawlability second.** A page that cannot be fetched or rendered cannot rank, however good it is. No point writing before this is clear.
3. **Keyword and intent mapping third.** Cheap to do, expensive to skip. Getting this wrong means writing the right article for the wrong query.
4. **Content fourth.** The slowest and highest-return stage. Do not start it before the three above.
5. **On-page polish fifth.** Titles, headings, internal links, structured data. Fast wins, but only on pages that already deserve to rank.
6. **Links and local last.** These compound, and they compound on top of something worth linking to.

That ordering is my recommendation, not Google’s. I put technical work before keyword research because I have lost more client months to an unrenderable page than to a badly chosen keyword.

![The six stages run in a fixed order: access and measurement, technical crawlability, keyword and intent mapping, content, on-page polish, then links and local. Each stage exists so the next one is not wasted, and content is the slowest and highest-return stage of the six.](https://pixelstreet.in/blog/diagrams/seo-checklist-working-order.svg)

## 1. Access And Measurement

The boring hour that pays for itself. None of it costs money.

- **Verify Google Search Console.** Sign in at [search.google.com/search-console](https://search.google.com/search-console/about), prove ownership, and submit your sitemap. This is where indexing problems, query data and manual actions surface.
- **Verify Bing Webmaster Tools.** Now at bing.com/webmasters. Worth it for one reason beyond Bing traffic: it is where you turn on [IndexNow](https://www.bing.com/indexnow), an open protocol that pings participating engines the moment you publish or update a page. WordPress, Wix and several CDNs support it with a plugin or a switch.
- **Set up Google Analytics 4.** Create the property, then install the Measurement ID beginning with G-. If someone hands you a tracking ID starting with UA-, that property stopped collecting data years ago.
- **Install Google Tag Manager, but only if you will use it.** It saves you editing site code for every tracking change. If you have one tag and no plans, it is a layer of complexity you do not need.
- **Check the Manual Actions report once.** Search Console, under Security and Manual Actions. Empty is the normal answer. If it is empty and your traffic still fell, your problem is algorithmic and no amount of clicking there will explain it.
- **Define what success means before you start.** Rankings are not the goal. Enquiries are. Write down the two numbers you will judge this work by.

## 2. Technical Checks

I run these before writing anything. They are unglamorous and they are the ones that silently cost the most.

### Crawling And Indexing

- **Publish an XML sitemap and submit it.** Yoast, Rank Math and most CMS platforms generate one automatically. Confirm it lists the pages you actually want indexed, and nothing else.
- **Read your robots.txt line by line.** The most expensive SEO mistake I see is a staging-site robots.txt that went live with the site and blocked everything.
- **Decide your AI crawler policy deliberately.** Search access and training access are separate opt-ins with separate user agents: `OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`. Most sites inherited whatever their host set by default. If being cited in AI answers matters to you, that default deserves a decision.
- **Fix crawl errors in Search Console.** Broken internal links, redirect chains, pages blocked by robots.txt. Screaming Frog will find them faster than clicking through reports.
- **Pick one canonical version and stick to it.** With or without www, http or https, trailing slash or not. Redirect the rest and set `rel="canonical"` so you are not competing against yourself.
- **Handle duplicate content at the source.** Usually it is parameter URLs, printer-friendly pages or paginated archives. Canonicalise or noindex; do not rewrite the copy to be “different enough”.
- **Give 404s a useful page.** Search, top links, a way back. A dead end costs you the visit. Search Engine Journal keeps a decent gallery of [404 page examples](https://www.searchenginejournal.com/404-page-examples/211154/).

### Mobile, Because Google Only Sees Mobile

This is the item people still treat as optional. Google’s documentation is plain: it “uses the mobile version of a site’s content, crawled with the smartphone agent, for indexing and ranking”, which it calls [mobile-first indexing](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing). Since July 2024 there are no desktop-only exceptions left.

- **Load your key pages on a real phone.** Not a simulator. Your phone, on mobile data, not office wifi.
- **Confirm nothing important is desktop-only.** Content hidden behind a desktop-only tab or lazy-loaded on hover may as well not exist.
- **Check tap targets and CTA visibility.** Every call to action should be reachable with a thumb without pinch-zooming.
- **Audit your popups.** Trigger them on interaction or exit intent, never on load. An interstitial that covers the content a visitor arrived for is the fastest way to lose them.
- **Test across resolutions.** Chrome DevTools handles most of it. BrowserStack, LambdaTest and Screenfly cover real devices when you need them. Google’s own Mobile-Friendly Test is no longer one of your options.

If your site fails these checks, the problem is the build rather than the SEO, and no amount of on-page work will paper over it.

![Testsigma's comparison table of seven responsive testing tools, scoring Testsigma, Responsinator, Screenfly, LambdaTest, Am I Responsive?, CrossBrowserTesting and BrowserStack across twelve rows including platform, cost, real device testing, automation, CI/CD and support. It is the vendor's own chart and its own product is the only one marked as covering every row.](https://pixelstreet.in/blog/media/rehosted/Responsive-check-list-1.jpg)

Source: [testsigma.com](https://testsigma.com/blog/wp-content/uploads/Responsive-check-list-1.jpg)

### Core Web Vitals: Three Numbers

There are exactly three thresholds, they are published by Google’s own web.dev team, and they are measured at the 75th percentile of real page loads, split between mobile and desktop.

| Metric | What it measures | Good |
| --- | --- | --- |
| LCP | How long the largest visible element takes to render | Under 2.5 seconds |
| INP | How long the page takes to respond to interactions | Under 200 milliseconds |
| CLS | How much the layout jumps while loading | Under 0.1 |

Source: [web.dev](https://web.dev/articles/vitals). You will see blog posts claiming the LCP target tightened to 2.0 seconds. It did not. Check the primary document before you rebuild a site around a number somebody rounded down for a headline.

- **Measure with real data, not lab data.** The Core Web Vitals report in Search Console uses field data from actual visitors. [PageSpeed Insights](https://pagespeed.web.dev/) shows you both, and Lighthouse gives you the diagnostics.
- **Start with images.** Correct dimensions, modern formats, explicit width and height so nothing shifts. On most sites this single fix moves LCP and CLS together.
- **Then look at third-party scripts.** Chat widgets, heat maps, four analytics tools. INP problems are usually somebody else’s JavaScript blocking the main thread.
- **Keep it in proportion.** Google is explicit that “Google Search always seeks to show the most relevant content, even if the page experience is sub-par” ([Search Central](https://developers.google.com/search/docs/appearance/page-experience)). Speed helps when competing pages are otherwise equal. It does not rescue a page nobody needs.

### HTTPS And Certificates

- **Serve every page over HTTPS.** Not just checkout, not just forms. Mixed content on one template undermines the whole site.
- **Check the expiry date and set a renewal reminder.** An expired certificate throws a full-page browser warning, and I have seen that cost a working week of enquiries.
- **Redirect http to https once, with a 301.** Not a chain of three hops.

If certificates are unfamiliar territory, the mechanics are in my [guide to SSL](https://pixelstreet.in/blog/comprehensive-guide-to-ssl/).

## 3. Keyword Research

Google sees, by its own count, “more than 5 trillion searches on Google annually” ([Google, March 2025](https://blog.google/products/ads-commerce/ai-personalization-and-the-future-of-shopping/), citing internal data from January 2025). None of that scale helps you. Perhaps forty of those queries matter to your business, and the whole job is finding those forty.

- **Start from what you sell, not from a tool.** Write down the words a customer would use. Tools are for validating that list, not generating it.
- **Check real volume in Keyword Planner.** It lives inside Google Ads now, not AdWords, which was renamed in 2018.
- **Read the results page before you commit.** If page one is all product pages, a blog post will not rank there, whatever the difficulty score says. This one check saves more wasted writing than any other.
- **Go long-tail early.** “Web design company in Salt Lake Kolkata” converts better and ranks faster than “web design”. Lower volume, higher intent, achievable.
- **Collect question keywords.** [Answer The Public](https://answerthepublic.com/) and [Google Trends](https://trends.google.com/trends/) are quick for this, and so is reading the People Also Ask box.
- **Map one primary keyword to one page, in a spreadsheet.** Two pages targeting the same query is the single most common problem I find in a beginner site audit.
- **Map keywords to buying stage.** Someone typing “what is a CMS” is not ready for your pricing page. Someone typing “best CMS for a jewellery brand” might be.
- **Read where your customers argue.** Subreddits, industry forums, the comments under competitor posts. Intent is easier to hear in someone’s own words than to infer from a volume column.

The full method, including how I handle low-volume terms worth chasing anyway, is in my [**keyword research guide**](https://pixelstreet.in/blog/advanced-keyword-research-guide/).

![Keyword Research Tools](https://pixelstreet.in/blog/media/2023/07/Keyword-Research-Tools-1.png)

### Competitor Gap Analysis

- **List five real competitors.** The ones ranking for your terms, not the ones you compare yourself to at conferences.
- **Find the queries they rank for and you do not.** Ahrefs, Semrush and Moz all do this. The free version is reading their sitemap and their top navigation.
- **Look for the gap they left, not the pages they wrote.** Copying a competitor’s article gets you a second-best version of it. The opening is the question none of them answered.

## 4. Content And E-E-A-T

This is where the checklists in circulation are most out of date, and where being out of date costs the most.

### The Extra E

Google’s quality rater guidelines have used four letters since December 2022. Experience, Expertise, Authoritativeness, Trustworthiness. The first E was added because a page written by someone who has actually done the thing is not the same as a page written by someone who has read about it. The current guidelines document is dated [11 September 2025](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf), which widened the Your Money or Your Life category and added guidance for rating AI Overviews without changing the underlying rating standard.

Two things in Google’s own [helpful content documentation](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) are worth pinning above your desk. First: “Of these aspects, trust is most important. The others contribute to trust.” Second, the self-assessment question: “Does your content clearly demonstrate first-hand expertise and a depth of knowledge (for example, expertise that comes from having actually used a product or service, or visiting a place)?”

![EEAT](https://pixelstreet.in/blog/media/2023/06/EEAT.png)

Source: [fatjoe.com](https://fatjoe.com/wp-content/uploads/2023/03/E-E-A-T-2-1.png)

### The Content Checks

- **Answer the question in the first hundred words.** Then expand. Burying the answer under six paragraphs of preamble is a habit borrowed from print, and it costs you both readers and machine citations.
- **Put a named human on the page.** Author byline, a real bio, credentials that can be checked. Anonymous advice is difficult to trust and easy for Google to discount.
- **Write the sentence only you could write.** Google’s guidance for AI search contrasts a commodity headline, “7 Tips for First-Time Homebuyers”, against a specific one, “Why We Waived the Inspection & Saved Money”. The second describes exactly one person’s experience. That is the difference.
- **Stop chasing word count.** Length is not a ranking factor. Google states there is “no requirement to break your content into tiny pieces for AI to better understand it”, and equally no reward for padding it out.
- **Use AI as a first draft at most.** Google’s [March 2024 spam policies](https://developers.google.com/search/blog/2024/03/core-update-spam-policies) added scaled content abuse, which covers “creating large amounts of unoriginal content that provides little to no value to users, no matter how it’s created”. Automation is not the violation. Volume without value is.
- **Add what a machine cannot generate.** Your own photographs, your own numbers, a screenshot of the actual result, an opinion you would defend in a meeting.
- **Write alt text for every image.** Describe the image, do not stuff the keyword. Screen readers use it, and so does image search.
- **Update rather than republish.** A revised page with a genuine change log beats a near-identical new post competing with the old one.

## 5. On-Page Checks

Fast to do, and worth doing only on pages that already have something to say.

- **One title tag per page, primary keyword near the front.** Written for a human deciding whether to click, not for a counter.
- **A meta description that sells the click.** Google often rewrites it. Write it anyway; when it is used, it is your advert.
- **One H1, then a sane heading outline.** H2s for sections, H3s for subsections, no skipped levels. Headings are how a scanning reader decides to stay.
- **Descriptive, readable URLs.** Words rather than IDs, and no dated folder structure you will regret. Not because short URLs rank better, but because a URL a human can read is a URL a human will paste.
- **Use the words your topic genuinely requires.** Synonyms, related concepts, the terms an expert would use. That is not LSI, which does not exist. It is writing about the subject properly.
- **Internal links with descriptive anchor text.** “Click here” tells nobody anything. Link the phrase that describes the destination.
- **Link out to your sources.** Linking to the primary document costs you nothing and is the difference between a claim and a fact.
- **Skip meta keywords.** Google has ignored the tag for well over a decade. If your SEO plugin still has the field, leave it empty.

### Structured Data: What Still Earns A Rich Result

Schema markup is not a ranking factor. It makes you eligible for specific search features, and the list of features keeps changing.

- **Still worth adding:** Organization or LocalBusiness, Article for editorial pages, Product with price and availability, Review and Breadcrumb.
- **No longer worth adding for rich results:** FAQPage. Those results stopped appearing on 7 May 2026, the documentation was withdrawn in June, and Search Console API support ends in August 2026. Existing markup is harmless, so there is nothing to rush and remove.
- **Not required for AI visibility.** Google is explicit: “Structured data isn’t required for generative AI search, and there’s no special schema.org markup you need to add” ([Search Central, May 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). If an agency is billing you for schema as an AI-citation tactic, that line is your answer.
- **Validate what you add.** The Rich Results Test tells you what Google can actually use. Markup that describes something not on the page is a policy violation, not a shortcut.

Keep a real FAQ section on your pages if your customers really ask those questions. Write it for them. Just stop expecting the search results page to pay you for it.

## 6. Links And Off-Page

Ghost posting and guest posts placed for the link are still standard advice in this genre, and they should not be. Google’s [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) list “links with optimized anchor text in articles, guest posts, or press releases distributed on other sites” and “low-quality directory or bookmark site links” as link spam. That has been true for years. It is just widely ignored.

### What I Would Actually Do

- **Publish something worth citing.** Original data, a survey of your own market, a methodology, a genuinely useful calculator. This is slow and it is the only link tactic that keeps working.
- **Broken-link outreach.** Find dead links on relevant pages, offer your live equivalent. You are doing the site owner a favour, which is why it converts.
- **Reclaim mentions you already have.** Search your brand name and find the places that mentioned you without linking. A polite email works surprisingly often.
- **Get listed where it is a real business signal.** Industry bodies, chambers of commerce, genuine local directories, supplier and partner pages. Not link farms.
- **Track your profile monthly.** Ahrefs, Semrush or Majestic. Watch for sudden spikes of low-quality links, which are more often somebody else’s negative campaign than your own doing.
- **Guest post for the audience, not the anchor text.** Writing on a site your buyers read is marketing. Writing on a site nobody reads to place an exact-match link is the thing the policy names.

The longer argument, including how I evaluate whether a link is worth the effort, is in my [backlinks strategy guide](https://pixelstreet.in/blog/backlinks-strategy-in-seo/), and the advanced tactics sit in [**advanced SEO techniques**](https://pixelstreet.in/blog/advanced-seo-techniques/).

![BuzzSumo](https://ignitevisibility.com/wp-content/uploads/2015/06/dsg.png)

Source: [ignitevisibility.com](https://ignitevisibility.com/wp-content/uploads/2015/06/dsg.png)

### Social, Honestly

Sharing a post on social media does not pass ranking credit. It gets the post in front of people, some of whom run websites, and links come from people. That is the whole mechanism. Treat social as distribution, not as an SEO tactic, and you will stop being disappointed by it.

## 7. Local SEO

For a business in Kolkata competing with agencies in Kolkata, this section outranks most of the technical work above. Local intent is the closest thing to a buyer raising a hand.

- **Claim and complete your [Google Business Profile](https://business.google.com/in/business-profile/).** Category, service area, hours, photographs, products. It is the same product as Google My Business; the name changed in November 2021 and the standalone app was retired.
- **Do not rely on a Business Profile website.** Google switched those off in March 2024. If a business.site address is still on your cards, it is a dead link.
- **Make name, address and phone number identical everywhere.** Your site, your profile, LinkedIn, every directory. Inconsistency reads as noise to both Google and an AI assistant checking whether you exist.
- **Pick directories that people in your market actually use.** In India that means Justdial, Sulekha and IndiaMART alongside Google, Apple Maps, Bing Places and LinkedIn. Foursquare is not on the list any more, and neither is any directory whose only purpose is hosting links.
- **Ask for reviews, and reply to all of them.** Reviews feed the map pack and they feed the AI assistants that read them. Replying to a bad one in public is worth more than ten unanswered good ones.
- **Make your contact page complete.** Full address, phone number that is answered, email, hours, an embedded map. This is also the page an AI engine reads to decide where you are.
- **Build genuine city pages, or none at all.** One page per location, with real local content. Twenty templated pages with the city name swapped is a doorway page, and Google names that too.

The mechanics of ranking in the map pack are their own subject, and I have covered them in [local SEO ranking factors and the map pack](https://pixelstreet.in/blog/guide-to-local-seo-ranking-factors-map-pack/).

![online directories for seo](https://onlinemarketinginct.com/wp-content/uploads/2020/04/Online-directories-for-SEO.jpg)

Source: [onlinemarketinginct.com](https://onlinemarketinginct.com/wp-content/uploads/2020/04/Online-directories-for-SEO.jpg)

## 8. The Layer Older Checklists Do Not Have

Everything above would have been a complete checklist in 2023. It is not complete now, because a growing share of searches ends inside a generated answer rather than on a list of links.

Google’s position, published in May 2026, is calmer than most agency decks: the best practices for SEO “continue to be relevant because our generative AI features on Google Search are rooted in our core Search ranking and quality systems” ([Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). So this is a short section, and most of it is things you have already done.

- **Answer the question near the top of your twenty most important pages.** Extractable answers get quoted. Buried ones do not.
- **Keep your entity details consistent.** Same business name, address and description everywhere. AI engines cross-check before repeating a claim about you.
- **Review your AI crawler permissions.** Covered above, and it is the item most often left on a default nobody chose.
- **Do not write specially for machines.** Google says directly: “You don’t need to write in a specific way just for generative AI search.” Chunking your prose into fragments and publishing an `llms.txt` file are both effort with very little evidence behind them.
- **Ask the engines about yourself once a month.** Fifteen buyer questions across ChatGPT, Perplexity and Google’s AI Mode, recorded in a sheet. That is your new scoreboard, and a rank tracker cannot see it.

If you want the argument rather than the checklist, I have written about [how SEO, AEO and GEO actually differ](https://pixelstreet.in/blog/aeo-vs-geo-vs-seo/) and where the three-retainer sales pitch falls apart.

## 9. Measurement

Pick five of these and review them monthly. Tracking twenty numbers nobody acts on is a way of looking busy.

- **Organic clicks and impressions, from Search Console.** Not sessions from a rank tracker. Real clicks from real results pages.
- **Click-through rate by query.** High impressions with a low CTR is the cheapest fix in SEO: the ranking already exists, only the title and description need work.
- **Rankings for a small, honest keyword set.** Fifteen to twenty terms you actually care about, tracked over months rather than days.
- **Conversions, defined as an enquiry.** Set up GA4 key events for form submissions and calls. Traffic that converts nothing is a vanity metric with a graph attached.
- **Engagement rate, not bounce rate.** GA4 measures engagement directly. Bounce rate is now simply its inverse, and it was always a noisy signal on a page that answers the question and ends.
- **Core Web Vitals field data.** From the Search Console report, quarterly. Chasing a lab score weekly is wasted effort.
- **Referring domains, not total backlinks.** A thousand links from one site is one vote.
- **AI referrals and citations.** Referral traffic from AI assistants in analytics, plus the monthly citation check above.

Link Search Console to GA4 so you can see which queries lead to which landing pages and which of those produce enquiries. That join is where SEO reporting stops being decorative.

## Tools Worth Paying For, And Tools That Are Free

Every tool below was working when I checked it in July 2026. Tool lists rot fast, so open the ones you plan to rely on before you build a process around them.

**Free, and enough to start:**

- [Google Search Console](https://search.google.com/search-console/about), for indexing, queries and manual actions.
- Bing Webmaster Tools, for Bing data and IndexNow.
- [PageSpeed Insights](https://pagespeed.web.dev/) and Lighthouse, for Core Web Vitals and diagnostics.
- [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/), free up to 500 URLs, for crawl errors and redirect chains.
- [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) or Rank Math, for on-page basics and sitemaps on WordPress.
- [Google Trends](https://trends.google.com/trends/) and [Answer The Public](https://answerthepublic.com/), for demand and question research.
- [Keyword.io](https://www.keyword.io/) and [Ubersuggest](https://neilpatel.com/ubersuggest/), for long-tail suggestions.
- [MozBar](https://moz.com/products/pro/seo-toolbar), for quick checks in the browser.
- [GTmetrix](https://gtmetrix.com/), for a second opinion on page speed.

**Paid, once you have outgrown the free tier:**

- [Ahrefs](https://ahrefs.com/) or [Semrush](https://www.semrush.com/). Pick one. Paying for both is a common and expensive mistake.
- [Moz Pro](https://moz.com/explorer), for keyword and link research.
- [Majestic](https://majestic.com/), for backlink analysis at depth.
- [SpyFu](https://www.spyfu.com/), for competitor paid and organic history.
- [Keywords Everywhere](https://keywordseverywhere.com/), for volume inline while you browse.
- [Google Analytics 4](https://analytics.google.com/), free, but budget the setup time honestly.

## If You Only Have One Week

Let me tell you what I actually believe, and it is uncomfortable for someone who sells SEO retainers. Most of the list above is not where a beginner’s first week should go.

Spend it on four things. Verify Search Console and GA4. Confirm Google can render your site on a phone. Fix the single worst page-speed problem, which will almost certainly be an image. Then rewrite your most important page so it answers, in its first paragraph, the exact question a buyer types.

That is four items out of roughly seventy. It will move more than the other sixty-six combined, and it is the part no tool can do for you. The rest is maintenance, and maintenance is what a retainer is for. I would rather say that plainly than sell you sixty boxes to tick.

The other thing I would say: audit your own advice on a calendar. This page told people to optimise for EAT for three and a half years after Google added the second E. I am not proud of that. Whatever you publish, put a date on it and a reminder to check it.

## FAQ

**How long does SEO take to work?**

For a new site, expect three to six months before rankings on anything competitive, and longer in a crowded market. Technical fixes and title rewrites can show movement in weeks because the page is already indexed. Content and links compound slowly. Anyone promising page one in thirty days is either targeting queries nobody searches or is about to do something you will have to clean up.

**Is EAT still a thing, or is it E-E-A-T now?**

E-E-A-T. Google added Experience as a fourth element in December 2022, and the current rater guidelines, dated 11 September 2025, still use it. In practice the extra E means a page written from having actually done the thing beats a competent summary of what others have written. Trust is the element Google calls most important; the other three feed it.

**Should I still add FAQ schema to my pages?**

Not for rich results. FAQ rich results stopped appearing in Google Search on 7 May 2026, Google withdrew the documentation in June, and Search Console API support ends in August 2026. Existing markup causes no harm and FAQPage is still a valid schema type, so there is nothing to rush and remove. Keep a real FAQ section for readers, and stop treating it as a route to extra space in the results page.

**What are the current Core Web Vitals thresholds?**

LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1, all measured at the 75th percentile of real visits and reported separately for mobile and desktop. INP replaced First Input Delay on 12 March 2024, so any checklist still telling you to fix FID is at least two years old.

**Do I need to check my site with Google’s Mobile-Friendly Test?**

You cannot. Google retired the tool, its API and the Search Console Mobile Usability report on 1 December 2023 and recommended Lighthouse instead. Since Google indexes the mobile version of your pages, the more useful test is loading your own site on your own phone on mobile data and looking for anything missing.

**Are guest posts a safe way to build links?**

Not when the point is the link. Google’s spam policies name links with optimised anchor text in guest posts distributed across other sites as link spam, and low-quality directory links alongside them. Writing for a publication your buyers actually read is good marketing and often produces a link as a side effect. The difference is whether the article would be worth publishing without the link in it.

**How many of these items does a small business really need?**

Fewer than you think, and in a specific order. Access and measurement, mobile crawlability, one keyword mapped per page, one page rewritten to answer the question properly. If those four are genuinely done, you are ahead of most of your local competitors, who have a longer checklist and a shorter attention span.

## Where To Go Next

Work down the list in order, one section a week, and mark the date you did each one. A checklist you revisit beats a longer checklist you abandon.

If SEO’s direction rather than its mechanics is what you are weighing, I have set out where I think this is heading in [**the future of SEO**](https://pixelstreet.in/blog/future-of-seo/). And if you would rather hand it to someone, we are a Kolkata studio that designs and builds for brands including Coca-Cola, ITC and Marico, and our **[SEO services](https://pixelstreet.in/seo-company)** start from the same list you just read. Either way, the list is yours.

## Frequently asked questions

### How long does SEO take to work?

For a new site, expect three to six months before rankings on anything competitive, and longer in a crowded market. Technical fixes and title rewrites can show movement in weeks because the page is already indexed. Content and links compound slowly. Anyone promising page one in thirty days is either targeting queries nobody searches or is about to do something you will have to clean up.

### Is EAT still a thing, or is it E-E-A-T now?

E-E-A-T. Google added Experience as a fourth element in December 2022, and the current rater guidelines, dated 11 September 2025, still use it. In practice the extra E means a page written from having actually done the thing beats a competent summary of what others have written. Trust is the element Google calls most important; the other three feed it.

### Should I still add FAQ schema to my pages?

Not for rich results. FAQ rich results stopped appearing in Google Search on 7 May 2026, Google withdrew the documentation in June, and Search Console API support ends in August 2026. Existing markup causes no harm and FAQPage is still a valid schema type, so there is nothing to rush and remove. Keep a real FAQ section for readers, and stop treating it as a route to extra space in the results page.

### What are the current Core Web Vitals thresholds?

LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1, all measured at the 75th percentile of real visits and reported separately for mobile and desktop. INP replaced First Input Delay on 12 March 2024, so any checklist still telling you to fix FID is at least two years old.

### Do I need to check my site with Google’s Mobile-Friendly Test?

You cannot. Google retired the tool, its API and the Search Console Mobile Usability report on 1 December 2023 and recommended Lighthouse instead. Since Google indexes the mobile version of your pages, the more useful test is loading your own site on your own phone on mobile data and looking for anything missing.

### Are guest posts a safe way to build links?

Not when the point is the link. Google’s spam policies name links with optimised anchor text in guest posts distributed across other sites as link spam, and low-quality directory links alongside them. Writing for a publication your buyers actually read is good marketing and often produces a link as a side effect. The difference is whether the article would be worth publishing without the link in it.

### How many of these items does a small business really need?

Fewer than you think, and in a specific order. Access and measurement, mobile crawlability, one keyword mapped per page, one page rewritten to answer the question properly. If those four are genuinely done, you are ahead of most of your local competitors, who have a longer checklist and a shorter attention span.

## Sources

- [Foursquare](https://foursquare.com/city-guide-sunset/) — published 2024-12-15
- [Google (Search Quality Rater Guidelines)](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf) — published 2025-09-11
- [Google (The Keyword)](https://blog.google/products/ads-commerce/ai-personalization-and-the-future-of-shopping/) — published 2025-03-03
- [Google Analytics Help](https://support.google.com/analytics/answer/9539598)
- [Google Search Central](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t) — published 2022-12-15
- [Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — published 2025-12-10
- [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) — published 2025-12-10
- [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/url-structure) — published 2025-12-10
- [Google Search Central](https://developers.google.com/search/docs/essentials/spam-policies) — published 2026-05-15
- [Google Search Central](https://developers.google.com/search/blog/2024/03/core-update-spam-policies) — published 2024-03-05
- [Google Search Central](https://developers.google.com/search/docs/appearance/page-experience) — published 2025-12-10
- [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) — published 2026-05-15
- [Google Search Central (documentation changelog)](https://developers.google.com/search/updates) — published 2026-05-08
- [Google Search Console Help](https://support.google.com/webmasters/answer/9044175)
- Khurshid Alam (own recommendation) (first-hand, Pixel Street)
- [Microsoft Bing](https://www.bing.com/indexnow)
- [Search Engine Journal](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/) — published 2026-05-10
- [Search Engine Land](https://searchengineland.com/google-updates-search-quality-raters-guidelines-adding-ai-overview-examples-ymyl-definitions-461908) — published 2025-09-11
- [Search Engine Land](https://searchengineland.com/google-officially-drops-mobile-usability-report-mobile-friendly-test-tool-and-mobile-friendly-test-api-435377) — published 2023-12-04
- [Search Engine Land](https://searchengineland.com/google-my-business-now-known-as-google-business-profile-as-google-migrates-features-to-maps-and-search-375767) — published 2021-11-04
- [Search Engine Land](https://searchengineland.com/google-shutting-down-websites-business-profiles-436393) — published 2024-01-09
- [web.dev (Google)](https://web.dev/articles/vitals) — published 2024-10-31
- [web.dev (Google)](https://web.dev/blog/inp-cwv-march-12) — published 2024-01-31
- [Wordtracker (quoting Google's John Mueller, 2019)](https://www.wordtracker.com/blog/keyword-research/breaking-down-the-myth-of-lsi-keywords-in-seo) — published 2025-09-15

---

Published by Pixel Street — https://pixelstreet.in/. Human view: https://pixelstreet.in/blog/seo-checklist/ · Machine view: https://pixelstreet.in/blog/ai/seo-checklist/
