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
  en: Steps Quiz pattern
  fr: Modèle de quiz à étapes
description:
  en: Apply a quiz pattern to the existing Steps Form component.
  fr: Applique un modèle de quiz au composant du Formulaire à étapes existant.
modified: 2024-04-16
componentName: 2024-04-stepsquiz
sponsor: Principal Publisher - ESDC

pages:
  examples:
    - title: Quiz
      language: en
      path: index.html

implementationPlan:
  - due: 2024-03
    what: Review and identify requirement to make this functionality enterprise ready.
  - due: 2024-05
    what: Have this feature as a Meli-Melo feature in GCWeb.
  - due: 2024-12
    what: Produce accessibility conformance report and attach usability report.
  - due: 2025-05
    what: Standardisation of the Steps Form plugin.
  - due: 2026-05
    what: Have this feature officialy integrated to the Steps Form plugin.

a11y:
  - 2024-06-25 - <a href="reports/a11y-1-en.html">Accessibility assessment no.1 - Progress bar</a>

todos:
  - Write governance and rationale for the use of this design.
  - Optimize code as suggested in the <a href="https://github.com/wet-boew/GCWeb/pull/2347">Github pull request &#35;2347</a>.

changes:
  - date: 2024-07-15
    description: French translation functionality on language toggle for two text elements found in the component. Addition of a <code>&lt;label&gt;</code> element around the <code>&lt;progress&gt;</code> element in order to resolve an accessibility issue <a href="reports/a11y-1-en.html">Accessibility assessment no.1 - Progress bar</a>.
    departmentImpact: Prevents a possible complaint related to official languages and/or accessibility.
    publicImpact: Access to content that complies with official languages and that meets WCAG accessibilty guidlines 2.1.

output: false
---
