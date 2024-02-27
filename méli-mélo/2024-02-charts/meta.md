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
  en: Charts
description:
  en: Create a visual representation of data in a table.
modified: 2024-02-26
componentName: 2024-02-charts
sponsor: Principal Publisher - ESDC, on behalf of CRA

pages:
  examples:
    - title: Charts - Static working examples
      language: en
      path: demo.html
    - title: Charts - Dynamic working examples
      language: en
      path: demo-dynamic.html
  documentation:
    - title: Charts - Documentation
      language: en
      path: index.html

implementationPlan:
  - due: 2024-03
    what: Integrate meli-melo to GCWeb.
  - due: 2024-09
    what: Engagement with the Digital Transformation Office (DTO) at Treasury Board Secretariat.
  - due: 2024-09
    what: Review and perform the identification of the feature transformation requirement to be able to complete the integration progress into GCWeb.
  - due: 2024-09
    what: Produce accessibility conformance report and attach usability report.
  - due: 2024-11
    what: Make GCWeb provisional component out of meli-melo.
  - due: 2025-03
    what: Stabilize the component and deprecate WET-BOEW charts & graphs including amongst other things working example translation, writing guidance, publishing ACRs, feature API documentation, etc.

todos:
  - Write governance and rationale for the use of this design

output: false
---
