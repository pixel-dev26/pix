---
title: "Tricks to Use Midjourney In Web Design"
url: "https://pixelstreet.in/blog/midjourney-in-web-design/"
author: "Khurshid Alam"
published: "2024-05-18"
updated: "2025-04-23"
categories: ["Web Design"]
words: "1428"
cited_sources: "19"
publisher: "Pixel Street"
description: "Midjourney in web design: Unlock the power of AI-driven creativity to design personalized and highly engaging websites for your audience."
machine_view: "https://pixelstreet.in/blog/ai/midjourney-in-web-design/"
license: "Quotable with attribution to pixelstreet.in"
---

# Tricks to Use Midjourney In Web Design

Midjourney does not design websites. It makes pictures of websites, which is a different thing, and confusing the two is the most expensive mistake I see designers make with it.

I run Pixel Street, a web design and branding studio in Salt Lake, Kolkata. We design and build for brands like Coca-Cola, ITC and Marico. Midjourney is genuinely useful in that work, and it is useful for a narrower job than the tutorials suggest: mood, texture, reference and the first honest conversation with a client about direction. Not layout. Never a deliverable.

## The short version

- **Midjourney is not a Discord bot any more.** Its own Web vs Discord page tells you to pick whichever suits you, then documents an Editor that exists only on the web. If you skipped Midjourney because you did not want to work inside a chat server, that reason has expired.
- **Two of the most-taught tricks no longer reach the model you are running.** Multi-prompts and the `::` weight syntax are documented as working on model versions up to 6.1. The current default is V8.2. The syntax is not deprecated. It simply does not reach the model you get by default.
- **The weight range you will see quoted is wrong.** Prompt weights do not run 0 to 100. They never did.
- **Stealth Mode is a Pro-plan feature.** Midjourney’s terms say your content is publicly viewable by default. On Basic or Standard, that includes your prompts and your client’s unreleased visual direction. This is the single most important thing on this page for anyone doing client work.
- **The copyright position is unsettled.** Disney, Universal and Warner Bros. are all suing Midjourney, and the cases were consolidated in November 2025. Nothing is decided. Price that risk before you put generated imagery on a client’s live homepage.

## The user numbers quoted for Midjourney trace nowhere

Two figures follow Midjourney around: that it has “nearly 16 million active users” and that it has produced “almost 974 million images”. I went looking for where they came from.

Midjourney publishes no active-user figure at all. The 16 million traces back to the member count of its Discord server, repeated through statistics-aggregator blogs that cite each other. A Discord server membership is not an active-user count. It counts everybody who ever joined, including people who joined once in 2022 to look. The image total has the same provenance problem and no primary source I could find.

