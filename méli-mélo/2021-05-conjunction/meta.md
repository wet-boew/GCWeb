---
feature: méli-mélo
"@context":
  "@version": 1.1
  dct: http://purl.org/dc/terms/
  title:
    "@id": dct:title
    "@container": "@language"
  description: dct:description
  modified: dct:modified

title:
  en: Conjunctions (and/or)
  fr: Conjonction (et/ou)
description: Conjunctions for stacked or side by side decision points, and/or
modified: 2024-05-30
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
    what: Provide UX research and analysis to describe how pattern helps usability</li>
  - due: 2021-10
    what: Review and identify requirement to make this functionality enterprise ready
  - due: 2021-11
    what: Produce accessibility and usability report on its usage on Canada.ca
  - due: 2022-02
    what: Have this feature as provisional feature in GCWeb and get TBS to publish guidance on how to use it.

todos:
  - Review code and governance to balance optimal accessibility and ease of implimentation by users.

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
