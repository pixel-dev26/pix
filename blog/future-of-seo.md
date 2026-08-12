---
title: "The Evolution and Future of Search"
url: "https://pixelstreet.in/blog/future-of-seo/"
author: "Khurshid Alam"
published: "2023-06-05"
updated: "2025-04-24"
categories: ["Digital Marketing"]
words: "4729"
cited_sources: "15"
publisher: "Pixel Street"
description: "What the 2026 evidence from Google, Ahrefs and Pew actually shows about where search is going, and which of the confident 2023 predictions about it turned out to be wrong."
machine_view: "https://pixelstreet.in/blog/ai/future-of-seo/"
license: "Quotable with attribution to pixelstreet.in"
---

# The Evolution and Future of Search

**Summary.** Search did not get replaced. It got a layer bolted on top that absorbs the click, and that layer is now the main event. Google's AI Mode passed one billion monthly users within a year of launch, with queries more than doubling every quarter (Google, 19 May 2026).

This is what I would tell a client who asks whether search is finished. It is not finished. It moved, and the move is measurable.

I run a studio in Salt Lake, Kolkata that sells this work, so take the argument with data attached rather than on my word. Everything below carries a date and a primary source, including the four things I would bet on for 2029, so that somebody can score me on them when they come round.

## The Short Answer

Search did not get replaced. It got a layer bolted on top that absorbs the click, and that layer is now the main event. Google's AI Mode passed one billion monthly users within a year of launch, with queries more than doubling every quarter ([Google, 19 May 2026](https://blog.google/products-and-platforms/products/search/search-io-2026/)).

Two numbers tell you what that costs you. The Pew Research Center followed 900 US adults across 68,879 real Google searches and found people clicked a traditional result on 8% of visits where an AI summary appeared, against 15% where it did not. Clicks on the links inside the summary: 1% ([Pew Research Center, July 2025](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)). And ranking no longer buys you a place in that summary: only 37.9% of AI Overview citations come from pages in Google's top 10, down from roughly 76% in July 2025, across 863,000 keyword SERPs ([Ahrefs, March 2026](https://ahrefs.com/blog/ai-overview-citations-top-10)).

Halve the clicks, and break the link between ranking and being quoted. That is the whole change, and everything below is detail.

