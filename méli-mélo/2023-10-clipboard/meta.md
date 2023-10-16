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
  en: Copy to Clipboard
description:
  en: Create a button that when clicked copies the identified content to the clipboard.
modified: 2023-09-07
componentName: 2023-10-clipboard
sponsor: CRA - Andrew de Peiza (@andrewdp) + Christopher Oakes (@christopher-o)

pages:
  examples:
    - title: clipboard
      language: en
      path: index.html

implementationPlan:
  - due: 2023-11
    what: Engage with TBS to show them this design pattern
  - due: 2024-03
    what: Review and identify requirement to make this functionality enterprise ready
  - due: 2024-04
    what: Produce accessibility and usability report on its usage on Canada.ca
  - due: 2024-07
    what: Have this feature as provisional feature in GCWeb and get TBS to publish guidance on how to use it.

todos:
  - Write governance and rationale for the use of this design

output: false
---
