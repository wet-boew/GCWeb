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
  en: List steps
  fr: Liste d'étape
description:
  en: Style ordered list and divs with steps number in circles.
  fr: Mise en style d'une liste ordonnée et de divs avec des numéros d'étape dans un cercle
modified: 2024-10-31
componentName: 2021-05-steps
sponsor: CRA - Christopher Oakes (@christopher-o)

pages:
  examples:
    - title: List steps
      language: en
      path: index.html
    - title: Liste des étapes
      language: fr
      path: index-fr.html

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
  - due: 2024-05
    what: change name of component to better reflect use case

todos:
  - Finalize design

changes:
  - date: 2024-06-20
    description: Reduced excessive spacing for small amount of content. Removed background color for default list steps number (except in striped mode) as was not showing up properly in high contrast mode. Updated governance towards stabilization.
    departmentImpact: No change from a departmental perspective.
    publicImpact: Created a cleaner look for items using list steps with a smaller amount of content. Made the numbers more visible for edge case scenarios of print and high contrast.
  - date: 2024-08-07
    description: Fixed issue with printing pages as some text would be cut off 
    departmentImpact: No change from a departmental perspective.
    publicImpact: Improved look of print document
  - date: 2024-10-30
    description: Added customized option to use start attribute for items 2 to 10
    departmentImpact: No change from a departmental perspective.
    publicImpact: Enhanced flexibility to better mimic ordered lists using HTML
output: false
---
