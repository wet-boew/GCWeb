---
title: GCWeb, le thème WET-BOEW de Canada.ca
altLangPage: index-en.html
dateModified: 2022-08-25
description: "Page d'accueil décrivant l'ensemble des composants du thème de Canada.ca, nommé GCWeb."
layout: no-container
language: fr
css:
- href: https://use.fontawesome.com/releases/v5.8.1/css/all.css
  integrity: sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf
---

{::nomarkdown}
<div class="container">
	<h1 id="wb-cont" property="name">GCWeb, le thème WET-BOEW de Canada.ca</h1>
	<div class="row">
		<div class="col-md-7 col-lg-8">
			<p>Les gabarits et les conceptions communes si dessous sont une référence d'implémentation du <a href="https://conception.canada.ca">Système de conception de Canada.ca</a>, incluant les exigences obligatoire de la spécifications du contenu et de l’architecture de l'information (C&amp;AI) pour Canada.ca. Les ministères et organisme du gouvernement du Canada peuvent y contribuer en publiant leur modèle et leur conception commune via le <a href="https://github.com/wet-boew/GCWeb">dépôt github de GCWeb</a>.</p>
		</div>
		<div class="col-xs-12 col-md-auto pull-right">
			<p><a href="https://github.com/wet-boew/GCWeb/archive/v11.3.0.zip" class="btn btn-primary">Télécharger le thème <strong>GCWeb v11.3.0</strong></a><br />
				<small>(<time>{{ page.dateModified | %F }}</time> - <a href="https://github.com/wet-boew/gcweb/releases/latest">Note de version</a>)</small></p>
		</div>
	</div>
</div>
<div class="container-fluid wb-inview show-none" data-inview="nav-menu">
	<div class="row">
		<nav class="well well-lg mrgn-tp-md">
			<div class="container">
				<h2 class="mrgn-tp-0">Débuter</h2>
				<ul class="list-unstyled colcount-md-3">
					<li><a href="#composantes"><span aria-hidden="true" class="fas fa-cube mrgn-rght-md"></span>Composantes</a></li>
					<li><a href="#gabarits"><span aria-hidden="true" class="fas fa-table mrgn-rght-md"></span>Gabarits</a></li>
					<li><a href="#experimentation"><span aria-hidden="true" class="fas fa-puzzle-piece mrgn-rght-md"></span>Méli-mélo et thématiques</a></li>
					<li><a href="#sitesglobal"><span aria-hidden="true" class="fas fa-globe mrgn-rght-md"></span>Fonctionnalités globales et de sites</a></li>
					<li><a href="#autre"><span aria-hidden="true" class="fas fa-info-circle mrgn-rght-md"></span>Autre documentation</a></li>
					<li><a href="#implementer-developper"><span aria-hidden="true" class="fas fa-code mrgn-rght-md"></span>Implémenter&nbsp;/ Développer</a></li>
				</ul>
			</div>
		</nav>
	</div>
</div>
<nav id="nav-menu" class="wb-overlay modal-content overlay-def wb-bar-t hidden-xs" aria-hidden="true">
	<header class="pull-left">
		<h2 class="modal-title">Débuter</h2>
	</header>
	<ul class="pull-left list-inline mrgn-lft-md mrgn-tp-sm">
		<li>
			<a href="#composantes" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-cube mrgn-rght-sm"></span>Composantes</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#gabarits" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-table mrgn-rght-sm"></span>Gabarits</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#experimentation" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-puzzle-piece mrgn-rght-sm"></span>Méli-mélo et thématiques</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#sitesglobal" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-globe mrgn-rght-sm"></span>Global et de sites</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#autre" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-info-circle mrgn-rght-sm"></span>Autre</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#implementer-developper" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-code mrgn-rght-sm"></span>Implémenter&nbsp;/ Développer</a>
		</li>
	</ul>
