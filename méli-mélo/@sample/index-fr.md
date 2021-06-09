---
title: "@ Example pour la création de composant méli-mélo"
lang: fr
dateModified: 2021-02-06
script: wb-bonjour.js
css:
 - wb-bonjour.css
 - mycss.css
---

Ceci est un example afin de démontrer la structure nécessaire pour procéder à la création de composant méli-mélo.

Ces composant sont complétement *détaché* du thème de Canada.ca. Par contre, les modules récent et répondant au exigence minimal seront assemblé ensemble et publié sur Canada.ca en tant que fichier indépendant.

Les exigences minimal c'est:

* Une démostration existe pour chaques fonctionalité afin de mettre à l'essaie  inclus dans ce méli-mélo.
* Il ne doit pas interférer, ni remplacer n'importe lequel partie des libraries de la BOEW, du thème de Canada.ca ni avec les méli-mélo dans son ensemble.
	- Par example, le code javascript est encapsulé avec une "closure" et l'instruction "use stric" dont l'ensemble des variable global sont géré. 
	- Les écouteur d'événement sont ajouté via le code javascript. Autremendit, il n'y a pas d'attribut événementiel ou de callback javascript via le code HTML. Le code HTML n'est pas directement binder au scirpt.
* Une revision préalable qui sera brève et partielle sera fait afin de repérer des erreurs d'accessibilité majeur et flagrant.
* Le propriétaire de contenu duquel le méli-mélo sera utilisé en production prendra toutes les mesures nécessaire pour une conformance et assumera l'entièreté des risques.
* Toutes fonctionalité méli-mélo est asujeti à l'approbation et au droit de vétaux des administrateurs de la BOEW.
* Ces fonctionalités doivent répondre à un besoin d'un département asujeti à la politique des communications du gouvernement du Canada.

Vous pouvez aussi inclure:
* Vos documents sommaire de recherche utilisateur
* Identifier une personne resource ou un département.
* Vos rapport de mise à l'essaie

L'autre étape après le méli-mélo, c'est la promotion de la fonctionalité, en format entreprise, afin qu'il soit intégré avec le thème de Canada.ca.

----

## Démonstration du composant expérimental: Bonjour le monde

Un CSS personalisé a été compilé par le thème jekyll. La grosseur de la police a été augmenté de 200%.

{::nomarkdown}
<div class="well">
	<p class="wb-bonjour">Exemple 1</p>
	<p>Exemple 2 (<em class="wb-bonjour">à l'intérieur d'un em</em>)</p>
	<p class="wb-bonjour" data-wb-bonjour='{ "surpassetoi": true }'>Exemple 3 avec paramètre</p>
</div>
{:/}

### Code source

```
<p class="wb-bonjour">Exemple 1</p>
<p>Exemple 2 (<em class="wb-bonjour">à l'intérieur d'un em</em>)</p>
<p class="wb-bonjour" data-wb-bonjour='{ "surpassetoi": true }'>Exemple 3 avec paramètre</p>

```

* [Fichier CSS générer par Jekyll](wb-bonjour.css)
* [Fichier JS](wb-bonjour.js)

----

## Passage en provisional

* Contacter l'éditeur principal et/ou DTO et/ou participé au code sprint hebdomadaire
* Refactorisation du méli-mélo vers une solution entreprise entièrement réutilisable
* Prioritization des technologies dans cet ordre
	- Seulement du HTML
	- Seulement du HTML avec une combinaison de CSS. Le contenu responsive devrais être idéalement résolu à l'aide de CSS
	- Utilisation du JS pour les interrations.
