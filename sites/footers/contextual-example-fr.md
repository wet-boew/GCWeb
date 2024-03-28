---
altLangPage: no-footer-main-en.html
breadcrumbs:
  - title: Pied de page
    link: sites/footers/footers-fr.html
contextualFooter:
  title: "[Bande du pied de page contextuel]"
  links:
  - url: mailto:info@example.com
    text: Courriel envoie vers
  - url: ?abc=123#ancre
    text: Paramètre de lien et ancre
  - url: ../../
    text: Deux dossiers parent 
  - url: tel:555-0123
    text: Numéro de téléphone 555-0123
dateModified: 2023-03-28
includes:
  footer: edge
language: fr
share: true
title: Bande contextuelle et des variations de lien
titleH1: Afficher la bande contextuelle et des variations de lien
---
<div class="wb-prettify all-pre hide"></div>

Le pied de page général (à l'échelle du site) situé au bas de chaque page Web contient jusqu'à 3 bandes&nbsp;:
* bande contextuelle
* bande principale
* bande sous pied de page

## Implémentation de référence
<figure>
  <figcaption class="h3">Code final attendu - Pied de page sans la bande principale</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## Lignes directrices
Consultez le système de conception de Canada.ca pour savoir quels éléments de pied de page ou quelles implémentations adaptées utiliser en fonction du type de page que vous créez&nbsp;:
* [Pied de page général - Système de conception Canada.ca](https://conception.canada.ca/configurations-conception-communes/pied-page.html)
