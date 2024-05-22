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
  en: Campaign Menu
  fr: Menu pour une campaigne promotionelle
description: Example of a new menu that uses megamenu for md and lg, and GCWeb menu for sm and xs
modified: 2024-05-16
componentName: 2023-09-menu
sponsor: PCH - Nick Frenette (@nfrenette)

pages:
  examples:
    - title: Home
      language: en
      path: index.html
    - title: Calendar
      language: en
      path: calendar.html
    - title: About
      language: en
      path: about.html

implementationPlan:
  - due: 2024-05
    what: Stabilize the plugin amalgamation
  - due: 2024-08
    what: Revise the color for a better alignment with the Canada.ca default color scheme
  - due: 2024-08
    what: Collect user experience feedback on this redesigned menu after the Canada Day 2024 event
  - due: 2024-11
    what: Make the code independent from the wet-boew mega menu and from the GCWeb menu
  - due: 2024-11
    what: Engage with DTO and web apps community (ex. CDTS implementer) about this initiative
  - due: 2025-11
    what: Work toward a provisional plugin

todos:
  - Remove the dependencies on wb-menu for desktop and on gc-menu for mobile by rewritting the code

output: false
---