A number that sounds right and traces nowhere is worse than no number. If you want figures about AI adoption in design work that do publish their methodology, I have collected the ones that survive scrutiny in [the AI revolution in the design sector](https://pixelstreet.in/blog/the-ai-revolution-in-the-design-sector/).

## What Midjourney is actually for in a web design studio

Here is the honest division of labour, and it has not changed much even as the model has.

**It is good at** generating the imagery a page needs and nobody has shot yet: hero photography that does not exist, textures, backgrounds, abstract brand-adjacent visuals, and mood boards that let a client point at something instead of describing it. It is very good at producing eight directions in the time it used to take to produce one.

**It is bad at** anything with structure. Ask it for a homepage UI and you get a picture that looks like a homepage from three metres away and dissolves on inspection: type that is not type, buttons at sizes no thumb can hit, navigation that means nothing, a grid that does not survive being cut into components. That is not a prompting failure you can fix with better syntax. The model is generating pixels, not a layout system.

![Midjourney is good at imagery nobody has shot yet — hero photography, textures, mood boards, eight directions in the time for one — and bad at anything with structure: type that is not type, buttons no thumb can hit, a grid that will not cut into components.](https://pixelstreet.in/blog/diagrams/midjourney-in-web-design-division-of-labour.svg)

The examples below still ask it for UI, because they are worth keeping as evidence of exactly that. Read them as direction-finding, not as design. The moment a direction is chosen, the work moves into a real design tool and starts again from a grid.

## Midjourney is not a Discord bot any more

Most Midjourney guides still frame Discord as the way in. Midjourney itself now runs a [Web vs Discord comparison page](https://docs.midjourney.com/hc/en-us/articles/33329300781837-Web-vs-Discord) and is even-handed about it: “You can choose the one that fits your style, or enjoy using both!” What that page then describes is not even-handed at all.

Two differences matter for design work. The Editor is web-only, and it lets you crop, pan and adjust the aspect ratio at the same time, with the Vary Region inpainting tool built into it. On Discord each of those is a separate step. And working from reference images is a button on the web, against hosting the image on Discord, copying its URL and pasting it into a prompt.

If you are following an older tutorial that begins by telling you to join a server, it was written for a workflow that is no longer the main one.

## The prompting techniques that still work

Four techniques survive contact with Midjourney’s current parameter documentation. Get the formatting right before anything else, because a prompt copied out of a blog post often arrives with an en dash where Midjourney requires two hyphens. The docs are specific: parameters go at the end, there is a space before the dashes and no punctuation inside them.

### Decide what the page is for before you prompt

An e-commerce page, a portfolio and a service site have different jobs, and the prompt should carry the job rather than the adjectives. “Beautiful” and “modern” are the two least useful words you can give a model, because every training image was described that way by somebody.

Give it the audience and the commercial intent instead. For a shoe store aimed at a young audience:

`an e-commerce UI design for shoes, bold colour, young audience --ar 16:9`

![Midjourney Prompt for UI design](https://pixelstreet.in/blog/media/2024/05/pixelstreet.13_a_detailed_e-commerce_homepage_UI_design_for_sho_52f3d05f-f5fc-470e-aa2b-474eaccf4602-300x168.png)

### Subtract with the no parameter

Saying what you do not want is more reliable than piling on what you do. The parameter is `--no` and it takes a comma-separated list of things to push out of the image.

`an e-commerce homepage UI design for shoes --ar 16:9 --no laptop, mobile`

Removing device mockups is the specific case worth knowing. Ask a model for a website and it will very often hand you a photograph of a laptop on a desk with a website on it, because that is what the training data called a website. `--no` is how you get the screen without the furniture.

![an e-commerce homepage UI design for shoes, --ar 9:16 --no laptop or mobile](https://pixelstreet.in/blog/media/2024/05/a_detailed_e-commerce_homepage_UI_design_for_sho_52fea3b8-f640-426d-8270-fc80426f2bb1-300x168.png)

### Generate at the shape of the slot you are filling

This is the tip that saves the most rework, and it is worth being blunt about why. If you generate a square and then crop it into a wide hero band, you have thrown away the composition the model made. Generate at the shape the page actually needs and the subject sits where the layout wants it.

`--ar` takes the ratio directly. A wide hero is `--ar 16:9`. A mobile banner or a full-bleed phone screen is `--ar 9:16`. A card image is often `--ar 4:3` or square.

`an e-commerce homepage UI design for shoes --ar 9:16 --no laptop, mobile`

![Midjourney prompt for aspect ration](https://pixelstreet.in/blog/media/2024/05/a_detailed_e-commerce_homepage_UI_design_for_sho_db1879dd-497f-4b77-ac40-a08c1aa088e1-168x300.png)

Generate one set per ratio you need. Do not generate once and crop three ways.

### Cut the filler

Long prompts are not detailed prompts. “I want to create a hyper-realistic website for an e-commerce store for clothing and fashion that caters to younger customers and should be colourful” carries about five load-bearing words. The rest is dilution.

`e-commerce clothing store, young audience, colourful --ar 16:9`

This is the tip I would keep if I could keep only one. Every unnecessary word is a vote for something you did not mean.

## The two tricks that no longer reach the model you are running

Almost every Midjourney tutorial teaches multi-prompts and weights: separating concepts with a double colon so `cup:: cake` reads as two ideas, and attaching a number to weight one over the other, as in `blue::5`.

Midjourney’s [Multi-Prompts and Weights documentation](https://docs.midjourney.com/hc/en-us/articles/32658968492557-Multi-Prompts-Weights) is explicit about the limit: “Multi-prompts work with Midjourney versions 1, 2, 3, 4, Niji 4, 5, Niji 5, 6, Niji 6, and 6.1.” That list stops at 6.1. The current default is V8.2.

Be precise about what that means, because the internet is not. The Multi-Prompts and Weights page is still live documentation and `::` is not on any deprecated list. It is prompt syntax rather than a parameter, and the model most people are running does not implement it. Not broken, not retired, just out of reach unless you drop back to `--v 6.1` or older. If you do, the image below is what it produced.

![Multiple prompts](https://pixelstreet.in/blog/media/2024/05/image-11-300x147.png)

There is a second error that travels with this syntax wherever it is taught: that “the weight ranges from 0-100”. That was never true of prompt weights. Midjourney’s own documentation says an unspecified weight defaults to 1, and that negative weights are allowed as long as every weight in the prompt still adds up to a positive number. It also states that “using the no parameter is the same as using a -0.5 weight”, which is genuinely useful and almost never mentioned.

The 0 to 100 range belongs to a different parameter. Chaos runs 0 to 100. Stylize runs 0 to 1000 with a default of 100, and so does the style weight that goes with a style reference.

![Midjourney prompt for weight](https://pixelstreet.in/blog/media/2024/05/a_detailed_e-commerce_homepage_UI_design_for_sho_3ec5b619-6ccb-4ee1-a5a5-03c0b948fed2-1-300x226.png)

## What replaced them, and why it matters more for web work

Losing multi-prompts sounds like a loss until you see what arrived instead, because the replacement solves the problem a website actually has. A site is not one image. It is a hero, three section backgrounds, six card images and an About page portrait, and they all have to look like they came from the same brand.

Multi-prompt weights were never going to do that. Three parameters in the current list do.

- **Style Reference, `--sref`.** Point at an image, or at a style code, and Midjourney matches its look across everything you generate. `--sw` controls how strongly. This is the closest thing Midjourney has to a visual system, and it is the parameter I would learn first for site work.
- **The Style Explorer.** On the Explore page there is now a Styles tab of browsable style codes with example galleries. Find one that fits the brand, copy its `--sref` code, and every asset on the site can inherit it. This replaces the old tip about browsing the community for inspiration with something you can actually reuse.
- **Personalization and moodboards, `--profile`.** Train a profile on images you have rated or collected and it biases everything you generate towards that taste. For a studio with a house look, or a client with a locked visual identity, this is the leverage.
- **Omni Reference, `--oref`.** For carrying a specific person or object across images. It replaced Character Reference in V7.

The Explore page is usually presented as an inspiration feed: browse the community, open an image, read the prompt that made it. That undersells it badly. Treat it as a style-code library instead, because a `--sref` code is reusable across a whole site and a borrowed prompt is not.

## Three things to settle before this touches client work

### On Basic and Standard, your client’s work is public

Two sentences from Midjourney, and between them they decide whether you can use this on a real project. The [terms of service](https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service): “By default, Your Content is publicly viewable and remixable.” The [Stealth Mode documentation](https://docs.midjourney.com/hc/en-us/articles/32019750070669-Stealth-Mode): “Stealth mode is available only to Pro and Mega Plan members.”

Think about what that means in practice. You are exploring visual directions for a brand’s repositioning, six weeks before announcement. On a $10 or $30 plan, those explorations and the prompts that made them are visible on midjourney.com. I have never met a client who would sign off on that if it were explained to them in plain language, and most designers have never had it explained to them either.

If you generate anything for a client under NDA, you need the Pro plan. That is not a nice-to-have tier, it is the confidentiality tier, and it is a cost of doing the work rather than an upgrade.

### What you own, and where Midjourney’s own wording disagrees with itself

The terms of service, effective 27 May 2026, are more generous than most designers assume and more conditional than most designers notice. “You own all Assets You create with the Services to the fullest extent possible under applicable law. There are some exceptions:” The exceptions are the part to read. You gain no rights over other people’s trademarks or likenesses. Upscaling somebody else’s image does not make it yours: those “remain owned by the original creators”. And Midjourney keeps a perpetual, worldwide, non-exclusive, sublicensable, royalty-free, irrevocable copyright licence over what you make, which is how the public gallery is able to work at all.

Then there is the revenue threshold, which Midjourney states two different ways. The terms of service say that above $1,000,000 USD of gross annual revenue “you must be subscribed to a ‘Pro’ or ‘Mega’ plan to own Your Assets”. The [commercial-use help page](https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially) says a business over the same threshold needs “a Pro or Mega Plan to use your images commercially for your company”. Owning an asset and being licensed to use it are not the same thing, and I am not going to pretend I know which sentence governs. If you or your client are anywhere near that number, that is a question for a lawyer.

### The copyright question is open, and it is your client’s risk too

Disney and Universal sued Midjourney for copyright infringement in the Central District of California on 11 June 2025. Warner Bros. filed separately, and the actions were consolidated on 4 November 2025. Midjourney’s defence rests on transformative fair use. As of July 2026 there is no ruling.

Midjourney is careful about this in its own documentation, and the sentence is worth keeping in front of you: it “cannot offer guidance on copyright matters”. Neither can I. The point is that the licensing question your subscription answers and the copyright question the courts are working through are two different questions, and only one of them is settled by paying.

My own position, which I will defend: generated imagery is fine for internal exploration, mood boards and pitch work on any project. For a permanent brand asset on a live site for a client with a legal department, I would rather commission or license. The saving is not worth the conversation you will have if the case goes the other way. The wider version of that argument, applied to every AI tool we use, is in [what actually survived the hype in AI web design](https://pixelstreet.in/blog/artificial-intelligence-in-web-design/).

## What Midjourney costs in 2026

Every plan is a subscription and there is no free tier. Annual billing takes 20% off. These are Midjourney’s own published figures, from its [plan comparison](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans) and [GPU speed](https://docs.midjourney.com/hc/en-us/articles/32016412137741-GPU-Speed-Fast-Relax-Turbo) pages.

| Plan | Monthly | Annual | Fast GPU time | Stealth Mode |
| --- | --- | --- | --- | --- |
| Basic | $10 | $96 | 3.3 hr/month | No |
| Standard | $30 | $288 | 15 hr/month | No |
| Pro | $60 | $576 | 30 hr/month | Yes |
| Mega | $120 | $1,152 | 60 hr/month | Yes |

Standard and above include unlimited image generation in Relax Mode, which is the slower queue. Extra fast GPU time is $4 an hour on every plan. For a studio, the honest read of that table is that the decision is not about GPU hours at all. It is Basic for personal experiments, Pro for anything a client is paying for, and nothing in between makes much sense.

## Common questions

### Is Midjourney still only available through Discord?

No. Midjourney’s documentation covers a website and Discord side by side and describes the web Editor as the more capable of the two for cropping, panning, aspect-ratio changes and inpainting. Reference images are also far easier to use on the web.

### Do multi-prompts and the double-colon weights still work?

Only on older models. Midjourney documents multi-prompts as working on versions up to 6.1, and the current default is V8.2. The syntax has not been deprecated and the documentation for it is still live, but it does not apply to the model you get by default. On that model, use style references and personalisation instead.

### Can I use Midjourney images on a client’s commercial website?

Midjourney’s terms say you own the assets you create, with exceptions, and a business grossing over $1,000,000 USD a year has to be on Pro or Mega. That is the licensing question. The copyright question, which is whether the training data gives somebody else a claim, is being litigated and is not answered by your subscription.

### Which plan does a design studio need?

Pro, if you generate anything a client would not want seen. Stealth Mode is restricted to Pro and Mega, and on the cheaper plans your creations are public on midjourney.com.

### Can Midjourney design a whole website?

No. It produces an image of a website, and an image has no grid, no components, no responsive behaviour, no accessible contrast ratios and no type that survives being read. Use it to decide what a site should feel like, then build the site.

### Which model version am I on?

V8.1 became the default on 10 June 2026, and Midjourney launched V8.2 on 24 July 2026 with a focus on image quality and personalisation. Set a default in the settings panel on the web, or append `--v` and a number to a prompt.

## What I would actually do

Buy the Pro plan if you do client work, and treat the difference against Standard as the price of confidentiality rather than of speed. Learn `--ar`, `--no` and `--sref`, in that order, and ignore everything else until those three are automatic. Generate at the shape of the slot. Keep the output on the mood board and out of the deliverable until somebody wins the Disney case.

And check the tool’s own documentation before you repeat a technique you read somewhere. Prompting advice does not announce when it stops applying to the model you are running, and a statistic does not announce that it started life as a Discord member count. You find both out by going and looking, which takes an afternoon.

If you want the design decisions made rather than the prompts optimised, that is the job, and it is what we sell. Talk to a [**web design agency in Kolkata**](https://pixelstreet.in/web-design-company-kolkata) that reads the documentation before it repeats the advice.

## Sources

- [CourtListener](https://www.courtlistener.com/docket/71271014/warner-bros-entertainment-inc-v-midjourney-inc/) — published 2025-11-04
- [Justia Dockets](https://dockets.justia.com/docket/california/cacdce/2:2025cv05275/973999) — published 2025-06-11
- Khurshid Alam, arithmetic on Midjourney's published rates (first-hand, Pixel Street) — published 2026-07-31
- [Midjourney](https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service) — published 2026-05-27
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/32658968492557-Multi-Prompts-Weights) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version) — published 2026-07-24
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/32019750070669-Stealth-Mode) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/33329300781837-Web-vs-Discord) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/32099348346765-Chaos-Variety) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/32433330574221-Personalization) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/39193335040013-Moodboards) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/36285124473997-Omni-Reference) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/32016412137741-GPU-Speed-Fast-Relax-Turbo) — published 2026-07-31
- [Midjourney documentation](https://docs.midjourney.com/hc/en-us/articles/31894244298125-Aspect-Ratio) — published 2026-07-31
- unsourceable; repudiated on the page (quoted in full in the article) — published 2026-07-31

---

Published by Pixel Street — https://pixelstreet.in/. Human view: https://pixelstreet.in/blog/midjourney-in-web-design/ · Machine view: https://pixelstreet.in/blog/ai/midjourney-in-web-design/
