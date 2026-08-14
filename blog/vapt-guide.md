---
title: "The VAPT Guide for 2026"
url: "https://pixelstreet.in/blog/vapt-guide/"
author: "Khurshid Alam"
published: "2023-01-10"
updated: "2025-04-23"
categories: ["WEB DEVELOPMENT"]
tags: ["Ultimate VAPT Guide", "VAPT Guide", "web design agency in kolkata", "web design agency kolkata"]
words: "4334"
cited_sources: "26"
publisher: "Pixel Street"
description: "Vulnerability assessment and penetration testing in 2026: OWASP Top 10:2025, PCI DSS v4.0.1, CERT-In six-hour reporting and the DPDP Rules, with tool ownership corrected."
machine_view: "https://pixelstreet.in/blog/ai/vapt-guide/"
license: "Quotable with attribution to pixelstreet.in"
---

# The VAPT Guide for 2026

Most VAPT guides are glossaries. They define vulnerability assessment, define penetration testing, list some tools, and tell you attackers are getting craftier. All true. None of it tells an Indian business owner the thing that actually decides what they do on Monday morning, which is that if you notice a breach in India, you have six hours to tell the government about it.

I run Pixel Street, a design and branding studio in Salt Lake, Kolkata. We design and build for brands like Coca-Cola, ITC and Marico. I am not a penetration tester and this post will not turn you into one. What I can do is tell you which standards actually apply in 2026, which of the tool names still in circulation are already wrong, and what a business here is legally on the hook for, with the primary documents linked so you can check me.

My position: for most Indian businesses the deadline that changes behaviour is not the attacker. It is the regulator. Security testing has stopped being a maturity badge and become a paperwork obligation with a rupee figure attached to failure.

## The Short Answer