</nav>
<div class="container">
	<p><small>Vous avez trouvé des problèmes d'implémentation par rapport au C&amp;AI ou vous désirez contribuer au dévelopement, faites nous le savoir en soumettant une <a href="https://github.com/wet-boew/GCWeb/issues/new?title=C&amp;IA%20implementation%20error:%20" hreflang="en">requête GCWeb</a>, en envoyant une <a href="https://github.com/wet-boew/GCWeb/pulls" hreflang="en" lang="en">pull request</a> ou en participant à un de nos <a href="https://github.com/wet-boew/wet-boew/wiki/WET-Office-hours,-Heures-de-service-de-la-BOEW" hreflang="en">heures de service de la BOEW</a> (anciennement connu sous le nom de <span lang="en">WET-BOEW code sprint</span>) hedbomadaire à chaque mardi.</small></p>
	{% assign page_group = site.data.i18n.page_group[ page.language ] %}
	{% assign comp_status = site.data.i18n.component_status[ page.language ] %}
	<details class="mrgn-tp-lg">
		<summary>Définition des états</summary>
		<dl class="dl-horizontal mrgn-bttm-0">
			<dt><span class="label label-success">{{comp_status.stable}}</span></dt>
			<dd>Rencontre les exigences d'une spécification.</dd>
			<dt><span class="label label-warning">{{comp_status.provisional}}</span></dt>
			<dd>Plutôt stable, mais expérimental; utilisez à vos risques et périls.</dd>
			<dt><span class="label label-danger">{{comp_status.deprecated}}</span></dt>
			<dd>Ne pas utilisé car c'est obsolète, mais disponible pour votre information.</dd>
			<dt><span class="label label-default">Défaut</span></dt>
			<dd>Manque le statut dans la documentation de la composante.</dd>
			<!--<dt><span class="label label-success">Conforme</span></dt>
			<dd>Conforme aux exigences définie par la dernière version publié des spécifications du C&amp;AI.</dd>
			<dt><span class="label label-info">Information</span></dt>
			<dd>It's for your information. It's complete and suggestive but not defined by and from a specification yet.</dd>
			<dt><span class="label label-info">Revalidation requise</span></dt>
			<dd>Précédemment conforme, mais requière une nouvelle validation manuel afin de s'assurer qu'il continue à rencontrer les exigences tel que définie par la dernière version publié de sa spécification.</dd>
			<dt><span class="label label-warning">Partiel</span></dt>
			<dd>Partiellement conforme au C&amp;AI ou partiellement stable car il inclus des modifications nécessaire afin d'obtenir une conformité aux norme web essentiel, tel que le WCAG 2.0 Niveau AA.</dd>
			<dt><span class="label label-warning">Désuet</span></dt>
			<dd>N'est pas conforme à la dernière spécification, mais il l'a précedemment été. Son rétablisement à la conformité nécessite des changements immédiat.</dd>
			<dt><span class="label label-default">Arriéré</span></dt>
			<dd>Nécessite du dévelopement.</dd>
			<dt><span class="label label-danger">Incomplet</span></dt>
			<dd>Incomplet car il ne se conforme pas complétement à toute les exigences de la spécification. Nécessite encore des travaux de dévelopement.</dd>-->
		</dl>
	</details>
	<h2 id="composantes" class="mrgn-bttm-lg">Composantes</h2>
	<ul class="row list-unstyled wb-eqht wb-filter mrgn-tp-md" data-wb-filter='{ "selector": ">li" }'>
	{% for component in site.data.components %}
		{% assign list-pages = component.pages %}
		<li class="col-md-6 mrgn-tp-md mrgn-bttm-md">
			<div class="brdr-tp brdr-rght brdr-bttm brdr-lft hght-inhrt">
				<h3 class="mrgn-tp-md mrgn-rght-md mrgn-bttm-md mrgn-lft-md">{{ component.title[ page.language ] }}
				{% if component.status == "stable" %}
				<span class="label label-success mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ component.status ] }}</span>
				{% elsif component.status == "provisional" %}
				<span class="label label-warning mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ component.status ] }}</span>
				{% elsif component.status == "deprecated" %}
				<span class="label label-danger mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ component.status ] }}</span>
				{% else %}
				<span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>Non défini</span>
				{% endif %}
				</h3>
				<div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
					<p>{{ component.description[ page.language ] | default: "[Courte description de la composante]" }}</p>
					<!--
					Main working example
					- First working example in the example list where the language match
					-->
					{% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
					<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
					{% if mainExamples %}
					<li>
					{% if mainExamples.path %}
					<a href="components/
								{%- if component.componentName -%}
									{{ component.componentName }}/
								{%- endif -%}
							{{ mainExamples.path }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
					{% elsif mainExamples.url %}
						<a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
					{% else %}
						<span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique
					{% endif %}
					{% endif %}
					<!--
					Documentation
					- Link to the documentations if any
					-->
					{% if list-pages.docs %}
					<!--<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">-->
					{% assign docs = list-pages.docs | where: "language", page.language %}
					{% for doc in docs %}
						<li><a href="components/{{ component.componentName }}/{{ doc.path }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
					{% endfor %}
					{% endif %}
					<li><a href="https://github.com/wet-boew/GCWeb/tree/master/components/{{ component.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Code source</a></li>
					</ul>
					<!--
					> All examples and info
					* Example
					* Documentation
					* Spec
					-->
					<details class="mrgn-tp-lg"><summary>Tous les exemples et info</summary>
						<ul class="list-unstyled">
						{% for pgGroup in list-pages %}
							{% assign grpkey = pgGroup[0] %}
							<li>{{ page_group[ grpkey ] | default: "Groupe inconnu" }}
								<ul>
								{% assign examples = pgGroup[1] %}
								{% for example in examples %}
									{% if example.path %}
									<li><a href="components/
												{%- if component.componentName -%}
													{{ component.componentName }}/
												{%- endif -%}
											{{ example.path }}" {% if example.language != page.language %}hreflang="{{ example.language }}"{% endif %}>{{ example.title }}</a></li>
									{% elsif example.url %}
										<li><a href="{{ example.url }}">{{ example.title }}</a></li>
									{% else %}
										<li>{{ example.title }}</li>
									{% endif %}
								{% endfor %}
								</ul>
							</li>
						{% endfor %}
						</ul>
					</details>
				</div>
			</div>
		</li>
	{% endfor %}
	</ul>
	<hr />
	<h2 id="gabarits" class="mrgn-bttm-lg">Gabarits</h2>
	<ul class="row list-unstyled wb-eqht wb-filter mrgn-tp-md"data-wb-filter='{ "selector": ">li" }'>
	{% for template in site.data.templates %}
		{% assign list-pages = template.pages %}
		<li class="col-md-6 mrgn-tp-md mrgn-bttm-md">
			<div class="brdr-tp brdr-rght brdr-bttm brdr-lft hght-inhrt">
				<h3 class="mrgn-tp-md mrgn-rght-md mrgn-bttm-md mrgn-lft-md">{{ template.title[ page.language ] }}
				{% if template.status == "stable" %}
				<span class="label label-success mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ template.status ] }}</span>
				{% elsif template.status == "provisional" %}
				<span class="label label-warning mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ template.status ] }}</span>
				{% elsif template.status == "deprecated" %}
				<span class="label label-danger mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ template.status ] }}</span>
				{% else %}
				<span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>Non défini</span>
				{% endif %}
				</h3>
				<div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
					<p>{{ template.description[ page.language ] | default: "[Courte description du gabarit]" }}</p>
					<!--
					Main working example
					- First working example in the example list where the language match
					-->
					{% assign mainExamples = list-pages.examples | where: "language", page.lang | first %}
					<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
					{% if mainExamples %}
					<li>
					{% if mainExamples.path %}
					<a href="templates/
								{%- if template.componentName -%}
									{{ template.componentName }}/
								{%- endif -%}
							{{ mainExamples.path }}" {% if mainExamples.language != page.language %}lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"{% endif %}><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
					{% elsif mainExamples.url %}
						<a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
					{% else %}
						<span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique
					{% endif %}
					{% endif %}
					<!--
					Documentation
					- Link to the documentations if any
					-->
					{% if list-pages.docs %}
					<!--<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">-->
					{% assign docs = list-pages.docs | where: "language", page.language %}
					{% for doc in docs %}
						<li><a href="templates/{{ template.componentName }}/{{ doc.path }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
					{% endfor %}
					{% endif %}
					</ul>
					<!--
					> All examples and info
					* Example
					* Documentation
					* Spec
					-->
					<details class="mrgn-tp-lg"><summary>Tous les exemples et info</summary>
						<ul class="mrgn-tp-md">
							{% for pgGroup in list-pages %}
							{% assign grpkey = pgGroup[0] %}
							<li>{{ page_group[ grpkey ] | default: "Groupe inconnu" }}
								<ul>
								{% assign examples = pgGroup[1] %}
								{% for example in examples %}
									{% if example.path %}
									<li><a href="templates/
												{%- if template.componentName -%}
													{{ template.componentName }}/
												{%- endif -%}
											{{ example.path }}" {% if example.language != page.language %}lang="{{ example.language }}" hreflang="{{ example.language }}"{% endif %}>{{ example.title }}</a></li>
									{% elsif example.url %}
										<li><a href="{{ example.url }}">{{ example.title }}</a></li>
									{% else %}
										<li>{{ example.title }}</li>
									{% endif %}
								{% endfor %}
								</ul>
							</li>
						{% endfor %}
						</ul>
					</details>
				</div>
			</div>
		</li>
	{% endfor %}
	</ul>
</div>
<div class="container-fluid">
	<div class="row">
		<div class="well well-lg mrgn-tp-md bg-gctheme text-white">
			<div class="container mrgn-bttm-lg">
				<h2 id="experimentation" class="mrgn-tp-md mrgn-bttm-0">Fonctionnalités spéciales</h2>
					<div class="row">
					    <div class="col-md-6">
					    	<h3 id="méli-mélo">Méli-mélo</h3>
						<p>L'espace d'expérimentation que vous attendiez&nbsp;! Les Méli-mélos permettent d'ajouter au thème de Canada.ca du nouveau code intéressant que vous considéreriez habituellement comme "personnalisé".</p>
						<p class="mrgn-tp-lg"><a href="méli-mélo/méli-mélo-fr.html" class="btn btn-default btn-lg">En savoir plus<span class="wb-inv"> sur les méli-mélos</span></a></p>
					    </div>
					    <div class="col-md-6">
						<h3 id="thematiques">Thématiques promotionnelles</h3><p>Avez-vous un ensemble de pages qui arborent un look original relié à une promotion spécifique&nbsp;? Dans ce cas, essayez plutôt cet espace de thématiques promotionnelles.</p>
						<p class="mrgn-tp-lg"><a href="th%C3%A9matique/gc-th%C3%A9matique-fr.html" class="btn btn-default btn-lg">En savoir plus<span class="wb-inv"> sur les thématiques promotionnelles</span></a></p>
				</div>
			</div>
        	</div>
        </div>
    </div>
</div>
<div class="container">
	<h2 id="sitesglobal">Fonctionnalités global et de sites</h2>
	<ul>
	{% for item in site.data.sites %}
		{% assign list-pages = item.pages %}
		<li>{{ item.title[ page.language ] }} (État: {{ comp_status[ item.status ] | default: "Non définie" }})
		<ul>
		{% for pgGroup in list-pages %}
			{% assign grpkey = pgGroup[0] %}
			<li>{{ page_group[ grpkey ] | default: "Groupe inconnu" }}
				<ul>
				{% assign examples = pgGroup[1] | where: "language", page.language %}
				{% for example in examples %}
					{% if example.path %}
					<li><a href="sites/
								{%- if item.componentName -%}
									{{ item.componentName }}/
								{%- endif -%}
							{{ example.path }}">{{ example.title }}</a></li>
								{% elsif example.url %}
									<li><a href="{{ example.url }}">{{ example.title }}</a></li>
								{% else %}
						<li>{{ example.title }}</li>
					{% endif %}
				{% endfor %}
				</ul>
			</li>
		{% endfor %}
		</ul></li>
	{% endfor %}
	</ul>
	<h2 id="autre">Autre documentation</h2>
	<h3>Aperçu des fonctionnalités wet-boew avec le thème de Canada.ca</h3>
	<p><a href="/gcweb-compiled-demos/index.html#wet-boew">Aperçu des fonctionnalités wet-boew</a></p>
	<h3 id="gcweb-projet-documentation">Documentation du projet GCWeb</h3>
	<ul lang="en">
		<li><a href="docs/index.html">GCWeb theme - Meta information</a></li>
		<li><a href="docs/v5-migration.html">Migration instruction - GCWeb theme V5</a></li>
		<li><a href="docs/GCWeb-en.html">Archived - Documentation - GCWeb English</a></li>
		<li><a href="docs/release/index-en.html">Archived - Releases English</a></li>
		<li><a href="docs/static-header-footer/bootstrap-3.html">Skeleton - Static header/footer - Bootstrap 3</a></li>
		<li><a href="docs/static-header-footer/bootstrap-4.html">Prototype skeleton - Static header/footer - Bootstrap 4</a></li>
	</ul>
	<h4>Évaluations et rapports</h4>
	<ul>
		<li><a href="docs/evaluation-report/1-accessibility.html" lang="en" hreflang="en">1 - Accessibility assessment as 2018-11-14</a></li>
		<li><a href="docs/evaluation-report/2-wetplugin-gcweb2.html" lang="en" hreflang="en">2 - Regression user acceptance testing as 2018-11-16</a></li>
	</ul>
	<div class="row">
		<div class="col-md-9">
			<h2 id="implementer-developper"><span aria-hidden="true" class="fas fa-code mrgn-rght-md"></span>Implémenter&nbsp;/ Développer</h2>
			<h3>Implémenter GCWeb sur votre site</h3>
			<p>Guide d'implémentation pour le thème de Canada.ca avec la Boîte à outils de l'expérience web version 4.x.</p>
			<p><a href="docs/implementing.html" class="btn btn-lg btn-default" hreflang="en">Guide rapide (en anglais)</a></p>
			<h3 id="developper-pour-gcweb">Développer pour GCWeb</h3>
			<p>Rejoignez la communauté et commencez à créer, améliorer et réparer GCWeb, le thème de Canada.ca. Apprenez comment organiser votre environnement local.</p>
			<p class="mrgn-bttm-lg"><a href="docs/developing-fr.html" class="btn btn-call-to-action" hreflang="en">Commencer à programmer</a></p>
		</div>
	</div>
</div>
{:/}
