---
layout: fluid
title: "Page de contenu fluide"
language: fr
altLangPrefix: content
altLangPage: content-fluid-en.html
secondlevel: false
dateModified: 2021-02-05
share: true
---
{% include byline/byline.html %}
{% include web-contents/placeholdercontent-fr.html %}
<h2 id="cnt-wdth-lmtd">Section avec une largeur de contenu limitée</h2>
<p>Ajouter la classe CSS <code>.cnt-wdth-lmtd</code> à l'élément de section <code>&lt;section class="cnt-wdth-lmtd"&gt;...&lt;section&gt;</code> à l'intérieur du contenu principal de votre page. De plus amples renseignements sont disponibles dans la spécification du contenu et de l'architecture de l'information pour Canada.ca.</p>
<section class="cnt-wdth-lmtd">
	<h3>Exemple de section avec une largeur de contenu limitée</h3>
	<p>Exemple de texte différent. Exemple de texte différent. Exemple de texte différent. Exemple de texte différent. Exemple de texte différent. Exemple de texte différent. Exemple de texte différent. Exemple de texte différent.</p>
</section>
<h2 id="call-to-action">Bouton d'appel à l'action</h2>
<p>Ajouter la classe CSS <code>.btn-call-to-action</code> à votre bouton ou lien qui définie l'appel à l'action principal de la page. Par example le bouton ou le lien de lancement d'une page de lancements d'un service. De plus amples renseignements sont disponibles dans la spécification du contenu et de l'architecture de l'information pour Canada.ca.</p>
<div class="row">
	<div class="col-sm-6">
		<h3>Lien</h3>
		<p class="mrgn-bttm-0"><a class="btn btn-call-to-action" href="#">[Appel à l'action]</a></p>
		<pre><code>&lt;p&gt;&lt;a class="btn <strong>btn-call-to-action</strong>" href="#"&gt;[Appel à l'action]&lt;/a&gt;&lt;/p&gt;</code></pre>
	</div>
	<div class="col-sm-6">
		<h3>Bouton</h3>
		<button class="btn btn-call-to-action" type="button">[Appel à l'action]</button>
		<pre><code>&lt;button class="btn <strong>btn-call-to-action</strong>" type="button"&gt;[Appel à l'action]&lt;/button&gt;</code></pre>
	</div>
</div>
