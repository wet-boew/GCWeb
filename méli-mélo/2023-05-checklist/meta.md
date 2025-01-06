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
  en: Checklist
  fr: Liste à cocher
description:
  en: Allows users to get feedback when completing a checklist
  fr: Permet aux utilisateurs d'obtenir une rétroaction alors qu'ils complètent une liste à cocher
modified: 2023-04-12
componentName: 2023-05-checklist
sponsor: ESDC - Francis Snoddy (@fsnoddy)

pages:
  examples:
    - title: Checklist
      language: en
      path: index.html

implementationPlan:
  - due: 2023-06
    what: Engage with TBS to show them this design pattern
  - due: 2023-10
    what: Review and identify requirement to make this functionality enterprise ready
  - due: 2023-11
    what: Produce accessibility and usability report on its usage on Canada.ca
  - due: 2023-02
    what: Have this feature as provisional feature in GCWeb and get TBS to publish guidance on how to use it.
  - due: 2023-11
    what: added possible alternative design (lead zero) as a more minimalist pattern. 

todos:
  - Write governance and rationale for use

output: false
---