---
feature: thématique
lang: en
title: AI Answers theme
description: Top banner for AI answers beta testing
componentName: th-ai-answers
expiry: February 28th, 2026
mainPage: index-en.html
cssClass:
- aia-banner
- aia-rescue
- aia-close
jsFunctions:
- aiAnswersAvailabilityCheck
a11yStatement: >
  These colours meet the colour contrast requirements as outlined in WCAG 2.1 AA Success Criterion 1.4.3: Contrast (Minimum). After validation using WebAIM online contrast checker, I certify that the colours used in this thematic are meeting a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text and also a contrast ratio of at least 3:1 for graphics and user interface components. Furthermore, the meaningful sequence is respected, meeting WCAG 2.1 AA Success Criterion 1.3.2. I did my due diligence and, to the best of my knowledge and understanding, all elements of this thematic are meeting WCAG 2.1 AA standards.
  Tested by Marc-André Garneau, marcandre.garneau@servicecanada.gc.ca. 2025-12-01.
pages:
  examples:
    - title: AI answers thematic
      language: en
      path: index-en.html
    - title: Thématique réponses IA
      language: fr
      path: index-fr.html
    - title: Edge case for AI Answers banner
      language: en
      path: edge-case.html
sponsor: Marc-André Garneau, Principal Publisher on behalf of Digital Transformation Office (DTO)

changes:
  - date: 2025-12-10
    description: Updated analytics strings to be bilingual and replaced invalid quotation marks with valid ones.
  - date: 2025-12-04
    description: Added edge case example page to demonstrate behaviour when integrated into AEM.
  - date: 2025-12-01
    description: This thematic provides a top banner to invite users to the beta testing of AI Answers. The banner includes a close button to dismiss the banner. The thematic also includes a rescue link at the bottom of the page for users who missed the banner or dismissed it by mistake. The intent of this thematic is to inform users about the AI Answers beta testing and to provide them with a way to access the beta testing page. It is meant to be temporary and used on around 100 pages (EN and FR) during the testing period.
    departmentImpact: This banner is necessary in order to provide our partner departments (TBS, ESDC EI, HC) with a link and message to try a beta test of AI Answers. The vision for AI Answers is that in 2026, it will be displayed on more and more pages on Canada.ca to provide help to visitors. The beta test this December provides DTO and our partner departments with a consistent method of offering access to AI Answers across a set of pages. By January, we hope that partner departments like IRCC and ESDC can offer access on larger sets of pages, rather than adding one by one.
    publicImpact: Previous DTO trials in summer and fall were displayed on a very limited set of pages through the PP inviter. Inviters are unwelcome interruptions to many users – some click them away without reading them, and were a temporary stage. We now seek to deploy a familiar sticky banner style invitation to use AI Answers. The impact on the public for those who wish to get help with their questions is positive – they can see the offer of AI Answers immediately. For those not seeking help, the impact is negligible. It does make their view of the page slightly shorter – but they can still click the X to remove the banner.

output: false
---
