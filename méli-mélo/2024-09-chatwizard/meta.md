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
  en: Chat wizard
  fr: Chat wizard
description:
  en: Transforms a simple form into a conversation like experience used as a wizard.
  fr: Transforme un formulaire simple en une expérience de type conversation utilisée comme un assistant.
modified: 2024-09-11
componentName: 2024-09-chatwizard
sponsor: Principal Publisher - ESDC

pages:
  examples:
    - title: Chat wizard (en)
      language: en
      path: chatwizard-en.html
    - title: Chat wizard (fr)
      language: fr
      path: chatwizard-fr.html
    - title: Chat wizard JSON (en)
      language: en
      path: chatwizard-en.html
    - title: Chat wizard JSON (en)
      language: fr
      path: chatwizard-json-fr.html
  docs:
    - title: Chat wizard documentation
      language: en
      path: docs.html
    - title: Chat wizard documentation (en anglais seulement)
      language: fr
      path: docs.html

implementationPlan:
  - due: 2024-09
    what: Deprecation of the GCWeb component and move to experimentation

output: false
---
