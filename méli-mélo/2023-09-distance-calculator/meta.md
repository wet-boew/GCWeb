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
  en: Distance calculator
  fr: Calculateur de distance 
description:
  en: Using the Natural Resources Canada Geogratis Geolocation service to provide the distance between a known set of coordinates and an address provided by the user.
  fr: Utiliser le service de géolocalisation Geogratis de Ressources naturelles Canada pour fournir la distance entre un ensemble de coordonnées connu et une adresse fournie par l'utilisateur.
modified: 2023-09-08
componentName: 2023-09-distance-calculator
sponsor: Donald McDill Sites management, Service Canada  

pages:
  examples:
    - title: Distance calculator
      language: en
      path: index.html
    - title: Calculateur de distance
      language: fr
      path: index-fr.html

implementationPlan:
  - due: 2023-10
    what: Review and identify requirement to make this functionality enterprise ready.
  - due: 2024-02
    what: Have this feature as provisional feature in GCWeb.


todos:
  - Improve error handling and default values
  - Improve french example page text


output: false
---
