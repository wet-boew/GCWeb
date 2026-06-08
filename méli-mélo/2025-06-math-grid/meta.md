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
  en: Math equation grid
  fr: Grille d'équations mathématiques
description:
  en: An accessible, printable and understandable pattern for simple math equations.
  fr: Un modèle accessible, imprimable et compréhensible pour des équations mathématiques simples.
modified: 2025-06-05
componentName: 2025-06-math-grid
sponsor: CRA - Christopher Oakes (@christopher-o)

pages:
  examples:
    - title: Math grid equation
      language: en
      path: index.html
    - title: Grille d'équations mathématiques
      language: fr
      path: index-fr.html

implementationPlan:
  - due: 2025-06
    what: Engage with DTO to show design pattern
  - due: 2025-08
    what: Review and identify requirement to make this functionality enterprise ready
  - due: 2025-09
    what: Produce accessibility and usability report on its usage on Canada.ca




todos:
  - Finalize design

changes:
  - Change: Add separation to rows rather than padding of cells, and to fix override issue
    How this affects design: Adds no visual difference, except when using borders, borders will now have better separation.

output: false
---