![Clicks on a traditional result fall from 15% of visits without an AI summary to 8% with one, and links inside the summary get 1%. Meanwhile AI Overview citations that also rank in the top 10 fell from about 76% to 37.9%.](https://pixelstreet.in/blog/diagrams/future-of-seo-two-numbers.svg)

Google's own framing, published 15 May 2026, is more useful than most of what my industry sells against it: "optimizing for generative AI search is optimizing for the search experience, and thus still SEO" ([Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). The craft survived. The scoreboard did not.

## Disruption in the way we had known Search – 1996 to 2026

Here is the long arc, then the part that actually affects your traffic today.

1. **PageRank (1996):** A core algorithm for web page ranking.
2. **Autocomplete (2004):** Suggests search queries as you type.
3. **Universal Search (2007):** Merges different search types into one result set.
4. **Voice Search (2008):** Enables voice-based search using virtual assistants.
5. **Caffeine (2010):** Indexing rebuild for faster result refreshment.
6. **Hummingbird (2013):** Shifts weight from keywords to conversational meaning.
7. **RankBrain (2015):** Uses machine learning to interpret search intent.
8. **Google Lens (2017):** Image recognition search.
9. **Neural Matching (2018):** Connects words and concepts in queries.
10. **BERT (2019):** Analyses word order and context across languages.
11. **MUM (2021):** Draws on audio, images and video, and works across language barriers.
12. **Multi-search (2022):** Image plus text in a single query.

Now the three years that decided the shape of the present. Every date here comes from [Google's own Search Status Dashboard](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history), which is the only ranking-update source I would put in a client report.

1. **2023 — the helpful content year.** Core updates in March, August, October and November, spam updates in October, and a helpful content update on 14 September that punished pages written for search engines rather than readers.
2. **2024 — the long one.** The March 2024 core update ran 45 days, the longest on record, paired with a March spam update. Then core updates in August, November and December, and spam updates in June and December. Separately, and more quietly, **Interaction to Next Paint replaced First Input Delay** as a Core Web Vital on 12 March 2024 ([web.dev](https://web.dev/blog/inp-cwv-launch)).
3. **2025 — AI Mode leaves the lab.** Core updates in March, June and December, and an August spam update that ran 26 days. AI Mode opened to all US users on 20 May with no Labs sign-up, and Google reported AI Overviews driving over 10% more Google usage in its biggest markets, naming the US and India ([Google, May 2025](https://blog.google/products-and-platforms/products/search/google-search-ai-mode-update/)). Gemini 3 landed in Search in November.
4. **2026 so far.** A Discover update in February, a spam update on 24 March followed three days later by a core update, a core update on 21 May that ran nearly 12 days, and a spam update on 24 June. Alongside those: Google's generative-AI optimisation guidance on 15 May, FAQ rich results ending on 7 May, and a Search Console report for AI surfaces in June.

Read that list again and notice what is missing. There is no update called "the AI one". The AI surface arrived through product launches, not through the ranking updates my industry watches obsessively. We were staring at the wrong dashboard.

## What Actually Moves the Needle Now

![Key factors shaping the future of SEO](https://pixelstreet.in/blog/media/2023/06/Key-factors-shaping-the-future-of-SEO.png)

A list of thirteen factors at roughly equal weight is a way of admitting you do not know which ones matter. This list is ranked, and the order is the argument.

### 1. Content only you could have written

Google put this above everything else in its own guidance: creating content people find unique, compelling and useful will influence your presence in generative AI search more than any other suggestion in the guide. Their example is the sharpest thing in the document. A page called "7 Tips for First-Time Homebuyers" against a page called "Why We Waived the Inspection & Saved Money". Same topic. One is a commodity, one is a person who was there.

This is the uncomfortable part for anyone selling content by the word, including us. A model already knows the consensus. It does not need your restatement of it, and it will not cite you for producing one. It cites you when you know something it cannot get elsewhere.

### 2. Technical health, stated correctly

A page a machine cannot fetch cannot be cited, which makes this boring work with a hard floor under it. The current Core Web Vitals thresholds are **LCP within 2.5 seconds, INP of 200 milliseconds or less, and CLS of 0.1 or less** ([web.dev](https://web.dev/articles/vitals)). If your agency's audit still measures First Input Delay, it has been out of date since March 2024, and you should ask what else in the template has not been opened since.

I have seen the LCP threshold quoted as 2.0 seconds in circulating decks. It is 2.5. Check the primary source before you commit a budget to closing a gap that does not exist.

### 3. Crawler access, as a decision rather than an inheritance

Most sites I audit have never had this conversation. Search access and training access are separate permissions with separate user agents, so it is entirely possible to block the crawler that would have quoted you while leaving the one you meant to block wide open. Whatever you decide, decide it deliberately, and check it against what your server actually returns rather than what robots.txt says.

### 4. Answer the question inside the page

Put the actual answer near the top, in plain words, before the context and the caveats. Use headings that name what the section contains. This helps a reader who arrived from a summary with a half-formed question, and the machine benefit is a side effect rather than the point.

Do not take this further than it goes. Google is explicit: "There's no requirement to break your content into tiny pieces for AI to better understand it." The fragmentation everyone was selling in 2025 is not a technique, it is a formatting habit.

### 5. Entity consistency

Identical business details across your site, Google Business Profile, LinkedIn and the directories that matter in your market. AI engines cross-check before they repeat a name, and contradictions read as noise. For a Kolkata studio this is more consequential than it sounds, because local listings here are full of half-abandoned duplicates with old addresses and dead phone numbers on them, and some of those duplicates are yours.

### 6. A scoreboard that measures the surface you are on

Rank tracking measures the game that is fading. Since June 2026 Search Console has carried a generative-AI performance report covering AI Overviews and AI Mode, and it is worth knowing exactly what it gives you: impressions, broken down by page, country, device and date, with **no clicks, no CTR and no queries** ([Search Console Help](https://support.google.com/webmasters/answer/16984139)). It tells you that you appeared. It will not tell you what appearing earned.

So pair it with something manual. Ask fifteen to twenty real buyer questions across the AI assistants your market uses, monthly, and record whether you appear and who gets cited instead. I set out the full method in [how to get your brand mentioned by ChatGPT](https://pixelstreet.in/blog/how-to-get-mentioned-by-chatgpt/).

## What Google Actually Said in May 2026

On 15 May 2026 Google published guidance on optimising for generative AI search. I would read it before approving anybody's proposal, including ours, because it contradicts a good deal of what is being invoiced.

It kills three tactics outright. There is no requirement to chunk your content into fragments. There is no need to write in a special register for machines: "You don't need to write in a specific way just for generative AI search." And there is no secret schema, which means schema markup sold as an AI-citation lever is being sold on a claim its own vendor has denied. Keep your Article markup for rich results. Stop paying extra for it as an AI tactic.

What it leaves standing is harder and cheaper: be worth quoting. The reason that lands as a strategy rather than a platitude is the Ahrefs finding above. Roughly a third of cited pages rank beyond position 100. Those pages are not winning on authority or on technical polish. They are winning because they answer one narrow question better than anything else on the web, and nobody can buy that for you.

If you are trying to work out which of the acronyms in your inbox describe real work, I have taken that apart separately in [AEO vs GEO vs SEO](https://pixelstreet.in/blog/aeo-vs-geo-vs-seo/).

## What Project Magi Actually Became

![Magi project by Google](https://pixelstreet.in/blog/media/2023/06/Magi-project-by-Google.png)

Source:[i.ytimg.com](https://i.ytimg.com/vi/WNQUFnCmxGw/maxresdefault.jpg)

The image above is how the story looked from outside in 2023, when Magi was a rumour that "might" reshape search.

Magi was a codename. It became the Search Generative Experience, which had a rough public start, and then it became the two things you deal with daily: AI Overviews sitting above results, and AI Mode as a separate conversational surface. Gemini 3 came to Search in November 2025, which Google described as the first time it had brought a Gemini model to Search on day one ([Google, 18 November 2025](https://blog.google/products-and-platforms/products/search/gemini-3-search-ai-mode/)). By I/O 2026 the default in AI Mode was Gemini 3.5 Flash.

The 2026 announcements are where the shape of the next few years shows. Google rebuilt the search box for the first time in over 25 years, added generative UI that assembles custom layouts, tables and interactive visuals in real time, and started rolling out agents that monitor the web against your criteria and, in some categories, call businesses on your behalf ([Google, 19 May 2026](https://blog.google/products-and-platforms/products/search/search-io-2026/)).

Read that last item as a business owner rather than as a marketer. If Google is placing calls to local businesses on a searcher's behalf, then how a business responds to a phone call becomes a ranking-adjacent problem. That is a genuinely strange sentence to write, and I do not think most agencies have priced it in.

Most forecasts written before all this landed on "increased competition" and "adaptation to new metrics", which is the sort of prediction that cannot be wrong because it does not say anything. The real answer was more specific: the summary took the click, and citation stopped tracking rank.

## Bard Is Gemini, and the Rename Was the Small Part

![Google Bard AI vs Chat GPT](https://pixelstreet.in/blog/media/2023/06/Google-Bard-AI-vs-Chat-GPT.png)

On 8 February 2024 Google wrote: "Bard will now simply be called Gemini" ([Google, February 2024](https://blog.google/technology/ai/google-gemini-update-sundar-pichai-2024/)). The graphic above is a Bard-versus-ChatGPT comparison, and every row of that genre of graphic was wrong by mid-2024.

You will not find such a table on this page, and the reasoning matters more than the omission. Those tables compare two products on training-data cutoffs, pricing tiers and model version numbers. Every one of those facts has a shelf life measured in weeks. Bard became Gemini, LaMDA gave way to the Gemini line, Gemini 3 shipped in late 2025 and 3.5 Flash by mid-2026. Any table I write today with a version number in it is a table that will embarrass me in eighteen months.

What has not moved in three years is the question underneath: which assistant do your buyers ask, and does it know you exist? That question was answerable in 2023 and it is answerable now, and it does not care what the model is called. If a competitor keeps coming up instead of you, the diagnostic version is in [why ChatGPT recommends your competitor](https://pixelstreet.in/blog/why-chatgpt-recommends-your-competitor/).

One piece of India-specific context that does belong in a durable post: when Google reported AI Overviews lifting Google usage by more than 10%, the two markets it named were the US and India. If you sell here, this is not a channel arriving later.

## What is E-E-A-T?

E-E-A-T stands for Experience, Expertise, Authoritativeness and Trustworthiness. It comes from Google's Search Quality Rater Guidelines, and the extra E for Experience was added in [December 2022](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t).

Two things worth saying plainly. First, raters do not rank your site. The guidelines describe what Google is aiming for, which makes them a statement of direction rather than a checklist with a score attached. Anyone selling you an "E-E-A-T audit" with a number on it invented the number.

Second, that first E has quietly become the most valuable letter in the acronym. Experience is the one component a language model cannot generate and a competitor cannot copy. Expertise can be summarised. Authority can be bought, slowly and expensively. Having actually done the thing cannot be either. Google's own homebuyer example is a lesson about Experience wearing a different label.

![EEAT](https://pixelstreet.in/blog/media/2023/06/EEAT.png)

Source: [fatjoe.com](https://fatjoe.com/eeat/)

### What to do about it

1. **Write from the work, not around it.** Name the client, the constraint and the outcome where your contracts allow it. One specific engagement outweighs a page of adjectives.
2. **Give your authors a real identity.** A named human with a history, not "admin". This blog carried "admin" as its author for years, which is a fair example of the gap between advice given and advice taken.
3. **Earn mentions, not just links.** Being talked about in places a model reads now does part of the job a backlink used to do alone.
4. **Make trust checkable.** Working HTTPS, a real address, a real phone number, terms and a privacy policy that match your actual practice.

## Importance of Search Intent for SEO

Intent is the part of 2023-era SEO that survived intact, and it got more important rather than less. An AI summary is an intent machine: it reads the question, decides what kind of answer the person wants, and assembles it. If your page serves a different intent from the query it targets, you are now invisible rather than merely ranked badly.

### Types of Search Intents

![Types of Search Intent](https://pixelstreet.in/blog/media/2023/06/Types-of-Search-Intent.png)

**Navigational:** the searcher wants a specific site and has already decided where they are going. "Pixel Street", "Gmail".

**Informational:** the searcher wants to know something. "What is CLS", "how long does a rebrand take". This is the intent AI Overviews have hit hardest, and it is where traffic loss shows up first.

**Commercial:** the searcher is choosing between options and wants comparisons and opinions. "Best CMS for a Shopify migration". This is where being quotable pays, because comparison queries are exactly what people now ask an assistant instead of a search box.

**Transactional:** the searcher is buying and mostly knows what. "Buy" plus a product name. Least disturbed of the four so far.

The practical shift is in where you spend. Informational pages that exist to catch traffic and funnel it are worth much less than they were in 2023. Commercial-intent pages with a real opinion in them are worth more.

## The SEO Tool Categories, and What Each Is For

Tool roundups run on feature lists lifted from the vendor's own marketing, usually with a count of how many AI features shipped this quarter. A number that changes every quarter is not a fact worth carrying, so there are none here.

What is worth saying is what the categories are for, since the categories outlast the products.

### Semrush

![Semrush](https://pixelstreet.in/blog/media/2023/06/Semrush.png)

Source: [semrush.com](http://semrush.com/)

The all-in-one platform category: keyword research, competitor gap analysis, technical crawling, rank tracking. Useful for diagnosis. The thing to watch is that its core report is still a ranking report, and ranking is the metric that stopped predicting citation. Buy it for the crawl and the competitive view, not for the scoreboard.

### Frase

![Frase](https://pixelstreet.in/blog/media/2023/06/Frase-1.png)

Source: [frase.com](http://frase.com/)

The content-brief category: read what ranks, produce an outline that covers the same ground. I would now treat that output as the definition of a commodity page. If a tool can derive your outline from the existing top ten, so can everyone else, and Google has said in as many words that this is the kind of page it wants to reward least. Useful for finding the gaps. Dangerous as a template.

### Outranking.io

![Outranking](https://pixelstreet.in/blog/media/2023/06/Outranking.png)

Source: [outranking.com](http://outranking.com/)

The workflow-automation category: outlines, internal link suggestions, optimisation passes at volume. My honest position, three years on, is that automating the whole content pipeline is now a way to manufacture pages nobody will cite. Automate the audit. Do not automate the argument.

None of this means tools are the problem. It means the tools got very good at producing the exact kind of page that Google's 2026 guidance singles out as replaceable.

## The Skyscraper Technique, and Why It Aged Badly

![Sky scraper technique](https://pixelstreet.in/blog/media/2023/06/Sky-scraper-technique.png)

Brian Dean of Backlinko named the Skyscraper Technique: find high-ranking content with a lot of backlinks, work out where it is thin, publish something better, then ask the people linking to the original to link to yours instead.

It worked, and its logic is now the problem. The method starts from what already ranks, which means it produces a slightly better version of the consensus by design. That was a winning move when the prize was a position in a list of ten. It is a losing move when the prize is being the one source quoted, because a model that already knows the consensus has no reason to cite your improved restatement of it.

The part that still works is the outreach and the honest assessment of where existing coverage is weak. The part to drop is the assumption that "better than the current best" is a strategy. Sometimes the right move is a page about something nobody has covered at all, which no competitive analysis will ever surface for you. I have written up the method and its limits in more detail in [the skyscraper technique](https://pixelstreet.in/blog/skyscraper-technique-seo/), and the broader on-page work sits in [**advanced SEO techniques**](https://pixelstreet.in/blog/advanced-seo-techniques/).

## Will AI Replace SEO?

No. But most of the reassurance on offer is worth nothing.

One thing in particular does not count as an argument: asking ChatGPT whether AI will replace SEO and quoting its answer, as though the tool were a disinterested analyst rather than a text generator with no stake in the truth and no access to the future. That is not evidence. It is a mirror.

Here is the argument I would actually make. Three years of data now exist, and they show a discipline being relocated rather than deleted. The clicks fell by roughly half where summaries appear. The link between ranking and citation broke. Google's own position is that optimising for AI search is still SEO. What all three of those have in common is that the underlying job did not change: make a business legible and credible to whatever system is routing buyers this year. Google was the referee. Now there are several referees, and they check the same kinds of credentials.

What is genuinely at risk is not the discipline, it is a specific job description. If your SEO work consists of keyword volume lookups, brief generation from the top ten, and a monthly rankings PDF, a model does all three now, faster and cheaper. That role is going. The role that survives is judgement about what is worth saying and the ability to get a business to say it.

I will be direct about the awkward part, since I sell this work. The version of SEO that is easiest to package and invoice, deliverables with tidy delivery dates, is the version most exposed. The version that holds is harder to sell because it depends on the client having something real to say. That is a worse business model and a better answer.

## What I Would Bet On for 2029

Predictions with no date and no falsifiable content are decoration. Here are four I would be happy to be scored on, along with what would prove each one wrong.

1. **Impressions become the primary organic metric, and clicks become a secondary one.** Search Console already reports AI impressions with no clicks attached. If the click data arrives and shows healthy AI click-through, I am wrong.
2. **Agentic search makes operational responsiveness a visibility factor.** Google is already calling businesses on searchers' behalf in some categories. If agents stay confined to booking flows and never influence which business gets contacted, I am wrong.
3. **The rank-tracking retainer disappears as a standalone product.** The Ahrefs finding cuts the ground out from under it. If top-10 overlap with citations climbs back above two thirds, rank tracking is a fine proxy again and I am wrong.
4. **First-hand experience becomes the only durable moat in content.** This is the one I hold most strongly and it is the least measurable, which I acknowledge. If models start reliably citing well-structured summaries of common knowledge over documented direct experience, I am wrong.

What is not on that list: interfaces. Voice, gestures and hardware make good conference talks and poor forecasts, and the changes that actually move traffic tend to arrive as a quiet product launch rather than as a named algorithm update.

If you want the current working checklist rather than the argument, it is in [the SEO checklist](https://pixelstreet.in/blog/seo-checklist/), which is maintained against these same sources.

## FAQ

**Is SEO dead in 2026?**

No, but the reassuring version of that answer is. Clicks on traditional results fall from 15% to 8% of visits when an AI summary appears (Pew Research Center, July 2025), and only 37.9% of AI Overview citations come from top-10 pages, down from about 76% a year earlier (Ahrefs, March 2026). Google's own position is that optimising for generative AI search is still SEO. The craft holds. The rankings-and-clicks scorecard is what is dying.

**What happened to Google Bard?**

It was renamed Gemini on 8 February 2024. The underlying LaMDA model gave way to the Gemini line, Gemini 3 came to Search in November 2025, and Gemini 3.5 Flash became the default model in AI Mode globally at I/O 2026. Any guide still comparing "Bard vs ChatGPT" has not been updated in over two years, which tells you how much else in it to trust.

**What were Google's most recent algorithm updates?**

Through mid-2026: a February 2026 Discover update, a spam update on 24 March, a core update on 27 March, a core update on 21 May that ran nearly 12 days, and a spam update on 24 June. The full record is on Google's Search Status Dashboard, which is the only list worth quoting, because third-party trackers include unconfirmed "updates" that are frequently just noise.

**Should I still use FAQ schema?**

Not for rich results. FAQ rich results stopped appearing in Google Search on 7 May 2026 and the documentation has been removed. A genuine FAQ section is still worth writing if your readers actually ask those questions, which is a different reason from the one most people were given.

**What are the current Core Web Vitals thresholds?**

LCP within 2.5 seconds, INP of 200 milliseconds or less, and CLS of 0.1 or less. INP replaced First Input Delay on 12 March 2024. If you have seen 2.0 seconds quoted for LCP, check the primary source on web.dev before spending anything against it.

**How do I know whether AI search is sending me anything?**

Search Console's generative-AI report has covered AI Overviews and AI Mode since June 2026, but it gives impressions only, with no clicks, CTR or queries. So combine it with AI referral traffic in your analytics and a monthly manual audit: fifteen to twenty real buyer questions asked across the assistants your market uses, with the answers and citations recorded in a sheet.

**Does any of this change for a business in India?**

The direction is the same, and the timing is not later than elsewhere. When Google reported AI Overviews increasing Google usage by more than 10% for the queries that show them, the two markets it named were the US and India. The practical local difference is entity data, because duplicate and stale business listings are widespread here, and cleaning those up is unglamorous work with a direct effect on whether an assistant can state your details with confidence.

## Frequently asked questions

### Is SEO dead in 2026?

No, but the reassuring version of that answer is. Clicks on traditional results fall from 15% to 8% of visits when an AI summary appears (Pew Research Center, July 2025), and only 37.9% of AI Overview citations come from top-10 pages, down from about 76% a year earlier (Ahrefs, March 2026). Google's own position is that optimising for generative AI search is still SEO. The craft holds. The rankings-and-clicks scorecard is what is dying.

### What happened to Google Bard?

It was renamed Gemini on 8 February 2024. The underlying LaMDA model gave way to the Gemini line, Gemini 3 came to Search in November 2025, and Gemini 3.5 Flash became the default model in AI Mode globally at I/O 2026. Any guide still comparing "Bard vs ChatGPT" has not been updated in over two years, which tells you how much else in it to trust.

### What were Google's most recent algorithm updates?

Through mid-2026: a February 2026 Discover update, a spam update on 24 March, a core update on 27 March, a core update on 21 May that ran nearly 12 days, and a spam update on 24 June. The full record is on Google's Search Status Dashboard, which is the only list worth quoting, because third-party trackers include unconfirmed "updates" that are frequently just noise.

### Should I still use FAQ schema?

Not for rich results. FAQ rich results stopped appearing in Google Search on 7 May 2026 and the documentation has been removed. A genuine FAQ section is still worth writing if your readers actually ask those questions, which is a different reason from the one most people were given.

### What are the current Core Web Vitals thresholds?

LCP within 2.5 seconds, INP of 200 milliseconds or less, and CLS of 0.1 or less. INP replaced First Input Delay on 12 March 2024. If you have seen 2.0 seconds quoted for LCP, check the primary source on web.dev before spending anything against it.

### How do I know whether AI search is sending me anything?

Search Console's generative-AI report has covered AI Overviews and AI Mode since June 2026, but it gives impressions only, with no clicks, CTR or queries. So combine it with AI referral traffic in your analytics and a monthly manual audit: fifteen to twenty real buyer questions asked across the assistants your market uses, with the answers and citations recorded in a sheet.

### Does any of this change for a business in India?

The direction is the same, and the timing is not later than elsewhere. When Google reported AI Overviews increasing Google usage by more than 10% for the queries that show them, the two markets it named were the US and India. The practical local difference is entity data, because duplicate and stale business listings are widespread here, and cleaning those up is unglamorous work with a direct effect on whether an assistant can state your details with confidence.

## Sources

- [Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10) — published 2026-03-02
- [Google (The Keyword)](https://blog.google/technology/ai/google-gemini-update-sundar-pichai-2024/) — published 2024-02-08
- [Google (The Keyword)](https://blog.google/products-and-platforms/products/search/gemini-3-search-ai-mode/) — published 2025-11-18
- [Google (The Keyword)](https://blog.google/products-and-platforms/products/search/search-io-2026/) — published 2026-05-19
- [Google (The Keyword)](https://blog.google/products-and-platforms/products/search/google-search-ai-mode-update/) — published 2025-05-20
- [Google (web.dev)](https://web.dev/blog/inp-cwv-launch) — published 2024-03-12
- [Google (web.dev)](https://web.dev/articles/vitals) — published 2026-07-10
- [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) — published 2026-05-15
- [Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/faqpage) — published 2026-05-08
- [Google Search Central Blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) — published 2026-06-03
- [Google Search Central Blog](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t) — published 2022-12-15
- [Google Search Console Help](https://support.google.com/webmasters/answer/16984139) — published 2026-06-03
- [Google Search Status Dashboard](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history) — published 2026-06-24
- Khurshid Alam (own recommendation) (first-hand, Pixel Street) — published 2026-07-30
- [Pew Research Center](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) — published 2025-07-22

---

Published by Pixel Street — https://pixelstreet.in/. Human view: https://pixelstreet.in/blog/future-of-seo/ · Machine view: https://pixelstreet.in/blog/ai/future-of-seo/
