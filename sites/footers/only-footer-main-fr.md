---
altLangPage: only-footer-main-en.html
breadcrumbs:
- title: Pied de page
  link: sites/footers/footers-fr.html
dateModified: 2023-01-16
includes:
  footer: edge
language: fr
noFooterContextual: 'true'
noFooterCorporate: 'true'
secondlevel: false
share: 'true'
title: Bande principale et bande sous pied de page sans les liens facultatifs
titleH1: Afficher la bande principale et la bande sous pied de page sans les liens facultatifs
---
<div class="wb-prettify all-pre hide"></div>

Le pied de page général (à l'échelle du site) situé au bas de chaque page Web contient jusqu'à 3 bandes&nbsp;:
* bande contextuelle
* bande principale
* bande sous pied de page

La bande contextuelle est facultative sur tous les types de page (régulière, transactionnelle, de campagne).

Sur les pages **transactionnelles** et de **campagne**, vous pouvez omettre les liens Médias sociaux, Applications mobiles et À propos de Canada.ca de la bande sous pied de page.

## Implémentation de référence
<figure>
  <figcaption class="h3">Code final attendu - Pied de page sans la bande contextuelle et sans les liens facultatifs dans la bande sous pied de page</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## Pour le thème GCWeb-Jekyll
En définissant les variables `noFooterContextual` et `noFooterCorporate` à «&nbsp;true&nbsp;», la bande contextuelle et les liens optionnels de la bande sous pied de page seront masqués au chargement de la page.

## Lignes directrices
Consultez le système de conception de Canada.ca pour savoir quels éléments de pied de page ou quelles implémentations adaptées utiliser en fonction du type de page que vous créez&nbsp;:
* [Pied de page général - Système de conception Canada.ca](https://conception.canada.ca/configurations-conception-communes/pied-page.html)