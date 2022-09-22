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
  en: Create an interactive SVG image map
  fr: Creation d'une image map SVG interactive
description: Link to content with an interative SVG image map
modified: 2022-09-21
componentName: 2022-09-svgimagemap
sponsor: Pacifican - Karina Perez (@karinapereznolasco)

pages:
  examples:
    - title: Create an interactive SVG image map
      language: en
      path: bcmap.html
    - title: Creation d'une image map SVG interactive
      language: fr
      path: cartebc.html

implementationPlan:
  - due: 2022-10
    what: Test this component with live content
  - due: 2022-10
    what: Engage with DTO (By end of october 2022), and discuss about guidance on this component/design pattern. Like when to use it? If it match our visual web presence?
  - due: 2023-01
    what: Make any adjustment, based on DTO (TBS) discussion or/and by implementation experience
  - due: 2022-12
    what: Produce a ACR (Accessibility Conformance Report)
  - due: 2023-05
    what: Move this contribution into GCWeb as a provisional feature

todos:
  - Review code and governance to balance optimal accessibility and ease of implementation for users.
  - Review and change the CSS class name for something more meaningful: st0 is not descriptive enougth of what it is and how it should be applied to the SVG.
  - Contextualisation of the CSS classes to limit their application to this component/feature only.
  - Review color schemes: They should match the sequence of colors used by the charts and graphs.
  - Revise in order to provide more details for implementation instructions: Like how to organize the sibling styles and how to group them with the anchor elements.
  - Investigate and apply best practices regarding the SVG viewbox versus how it get rendered (scaled) in browser.
  - Review tabulation order: suggested pattern is top - bottom - left and right.
  - Produce a WCAG 2.1 ACR

output: false
---
