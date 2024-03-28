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
  en: Collection sort
description:
  en: Sort a collection of elements based on CSS selectors.
modified: 2023-09-08
componentName: 2023-09-collection-sort
sponsor: Donald McDill Sites management, Service Canada  

pages:
  examples:
    - title: Collection sort
      language: en
      path: index.html

implementationPlan:
  - due: 2023-10
    what: Review and identify requirement to make this functionality enterprise ready.
  - due: 2024-02
    what: Have this feature as provisional feature in GCWeb.


todos:
  - Improve error handling
  - Data attribute option for sort value
  - Add tagfilter example

output: false
---
