---
altLangPage: no-footer-main-en.html
breadcrumbs:
  - title: Pied de page
    link: sites/footers/footers-fr.html
contextualFooter:
  title: "[Bande du pied de page contextuel]"
  links:
  - url: http://canada.ca/fr
    text: Lien contextuel 1
  - url: http://canada.ca/fr
    text: Lien contextuel 2
  - url: http://canada.ca/fr
    text: Lien contextuel 3
dateModified: 2023-01-16
includes:
  footer: edge
language: fr
noFooterMain: true
secondlevel: false
share: true
title: Bande contextuelle et bande sous pied de page sans les liens facultatifs
titleH1: Afficher la bande contextuelle et la bande sous pied de page sans les liens facultatifs
---
<div class="wb-prettify all-pre hide"></div>

Le pied de page général (à l'échelle du site) situé au bas de chaque page Web contient jusqu'à 3 bandes&nbsp;:
* bande contextuelle
* bande principale
* bande sous pied de page

Sur les pages **transactionnelles** et de **campagne**, la bande principale est facultative.

## Implémentation de référence
<figure>
  <figcaption class="h3">Code final attendu - Pied de page sans la bande principale</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## Pour le thème GCWeb-Jekyll
En définissant la variable `noFooterMain` à «&nbsp;true&nbsp;», la bande principale sera masquée au chargement de la page.

## Lignes directrices
Consultez le système de conception de Canada.ca pour savoir quels éléments de pied de page ou quelles implémentations adaptées utiliser en fonction du type de page que vous créez&nbsp;:
* [Pied de page général - Système de conception Canada.ca](https://conception.canada.ca/configurations-conception-communes/pied-page.html)