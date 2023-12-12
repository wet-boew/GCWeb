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
  en: Steps list
  fr: Liste d'étape
description:
  en: Style ordered list and divs with steps number in circles.
  fr: Mise en style d'une liste ordonnée et de divs avec des numéros d'étape dans un cercle
modified: 2021-05-21
componentName: 2021-05-steps
sponsor: CRA - Christopher Oakes (@christopher-o)

pages:
  examples:
    - title: Steps
      language: en
      path: index.html

implementationPlan:
  - due: 2021-06
    what: Engage with TBS to show them this design pattern
  - due: 2021-10
    what: Review and identify requirement to make this functionality enterprise ready
  - due: 2021-11
    what: Produce accessibility and usability report on its usage on Canada.ca
  - due: 2022-02
    what: Have this feature as provisional feature in GCWeb and get TBS to publish guidance on how to use it.
  - due: 2023-12
    what: review updated CSS and governance added to validate usability toward stable
todos:
  - Review governance and rationale for the use of both designs

output: false
---
