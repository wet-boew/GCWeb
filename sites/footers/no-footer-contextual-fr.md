---
altLangPage: no-footer-contextual-en.html
breadcrumbs:
 - title: Pied de page
   link: sites/footers/footers-fr.html
dateModified: 2023-01-16
includes:
  footer: edge
language: fr
noFooterContextual: true
secondlevel: false
share: true
title: Bande principale et bande sous pied de page
titleH1: Afficher la bande principale et la bande sous pied de page
---
<div class="wb-prettify all-pre hide"></div>

Le pied de page général (à l'échelle du site) situé au bas de chaque page Web contient jusqu'à 3 bandes :
* bande contextuelle
* bande principale
* bande sous pied de page

La bande contextuelle est facultative sur tous les types de page (régulière, transactionnelle, de campagne).

## Implémentation de référence

<figure>
  <figcaption class="h3">Code final attendu - Pied de page sans la bande contextuelle</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## Pour le thème GCWeb-Jekyll
* En définissant la variable `noFooterContextual` à «&nbsp;true&nbsp;», la bande contextuelle sera masquée au chargement de la page.
* La bande contextuelle est définie dans `_config.yml`, mais peut également être écrasée sur n'importe quelle page donnée dans le «&nbsp;front matter&nbsp;» (voir [Pied de page complet](footers-fr.html) pour un exemple).

## Lignes directrices

Consultez le système de conception de Canada.ca pour savoir quels éléments de pied de page ou quelles implémentations adaptées utiliser en fonction du type de page que vous créez :

* [Pied de page général - Système de conception Canada.ca](https://conception.canada.ca/configurations-conception-communes/pied-page.html)