![VAPT](https://pixelstreet.in/blog/media/2023/01/VAPT.png)

VAPT is two different jobs sold under one acronym. A vulnerability assessment is broad, mostly automated, and answers "what is weak here". A penetration test is narrow, human-led, and answers "can someone actually get in, and how far". You need both, on different schedules, and you should never accept one when you paid for the other.

Three dates set the clock for an Indian business:

- **Six hours.** CERT-In's directions under section 70B of the IT Act require entities to report the incident types listed in Annexure I "within 6 hours of noticing such incidents" ([CERT-In, 28 April 2022](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf)).
- **₹250 crore.** Under the DPDP Act, the highest penalty applies to a Data Fiduciary that fails to maintain reasonable security safeguards ([Press Information Bureau, 17 November 2025](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)).
- **Eighteen months.** The DPDP Rules were notified on 14 November 2025 with an eighteen-month phased compliance period, which runs out in May 2027 (same PIB source).

And one number for the size of the loss you are testing against. IBM's Cost of a Data Breach Report 2026 puts the global average at USD 4.99 million, a 12% rise and a record, with the India average at USD 2.79 million ([IBM, 29 July 2026](https://www.ibm.com/reports/data-breach)). Read the methodology before you quote that at anyone; I do so below, because the headline is more careful than it looks.

## The India Compliance Clock

This is the section that should shape your scope, your schedule and your budget. Work through it before you talk to a vendor, not after.

### CERT-In: six hours, and 180 days of logs held in India

On 28 April 2022 CERT-In issued directions under sub-section (6) of section 70B of the Information Technology Act, 2000. They became effective 60 days after issue, and CERT-In published an extension of timelines on 27 June 2022 covering MSMEs and certain validation requirements for data centres, VPS, cloud and VPN providers ([CERT-In directions under section 70B](https://www.cert-in.org.in/Directions70B.jsp)). As of July 2026 that page still lists the 2022 directions, the FAQ and the extension, with nothing superseding them.

Two clauses drive the work:

- **Reporting.** Service providers, intermediaries, data centres, body corporates and government organisations "shall mandatorily report cyber incidents as mentioned in Annexure I to CERT-In within 6 hours of noticing such incidents or being brought to notice about such incidents".
- **Logs.** The same entities "shall mandatorily enable logs of all their ICT systems and maintain them securely for a rolling period of 180 days and the same shall be maintained within the Indian jurisdiction".

That log clause is a hosting decision as much as a security one. If your stack ships logs to a region outside India by default, you have a problem that no penetration test will find for you, and it is worth checking against your provider before you sign anything. Our guide to [hosting services in India](https://pixelstreet.in/blog/best-hosting-services-in-india/) is a reasonable starting point for that conversation.

Annexure I is worth reading in full, because it is broader than most people assume. It lists twenty categories, including targeted scanning or probing of critical networks and systems, unauthorised access of IT systems or data, website defacement, attacks on servers, identity theft and phishing, denial of service, data breach, data leak, attacks on IoT devices, attacks affecting digital payment systems, fake mobile apps, and attacks affecting systems related to artificial intelligence and machine learning.

Note the first item. Targeted scanning or probing of critical networks is itself a reportable incident. That is precisely what a vulnerability assessment looks like from the inside of a monitoring stack, which is why written authorisation is not a formality and why your security team needs to know the test window in advance.

If you need an auditor with standing, CERT-In maintains a public list of [empanelled information security auditing organisations](https://www.cert-in.org.in/PDF/Empanel_org.pdf), currently running past 230 firms with addresses and named contacts. For regulated work in India, empanelment is usually the first filter applied to a shortlist.

### DPDP Act 2023 and the DPDP Rules 2025

Parliament enacted the Digital Personal Data Protection Act on 11 August 2023. The operative machinery arrived much later: the Government notified the DPDP Rules, 2025 on 14 November 2025, after a consultation that drew 6,915 inputs ([Press Information Bureau, 17 November 2025](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)).

Three things from that document matter for security testing:

1. The Rules introduce an eighteen-month period for phased compliance. Counted from the November 2025 notification, that lands in May 2027. It is a runway, not a reprieve.
2. The highest penalty under the Act, up to ₹250 crore, attaches to a Data Fiduciary's failure to maintain reasonable security safeguards. Failure to notify the Data Protection Board or affected individuals of a personal data breach can attract up to ₹200 crore, and any other violation up to ₹50 crore.
3. On a breach, the Data Fiduciary must inform every affected individual without delay, in plain language, covering what happened, the likely impact, the steps taken, and where to get help.

"Reasonable security safeguards" is the phrase to sit with. The Act does not hand you a checklist, which means the evidence you produce after an incident is the argument. Dated test reports, a remediation log and a retest are the cheapest form of that evidence I know of. Significant Data Fiduciaries carry more: independent audits and data protection impact assessments.

![CERT-In gives you six hours to report a listed incident from the moment you notice it, and requires 180 days of ICT logs held inside Indian jurisdiction. The DPDP Act's maximum penalties are 250 crore rupees for failing to maintain reasonable security safeguards, 200 crore for failing to notify a breach, and 50 crore for any other violation.](https://pixelstreet.in/blog/diagrams/vapt-guide-the-clock.svg)

### PCI DSS: v4.0.1 only, and every requirement is live

If you take card payments, the version history is short and the deadline has already passed. PCI DSS v3.2.1 was retired on 31 March 2024. Of the 64 new requirements introduced in v4.0, 51 were future-dated and became mandatory on 31 March 2025 ([PCI Security Standards Council, 20 August 2024](https://blog.pcisecuritystandards.org/now-is-the-time-for-organizations-to-adopt-the-future-dated-requirements-of-pci-dss-v4-x)). PCI DSS v4.0 itself was retired on 31 December 2024, leaving v4.0.1 as the only active version ([PCI SSC, 11 June 2024](https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1)).

The Council states directly that external vulnerability scans under Requirement 11.3.2 must be run at least once every three months by a PCI SSC Approved Scanning Vendor ([PCI SSC, 10 July 2024](https://blog.pcisecuritystandards.org/resource-guide-vulnerability-scans-and-approved-scanning-vendors)). The standard itself sits behind an agreement, so for the neighbouring cadences I am relying on a QSA's published summary rather than the PDF: internal scans under 11.3.1 at least once every three months, and internal and external penetration testing under 11.4.2 and 11.4.3 at least once every 12 months and after significant changes ([CompliancePoint, authorised QSA, 8 April 2024](https://www.compliancepoint.com/assurance/pci-dss-v4-0-vuln-pen-requirements/)). Confirm those against your own QSA before you build a calendar on them.

### ISO/IEC 27001:2022: the transition is over

IAF MD 26:2023 set a three-year transition to ISO/IEC 27001:2022, requiring certification bodies to complete transitions of certified clients within 36 months of the last day of the publication month, which the document states as 31 October 2025 ([International Accreditation Forum, 15 February 2023](https://iaf.nu/iaf_system/uploads/documents/IAF_MD26_Issue_2_15012023.pdf)).

The practical consequence in 2026 is a vendor-diligence one. If a supplier sends you a certificate that says ISO/IEC 27001:2013, the transition window for it closed. Ask for the 2022 certificate.

## Vulnerability Assessment: Finding What Is Weak

A vulnerability assessment works through your systems and networks to identify, evaluate and report security weaknesses. It leans on automation, it covers a lot of ground, and it produces a list. That list is the input to everything else.

### The four types worth naming

- **Network-based:** the security of your network infrastructure.
- **Host-based:** individual devices, servers and workstations.
- **Application-based:** specific software applications, which for most of the businesses we work with means the website and whatever sits behind it.
- **Wireless-based:** the security of your wireless networks.

### The lifecycle

![Vulnerability Management Cycle](https://pixelstreet.in/blog/media/2023/01/Vulnerability-Management-Cycle.png)

Vulnerability management is continuous, and the loop only closes on step four:

1. **Identification:** discovering vulnerabilities in your systems and networks.
2. **Evaluation:** assessing severity and likely impact.
3. **Remediation:** patches or other countermeasures.
4. **Verification:** confirming the fix actually worked.
5. **Monitoring:** watching for what appears next.

The step that gets skipped is verification, and skipping it is how a company ends up with three annual reports listing the same finding. If your engagement does not include a retest, you have bought a list, not an improvement.

## Penetration Testing: Finding What Is Exploitable

A penetration test is an authorised, simulated attack. It is scoped tighter than an assessment, it is led by a person rather than a scanner, and its output is a narrative of what someone was able to do.

### Black, white and grey box

1. **Black-box:** the tester has no prior knowledge of the target system.
2. **White-box:** the tester has full knowledge, including source code and architecture.
3. **Grey-box:** limited knowledge, often modelling a privileged insider.

Black-box tests feel more realistic and usually buy you less. A determined attacker has unlimited time; your tester has a fortnight. Giving them architecture and credentials spends that fortnight on depth instead of on reconnaissance you could have handed over on day one.

### The methodology

1. **Pre-engagement:** scope, goals, rules of engagement and written authorisation, agreed before anything is touched.
2. **Intelligence gathering:** collecting information about the target system, network or application to map the attack surface.
3. **Threat modelling:** ranking what was found by likelihood and impact so effort goes where the risk is.
4. **Vulnerability analysis:** scanning and reviewing for known weaknesses.
5. **Exploitation:** actively attempting to exploit what was found, to gain access, escalate privilege or disrupt a service.
6. **Post-exploitation:** establishing how far the compromise reaches and what an attacker could have taken.
7. **Reporting:** findings, risks, evidence and prioritised remediation.

Step five is the line between the two disciplines. If nothing was attempted, nothing was penetration tested.

## VA vs PT: The Difference That Costs Money

![VA & PT Differences & Similarity](https://pixelstreet.in/blog/media/2023/01/VA-PT-Differences-Similarity.png)

Source: [softwaretestinghelp.com](https://www.softwaretestinghelp.com/wp-content/qa/uploads/2018/01/Vulnerbility-Assessment-and-Penetration-Testing.jpg)

|  | Vulnerability assessment | Penetration test |
| --- | --- | --- |
| Question answered | What is weak here? | Can it be exploited, and how far does it go? |
| Breadth | Wide, across the environment | Narrow, against agreed targets |
| Method | Mostly automated scanning | Automated tooling plus manual exploitation |
| Output | A ranked list of findings | A narrative of attack paths, with evidence |
| Typical PCI DSS cadence | Every three months (11.3.1, 11.3.2) | Every 12 months and after significant change (11.4.2, 11.4.3) |
| What a bad vendor delivers | A scanner export with a cover page | The same scanner export, priced as a penetration test |

That last row is the practical reason to care about the distinction. Both deliverables look like a PDF full of CVEs. Only one of them cost a human two weeks.

## The Standard Your Tester Should Be Testing Against

OWASP's project page states that "the most current released version is the OWASP Top Ten 2025" ([OWASP Foundation](https://owasp.org/www-project-top-ten/)). The 2021 edition stood for four years, so a great deal of published guidance was written against a list that has now moved.

The 2025 order is Broken Access Control, Security Misconfiguration, Software Supply Chain Failures, Cryptographic Failures, Injection, Insecure Design, Authentication Failures, Software or Data Integrity Failures, Security Logging and Alerting Failures, and Mishandling of Exceptional Conditions ([OWASP Top 10:2025](https://owasp.org/Top10/2025/0x00_2025-Introduction/)).

![The OWASP Top 10:2025 in rank order, with the three moves that matter marked: server-side request forgery merged into Broken Access Control at one, Security Misconfiguration now second, Software Supply Chain Failures third in place of Vulnerable and Outdated Components, and Mishandling of Exceptional Conditions new at ten.](https://pixelstreet.in/blog/diagrams/vapt-guide-owasp-top-ten-2025.svg)

Three shifts are worth your attention when you scope a test:

- **Supply chain moved to third place** and got broader. The old "Vulnerable and Outdated Components" category became Software Supply Chain Failures. For anyone running a plugin-heavy CMS, that is the category your site most likely fails, and it is not fixed by a firewall.
- **Security Misconfiguration is now second.** Default credentials, verbose errors, open storage buckets, permissive CORS. Cheap to find and cheap to fix, which is exactly why it is embarrassing to be breached through one.
- **Server-side request forgery was merged into Broken Access Control**, and a new tenth category, Mishandling of Exceptional Conditions, covers what your application does when something unexpected happens.

Ask any vendor which edition their methodology maps to. If the proposal says OWASP Top 10 2021, or just "OWASP", you are buying last generation's checklist.

## The Tools, With Their 2026 Names

Tool names rot faster than technique. Here is the current list, with what each is and what it actually costs to start.

| Tool | Who owns it now | What to know in 2026 |
| --- | --- | --- |
| ZAP | ZAP Core Team, sponsored by Checkmarx | Free, Apache 2.0. It left OWASP in 2023, so "OWASP ZAP" now dates a document rather than naming a product. |
| Nessus | Tenable | Still the default commercial scanner. The free Essentials tier was cut from 16 targets to 5 with export disabled in Nessus 10.11.0 (20 November 2025). |
| OpenVAS | Greenbone AG | Free community edition, plus paid appliances. Greenbone rebranded its whole portfolio around the OPENVAS name in July 2025, so the community-edition naming you may remember is the part that is stale. |
| Nexpose | Rapid7 | Release notes stopped on 23 May 2025 and moved to the Command Platform. InsightVM is where Rapid7 points new work. |
| Burp Suite | PortSwigger | Community Edition is still free but is a manual toolkit with no automated scanner. Enterprise Edition was renamed Burp Suite DAST on 15 April 2025. |
| Metasploit | Rapid7 | Framework is still free and open source under a BSD-style licence, actively developed, currently on the 6.5 line. |
| Nmap | The Nmap Project | Free and open source, but under the Nmap Public Source License rather than the GPL. Worth knowing if you redistribute it. |
| Kali Linux | OffSec | Free, quarterly releases, currently 2026.2. |
| Acunetix | Invicti Security | Still sold under the Acunetix name, alongside Invicti (formerly Netsparker). Commercial only. |
| Fortify | OpenText | Micro Focus was acquired by OpenText on 31 January 2023. The products are being renamed to OpenText Static and Dynamic Application Security Testing. |
| AppScan Source | HCL Software | Not IBM. IBM divested AppScan to HCL effective 1 July 2019. |
| Checkmarx, Veracode | Checkmarx Ltd, Veracode | Both active, both commercial, both now positioned as platforms rather than single scanners. |

The tool list is the least important part of a proposal. Anyone can run Nessus. What you are buying is the judgement applied to its output, which is why I would rather see a named methodology than a logo grid.

## Static and Dynamic, Internal and External

VAPT gets sliced two ways, and both slices are useful when you write scope.

- **Static testing** reviews the code without running it, looking for classes of defect such as injection flaws and unsafe memory handling. Typical tools: OpenText Fortify Static Code Analyzer, Checkmarx, Veracode, HCL AppScan Source.
- **Dynamic testing** runs the application and attacks it, observing behaviour rather than reading source. Typical tools: Nessus, Nmap, Metasploit, Burp Suite, ZAP.

And by vantage point:

- **External VAPT** targets what faces the internet: the website, the web applications, the exposed services.
- **Internal VAPT** targets the network and servers behind the perimeter, modelling an attacker who is already inside or an employee who should not be.

## Why the Testing Is Worth the Money

![Why we need VAPT](https://pixelstreet.in/blog/media/2023/01/Why-we-need-VAPT.png)

Source: [yotta.com](https://yotta.com/product-service/vulnerability-assessment-penetration-testing/)

The honest case is narrower than the marketing case, so here is the honest one.

IBM's 2026 report associates offensive security testing, defined in the report as red teaming, penetration testing or vulnerability testing, with a breach cost USD 211,339 below the global average. IBM is explicit that it examined 30 contributing factors and measured each in isolation against the mean, so treat that as a correlation in a benchmark, not a return on investment you can bank ([IBM Cost of a Data Breach Report 2026](https://www.ibm.com/downloads/documents/us-en/16dd90a741c46c2c)).

The methodology deserves a paragraph, because this report is quoted more often than it is read. It is conducted by the Ponemon Institute and sponsored by IBM. The 2026 edition studied 602 organisations breached between March 2025 and February 2026 across 17 industries and 16 countries, interviewing 3,558 people with firsthand knowledge. Critically, it excludes very small and very large breaches: the incidents studied ranged from 2,590 to 115,380 compromised records. So it is a self-reported benchmark of mid-sized breaches, not a census, and not a study of the mega-breaches that make the news. The India average in that sample is USD 2.79 million, up from USD 2.51 million.

Beyond the money, a testing programme does four things that hold up in a room with lawyers in it:

1. Finds and closes gaps before somebody else finds them.
2. Produces dated evidence that you took reasonable security safeguards, which is the standard the DPDP Act sets.
3. Ranks severity, so a small team fixes the three findings that matter instead of forty that do not.
4. Satisfies the scan and test cadences your acquirer, auditor or enterprise client already asks about.

## Establishing a VAPT Programme

![VAPT Process](https://pixelstreet.in/blog/media/2023/01/VAPT-Process.png)

Source: [nuox.io](https://www.nuox.io/blog/what-is-vulnerability-assessment-penetration-testing)

1. **Assess what you actually have.** List the internet-facing assets first. Most organisations discover something they forgot they were running, and forgotten systems are where the unpatched software lives.
2. **Write the policy against your obligations.** Scope, frequency and severity thresholds should map to CERT-In, DPDP and, if cards are involved, PCI DSS v4.0.1. Do not invent a cadence when a regulator has already given you one.
3. **Decide who does the work.** For regulated or contractual testing in India, CERT-In empanelment is the usual filter. For everything else, judge the methodology and the sample report.
4. **Schedule it, including the retest.** A finding with no owner and no retest date is decoration.

## What You Should Get Back

A report that earns its fee contains all six of these. If a sample report is missing three, keep looking.

1. **Executive summary:** what was tested, what was found, what the business risk is, in language a non-technical director can act on.
2. **Detailed findings:** each issue described well enough that an engineer can reproduce it.
3. **Remediation guidance:** specific to your stack, accounting for what is realistic with your resources.
4. **Prioritisation:** ordered by risk, not by scanner severity score.
5. **Supporting evidence:** requests, logs and screenshots. Evidence is what separates a finding from an opinion.
6. **Retest:** a follow-up confirming the fixes worked. This is the deliverable most often quietly dropped from a quote.

## Legal and Ethical Ground Rules

Testing without permission is an offence, not a favour. Five rules to keep to:

1. **Get written authorisation** from someone with authority to give it, before any activity begins, with the scope and the test window named. Remember that CERT-In's Annexure I treats targeted scanning of critical networks as a reportable incident, so your own monitoring team needs to know too.
2. **Know which laws apply to you.** In India that means the IT Act and the CERT-In directions, plus the DPDP Act and Rules. If you serve customers abroad, GDPR and sector regimes such as HIPAA or PCI DSS may also apply.
3. **Respect third-party boundaries.** If the scope touches a hosting provider, a payment gateway or a SaaS platform, you need their authorisation as well as your own. Most publish a policy on this.
4. **Protect the findings.** A penetration test report is a working exploitation guide for your systems. Treat its distribution accordingly.
5. **Document everything.** Authorisation letters, test plans, findings, fixes, retests. This file is your evidence of reasonable safeguards if you ever have to produce it.

## What I Would Ask a Vendor Before Signing

This is my own list, formed from watching how these engagements are sold rather than from running them.

- Which OWASP Top 10 edition does your methodology map to? The answer should be 2025.
- What proportion of this engagement is manual? If the answer is vague, the deliverable will be a scanner export.
- Is the retest included in this price, or quoted separately?
- Can I see a redacted sample report, specifically a finding written up in full?
- Where will the test data and our logs be stored, and is that inside Indian jurisdiction?
- Are you CERT-In empanelled, and if not, why is that acceptable for our use case?

One more thing, aimed at the smaller businesses we mostly talk to. The recurring failure I see is not the absence of a test. It is a site built, launched, and then never patched, with a certificate that quietly expires and a CMS three major versions behind. If that is you, a penetration test is the wrong first purchase. Fix patching and [your SSL setup](https://pixelstreet.in/blog/comprehensive-guide-to-ssl/) first, then test. Testing a system nobody maintains only tells you what you already suspect.

## Frequently Asked Questions

### How often should we run VAPT?

If PCI DSS applies, the cadence is set for you: scans every three months, penetration tests at least every 12 months and after significant change. If it does not, annual penetration testing with quarterly scanning is a defensible baseline, and "after every significant change" matters more than the calendar. A major release deserves a test regardless of when the last one ran.

### Is a vulnerability scan enough on its own?

For some obligations, yes. For a claim that you took reasonable security safeguards, it is weak on its own, because a scan reports theoretical exposure while a penetration test demonstrates what an attacker could actually reach. The pairing is the point of the acronym.

### Do the CERT-In directions apply to a small company?

The directions are addressed to service providers, intermediaries, data centres, body corporates and government organisations, which is broad. CERT-In did publish an extension of timelines on 27 June 2022 giving relief to MSMEs on parts of it. If you are unsure where your organisation sits, that is a question for a lawyer rather than a blog post, and it is worth asking before an incident rather than during one.

### What does VAPT cost in India?

I am not going to quote a range, because I could not verify one against a published source and an invented figure would only help you get quoted badly. What I can tell you is what the price is made of: scope size, whether testing is manual or automated, tester seniority, whether a retest is included, and whether the vendor is CERT-In empanelled. Get three quotes with identical written scope and the spread will explain itself.

### Does the DPDP Act require penetration testing?

Not by name. It requires reasonable security safeguards, and the Rules add audit and impact-assessment duties for Significant Data Fiduciaries. Testing is one of the most legible ways to show you met that standard, which is a different claim from saying the statute names it.

### Our website is on WordPress. Where do we start?

With the supply chain, because that is where the OWASP 2025 list now points. Inventory every plugin and theme, remove what you do not use, and get on a patching schedule before you commission a test. Then look at the boring compliance surface around the site, including [accessibility obligations](https://pixelstreet.in/blog/website-accessibility-compliance/), which land on the same team and get neglected for the same reason.

## Where This Leaves You

The technical content of this post has a shelf life. Tools get renamed, the OWASP list moves every few years, and a new version of PCI DSS will land eventually. The structural point does not move: in India the reporting clock is six hours, the logs have to sit here for 180 days, and the maximum penalty for failing to keep reasonable security safeguards is ₹250 crore with an eighteen-month runway that ends in May 2027.

Test against that, not against a vendor's fear slide. And if you are choosing who does the work, our list of [questions to ask before hiring an agency](https://pixelstreet.in/blog/questions-before-hiring-web-design-agency/) transfers almost intact to security vendors, because the failure mode is the same one: a confident proposal, a vague scope, and no way to tell afterwards whether you got what you paid for.

I will date this post honestly. It was written on 30 July 2026, against the standards and directions linked above. If you are reading it well after that, check the versions before you trust the numbers, which is the same advice I would give about any security guide, including this one. As a **[web design company](https://pixelstreet.in/web-design-company-kolkata)**, the sites we hand over are the assets these rules attach to, so this is not a detached interest.

## Sources

- [CERT-In, Government of India](https://www.cert-in.org.in/Directions70B.jsp) — published 2022-06-27
- [CERT-In, Government of India](https://www.cert-in.org.in/PDF/Empanel_org.pdf) — published 2026
- [CERT-In, Ministry of Electronics and Information Technology, Government of India](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) — published 2022-04-28
- [CompliancePoint, Inc. (authorised QSA)](https://www.compliancepoint.com/assurance/pci-dss-v4-0-vuln-pen-requirements/) — published 2024-04-08
- [Greenbone AG](https://www.greenbone.net/en/blog/openvas-the-new-name-for-proven-greenbone-security/) — published 2025-07-30
- [IBM](https://www.ibm.com/investor/news/ibm-to-divest-select-software-products-to-hcl) — published 2019-07-01
- [IBM / Ponemon Institute](https://www.ibm.com/reports/data-breach) — published 2026-07-29
- [IBM / Ponemon Institute](https://www.ibm.com/downloads/documents/us-en/16dd90a741c46c2c) — published 2026-07-29
- [International Accreditation Forum](https://iaf.nu/iaf_system/uploads/documents/IAF_MD26_Issue_2_15012023.pdf) — published 2023-02-15
- [Invicti Security Corp](https://www.invicti.com/vulnerability-scanner-comparison/invicti-vs-acunetix) — published 2026
- Khurshid Alam (own recommendation) (first-hand, Pixel Street) — published 2026-07-30
- [OffSec Services Limited](https://www.kali.org/releases/) — published 2026-06-29
- [OpenText](https://community.opentext.com/cybersec/fortify/w/tips/53815/opentext-application-security-content-fortify-update-26-2) — published 2023-01-31
- [OWASP Foundation](https://owasp.org/Top10/2025/0x00_2025-Introduction/) — published 2025-11
- [OWASP Foundation](https://owasp.org/www-project-top-ten/) — published 2026
- [PCI Security Standards Council](https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1) — published 2024-06-11
- [PCI Security Standards Council](https://blog.pcisecuritystandards.org/now-is-the-time-for-organizations-to-adopt-the-future-dated-requirements-of-pci-dss-v4-x) — published 2024-08-20
- [PCI Security Standards Council](https://blog.pcisecuritystandards.org/resource-guide-vulnerability-scans-and-approved-scanning-vendors) — published 2024-07-10
- [PortSwigger](https://portswigger.net/blog/meet-burp-suite-dast-a-clearer-name-for-the-industrys-leading-dast-solution) — published 2025-04-15
- [PortSwigger](https://portswigger.net/burp/communitydownload) — published 2026
- [Press Information Bureau, Government of India](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf) — published 2025-11-17
- [Rapid7](https://docs.rapid7.com/release-notes/nexpose/) — published 2025-05-23
- [Rapid7](https://github.com/rapid7/metasploit-framework/tags) — published 2026-07-30
- [Tenable, Inc.](https://docs.tenable.com/release-notes/Content/nessus/2025.htm) — published 2025-11-20
- [The Nmap Project / Insecure.Com LLC](https://nmap.org/changelog.html) — published 2026-03-26
- [ZAP Dev Team](https://www.zaproxy.org/docs/zap-ownership/) — published 2024-09-24

---

Published by Pixel Street — https://pixelstreet.in/. Human view: https://pixelstreet.in/blog/vapt-guide/ · Machine view: https://pixelstreet.in/blog/ai/vapt-guide/
