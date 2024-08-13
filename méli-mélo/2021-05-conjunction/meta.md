---
feature: méli-mélo
"@context":
  "@version": 1.1
  dct: http://purl.org/dc/terms/
  title:
    "@id": dct:title
    "@container": "@language"
  description:
    "@id": dct:description
    "@container": "@language"
  modified: dct:modified

title:
  en: Conjunctions (and/or)
  fr: Conjonction (et/ou)
description:
  en: Conjunctions for stacked or side by side decision points, and/or
  fr: Conjonctions pour des points de décision empilés ou côte à côte, et/ou
modified: 2024-08-07
componentName: 2021-05-conjunction
sponsor: CRA - Christopher Oakes (@christopher-o)

pages:
  examples:
    - title: And/Or decision points (Conjunctions)
      language: en
      path: index.html
    - title: And/Or decision points (Conjunctions) - Français
      language: fr
      path: index-fr.html

implementationPlan:
  - due: 2021-06
    what: Engage with TBS to show them this design pattern
  - due: 2021-06
    what: Provide UX research and analysis to describe how pattern helps usability
  - due: 2021-10
    what: Review and identify requirement to make this functionality enterprise ready
  - due: 2021-11
    what: Produce accessibility and usability report on its usage on Canada.ca
  - due: 2022-02
    what: Have this feature as provisional feature in GCWeb and get TBS to publish guidance on how to use it.
  - due: 2022-05
    what: updated to focus more on using as list items (with or without headers)
  - due: 2022-09
    what: updated CSS to allow nested decision points
  - due: 2022-11
    what: updated CSS to allow no border on always stacked items
  - due: 2023-07
    what: updated CRA to allow no border on all resolutions when stacked
  - due: 2023-08
    what: allow for zoom text resolution of 200%
  - due: 2023-10
    what: have this feature as provisional/stable feature in GCWeb and get TBS to publish guidance on how to use it.
  - due: 2024-04
    what: updated to fix design when text is smaller, make border visible in high contrast mode

todos:
  - Finalize design

changes:
  - date: 2024-06-20
    description: Changed border to appear in high contrast. Changed font size of CSS generated text to em value for better scalability between parent font sizes. Increased miminum height of side by side pattern to create consistant border above and below CSS text design. Updated governance towards stabilization.
    departmentImpact: No change from a departmental perspective.
    publicImpact: Allows border to be shown in high contrast (could require additional adjustment for FF and MacOS browsers). Fixed issue of using design in font sizes other than 20px (GCWeb standard)
  - date: 2024-08-07
    description: Change was to remove the side-by-side line separator in Firefox (but keep the shape and text) when in High contrast mode. The previous pattern had the line separator "cut" through the words (and/or) which could make it slightly illegible.
    departmentImpact: There is minimal impact, as we do not normally use Firefox as a browser, nor does the majority of users use high contrast mode on their devices.
    publicImpact: Only those who use high contrast mode with the Firefox browser, and will be a slight improvement on readability of the text.
output: false
---
