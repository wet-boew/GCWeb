---
altLangPage: footers-en.html
breadcrumbs:
  - title: GCWeb
    link: https://wet-boew.github.io/GCWeb/index-fr.html
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
language:	fr
secondlevel: false
share: true
title: Pied de page complet
---
<div class="wb-prettify all-pre hide"></div>

{% include alert-softlaunch.html component="site footer" version="6" %}

Le pied de page général (à l'échelle du site) situé au bas de chaque page Web peut contenir jusqu'à 3 bandes&nbsp;:
* Bande contextuelle
* Bande principale
* Bande sous pied de page

Consultez le système de conception de Canada.ca pour savoir quels éléments de pied de page ou quelles implémentations adaptées utiliser en fonction du type de page que vous créez&nbsp;:
* [Pied de page général - Système de conception Canada.ca](https://conception.canada.ca/configurations-conception-communes/pied-page.html)

## Changements récents

### Version 6.0

Les modifications suivantes ont été apportées depuis la version 5.0&nbsp;:
* Changé l'URL du lien "Vétérans et militaires".

## Implémentation de référence

<figure>
  <figcaption class="h3">Code final attendu - pied de page complet</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
   {%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## Implémentations alternatives

### Les pages régulières

* [Bande principale et bande sous pied de page](no-footer-contextual-fr.html)

### Les pages transactionnelles et les pages de campagne

* [Bande principale et bande sous pied de page](no-footer-contextual-fr.html)
* [Bande principale et bande sous pied de page sans les liens facultatifs](only-footer-main-fr.html)
* [Bande contextuelle et bande sous pied de page](no-footer-main-fr.html)
* [Bande contextuelle et bande sous pied de page sans les liens facultatifs](only-footer-contextual-fr.html)
* [Uniquement la bande sous pied de page](only-footer-corporate-fr.html)
* [Uniquement la bande sous pied de page sans liens facultatifs](no-footers-fr.html)

## Implémentation GCWeb Jekyll

* Le titre et les liens sont définis de façon globale dans `_config.yml`. Il est également possible de retirer globalement la bande contextuelle en supprimant sa définition dans `_config.yml`.
* Le titre et les liens peuvent être modifiés pour des pages spécifiques dans la propriété `contextualFooter` de la page.
* Les liens « Avis » et « Confidentialité » doivent désormais rester visibles à tout moment, même lorsque `noFooterCorporate` est défini à « true ».
* Le lien de saut vers le pied de page doit demeurer en tout temps.

## Versions du pied de page précédentes

Voici une liste des [versions de pied de page précédentes](old-footers-fr.html) avec leurs exemples de code associés.
