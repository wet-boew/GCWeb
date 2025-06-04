---
altLangPage: footers-en.html
contextualFooter:
  title: "[Bande du pied de page contextuel]"
  links:
  - url: http://canada.ca/fr
    text: Lien contextuel 1
  - url: http://canada.ca/fr
    text: Lien contextuel 2
  - url: http://canada.ca/fr
    text: Lien contextuel 3
dateModified: 2025-04-28
includes:
  footer: edge
language:	fr
secondlevel: false
share: true
title: Pied de page complet
---
<div class="wb-prettify all-pre hide"></div>

Le pied de page général (à l'échelle du site) situé au bas de chaque page Web peut contenir jusqu'à 3 bandes&nbsp;:

* Bande contextuelle
* Bande principale
* Bande sous pied de page

Consultez le système de conception de Canada.ca pour savoir quels éléments de pied de page ou quelles implémentations adaptées utiliser en fonction du type de page que vous créez&nbsp;:

* [Pied de page général - Système de conception Canada.ca](https://conception.canada.ca/configurations-conception-communes/pied-page.html)

## Changements récents

### Version 8.1

Les modifications suivantes ont été apportées depuis la **version 4.0**&nbsp;:

* Version 8.1 : Ajout d'un nouveau lien "Gérer les événements de la vie".
* Version 8.0 : Pluriel de "finance" dans "Argent et finance", mise en majuscule de "peoples" dans "<span lang="en">Indigenous peoples</span>" dans la version anglaise.
* Version 7.0 : Ajout de "www." à l'URL de "Canada et le monde".
* Version 6.0 : Changé l'URL du lien "Vétérans et militaires".
* Version 5.0 : Changement de "<span lang="en">All Contacts</span>" à "<span lang="en">All contacts</span>" dans la version anglaise.

Les modifications suivantes ont été apportées depuis la **version 2.0**&nbsp;:

* Ajout d'une bande contextuelle au-dessus de la bande principale.
* La classe `.landscape` a été renommée à `.gc-main-footer`
* Ajout d'un nouveau titre « Gouvernement du Canada » dans la bande principale.
* Ajout d'une ligne de liens pangouvernementaux.
* Ajout d'une courte ligne horizontale blanche pour séparer les liens pangouvernementaux et les liens de thèmes et sujets.
* Modification de la liste des liens de thèmes et sujets.
* Les classes pour la liste de liens de thèmes et sujets ont été mises à jour pour `list-col-xs-1 list-col-sm-2 list-col-md-3`.
  * Certaines listes utilisent désormais la fonctionnalité CSS « Flexbox », qui distribue les liens horizontalement au lieu de verticalement.
  * Les liens sont maintenant affichés en une (1) colonne sur les très petits écrans, en deux (2) colonnes sur les petits écrans et en trois (3) colonnes sur les écrans moyens et plus grands.
* La classe `.brand` a été renommée à `.gc-sub-footer`
* Les liens « Avis » et « Confidentialité » doivent désormais rester visibles à tout moment, même lorsque `noFooterCorporate` est défini à « true ».
* Suppression de l'ancre « Haut de page ».
* Refonte complète des titres du pied de page pour l'accessibilité.
* Spécifique à GCWeb Jekyll : le lien de saut de page vers le pied de page devrait toujours être présent.

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

* Pour la bande contextuelle au-dessus de la bande principale:
  * le titre et les liens sont définis de façon globale dans `_config.yml`. Il est également possible de retirer globalement la bande contextuelle en supprimant sa définition dans `_config.yml`.
  * le titre et les liens peuvent être modifiés pour des pages spécifiques dans la propriété `contextualFooter` de la page.
* Les liens « Avis » et « Confidentialité » doivent désormais rester visibles à tout moment, même lorsque `noFooterCorporate` est défini à « true ».
* Le lien de saut vers le pied de page doit demeurer en tout temps.

## Versions du pied de page précédentes

Voici une liste des [versions de pied de page précédentes](old-footers-fr.html) avec leurs exemples de code associés.
