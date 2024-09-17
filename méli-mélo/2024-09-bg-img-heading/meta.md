---
feature: méli-mélo
"@context":
  "@version": 1.0
  dct: http://purl.org/dc/terms/
  title:
    "@id": dct:title
    "@container": "@language"
  description:
    "@id": dct:description
    "@container": "@language"
  modified: dct:modified

title:
  en: Background image heading
  fr: En-tête avec image de fond
description:
  en: Ajoute une image de fond à un en-tête.
  fr: Add a background image to a heading.
modified: 2024-09-04
componentName: 2024-09-bg-img-heading
sponsor: Principal Publisher - ESDC

pages:
  examples:
    - title: Background image heading
      language: en
      path: bg-img-heading-en.html
    - title: En-tête avec image de fond
      language: fr
      path: bg-img-heading-fr.html
  docs:
    - title: Background image heading
      language: en
      path: bg-img-heading-en.html
    - title: En-tête avec image de fond
      language: fr
      path: bg-img-heading-fr.html

implementationPlan:
  - due: 2024-09
    what: Deprecation of the GCWeb component and move to experimentation

output: false
---
