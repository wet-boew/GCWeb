---
altLangPage: only-footer-corporate-en.html
breadcrumbs:
  - title: Pied de page
    link: sites/footers/footers-fr.html
dateModified: 2023-01-16
includes:
  footer: edge
language: fr
noFooterContextual: 'true'
noFooterMain: 'true'
secondlevel: false
share: 'true'
title: Bande sous pied de page uniquement
titleH1: Afficher la bande sous pied de page uniquement
---
<div class="wb-prettify all-pre hide"></div>

Le pied de page général (à l'échelle du site) situé au bas de chaque page Web contient jusqu'à 3 bandes&nbsp;:
* bande contextuelle
* bande principale
* bande sous pied de page

La bande sous pied de page est obligatoire sur toutes les types de pages (régulière, transactionnelle, de campagne).

## Implémentation de référence
<figure>
  <figcaption class="h3">Code final attendu - Bande sous pied de page uniquement</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## Pour le thème GCWeb-Jekyll
En définissant les variables `noFooterContextual` et `noFooterMain` à «&nbsp;true&nbsp;», les bandes contextuelle et principale seront masquées au chargement de la page.

## Lignes directrices
Consultez le système de conception de Canada.ca pour savoir quels éléments de pied de page ou quelles implémentations adaptées utiliser en fonction du type de page que vous créez&nbsp;:
* [Pied de page général - Système de conception Canada.ca](https://conception.canada.ca/configurations-conception-communes/pied-page.html)