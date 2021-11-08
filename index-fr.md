---
title: GCWeb, le thème WET-BOEW de Canada.ca
altLangPage: home.html
dateModified: 2021-11-07
description: "Page d'accueil décrivant l'ensemble des composants du thème de Canada.ca, nommé GCWeb."
lang: fr
---

{::nomarkdown}
<div class="row">
	<div class="col-md-7 col-lg-8">
		<p>Les gabarits et les conceptions communes si dessous sont une référence d'implémentation du <a href="https://conception.canada.ca">Système de conception de Canada.ca</a>, incluant les exigences obligatoire de la spécifications du contenu et de l’architecture de l'information (C&amp;AI) pour Canada.ca. Les ministères et organisme du gouvernement du Canada peuvent y contribuer en publiant leur modèle et leur conception commune via le <a href="https://github.com/wet-boew/GCWeb">dépôt github de GCWeb</a>.</p>
	</div>
	<div class="col-xs-12 col-md-auto pull-right">
		<p><a href="https://github.com/wet-boew/GCWeb/archive/v10.0.0.zip" class="btn btn-primary">Télécharger le thème <strong>GCWeb v10.0.0</strong></a><br />
			<small>(<time>{{ page.dateModified | %F }}</time> - <a href="https://github.com/wet-boew/gcweb/releases/tag/v10.0.0">Note de version</a>)</small></p>
	</div>
</div>

<ul class="colcount-md-2">
	<li><a href="docs/index.html" hreflang="en" lang="en">GCWeb v5 Summary and others technical notes</a> <br />(En anglais seulement)</li>
	<li><a href="docs/implementing.html" hreflang="en" lang="en">Implementing GCWeb</a> <br />(En anglais seulement)</li>
	<li><a href="#composants">Composants</a></li>
	<li><a href="#gabarits">Gabarit</a></li>
	<li><a href="méli-mélo/méli-mélo-fr.html">Fonctionalité méli-mélo</a></li>
	<li><a href="thématique/gc-thématique-en.html" hreflang="en">Thématique promotionel du GC (en anglais seulement)</a></li>
	<li><a href="#sitesglobal">Sites et fonctionalité général</a></li>
</ul>

<p><small>Vous avez trouvé des problèmes d'implémentation par rapport au C&amp;AI ou vous désirez contribuer au dévelopement, faites nous le savoir en soumettant une <a href="https://github.com/wet-boew/GCWeb/issues/new?title=C&amp;IA%20implementation%20error:%20" hreflang="en">requête GCWeb</a>, en envoyant une <a href="https://github.com/wet-boew/GCWeb/pulls" hreflang="en" lang="en">pull request</a> ou en participant à un de nos <a href="https://wet-boew.github.io/wet-boew-documentation/index-en.html#wet-boew-code-sprint" hreflang="en"><span lang="en">code sprint</span> hedbomadaire à chaque mardi</a>.</small></p>
<!--
Les états suivant n'ont été transposé encore avec la réorganisation de la structure du dépôt
<details>
	<summary>Définition des états</summary>
	<dl class="dl-horizontal mrgn-bttm-0">
		<dt><span class="label label-success">Conforme</span></dt>
		<dd>Conforme aux exigences définie par la dernière version publié des spécifications du C&amp;AI.</dd>
		<dt><span class="label label-success">Stable</span></dt>
		<dd>Rencontre les exigences d'une spécification.</dd>
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
		<dd>Incomplet car il ne se conforme pas complétement à toute les exigences de la spécification. Nécessite encore des travaux de dévelopement.</dd>
		<dt><span class="label label-danger">Obsolète</span></dt>
		<dd>Ne pas utilisé car c'est obsolète, mais disponible pour votre information.</dd>
	</dl>
</details>
-->
<h2 id="composants">Composants</h2>

{% assign page_group = site.data.i18n.page_group[ page.lang ] %}
{% assign comp_status = site.data.i18n.component_status[ page.lang ] %}

<ul>
{% assign components = site.data.components %}
{% for component in components %}
	{% assign list-pages = component.pages %}
	<li>{{ component.title[ page.lang ] }} (État: {{ comp_status[ component.status ] | default: "Non définie" }})
	<ul>
	{% for pgGroup in list-pages %}
		{% assign grpkey = pgGroup[0] %}
		<li>{{ page_group[ grpkey ] | default: "Groupe inconnu" }}
			<ul>
			{% assign examples = pgGroup[1] | where: "language", page.lang %}
			{% for example in examples %}
				{% if example.path %}
				<li><a href="components/
							{%- if component.componentName -%}
								{{ component.componentName }}/
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

<h2 id="gabarits">Gabarits</h2>
<ul>
{% for template in site.data.templates %}
	{% assign list-pages = template.pages %}
	<li>{{ template.title[ page.lang ] }} (État: {{ comp_status[ template.status ] | default: "Non définie" }})
	<ul>
	{% for pgGroup in list-pages %}
		{% assign grpkey = pgGroup[0] %}
		<li>{{ page_group[ grpkey ] | default: "Groupe inconnu" }}
			<ul>
			{% assign examples = pgGroup[1] | where: "language", page.lang %}
			{% for example in examples %}
				{% if example.path %}
				<li><a href="templates/
							{%- if template.componentName -%}
								{{ template.componentName }}/
							{%- endif -%}
						{{ example.path }}" lang="{{ example.language }}" hreflang="{{ example.language }}">{{ example.title }}</a></li>
				{% elsif example.url %}
					<li><a href="{{ example.url }}" lang="{{ example.language }}" hreflang="{{ example.language }}">{{ example.title }}</a></li>
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

<h2 id="méli-mélo">Méli-mélo</h2>

<p><a href="méli-mélo/méli-mélo-fr.html">Consulter la page dédié aux fonctionalité méli-mélo</a></p>


<h2 id="sitesglobal">Fonctionnalités global et de sites</h2>
<ul>
{% for item in site.data.sites %}
	{% assign list-pages = item.pages %}
	<li>{{ item.title[ page.lang ] }} (État: {{ comp_status[ item.status ] | default: "Non définie" }})
	<ul>
	{% for pgGroup in list-pages %}
		{% assign grpkey = pgGroup[0] %}
		<li>{{ page_group[ grpkey ] | default: "Groupe inconnu" }}
			<ul>
			{% assign examples = pgGroup[1] | where: "language", page.lang %}
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


<h2>Aperçu des fonctionnalités wet-boew avec le thème de Canada.ca</h2>
<p><a href="/gcweb-compiled-demos/index.html#wet-boew">Aperçu des fonctionnalités wet-boew</a></p>
{:/}

## Documentation du projet GCWeb

* [GCWeb theme - Meta information (en anglais seulement)](docs/index.html)
* [Quick implementation guide - GCWeb theme (en anglais seulement)](docs/implementing.html)
* [Migration instruction - GCWeb theme V5 (en anglais seulement)](docs/v5-migration.html)
* [Archivé - Documentation GCWeb](docs/GCWeb-fr.html)
* [Archivé - Version](docs/release/index-fr.html)
* [Skeleton - Static header/footer - Bootstrap 3 (en anglais seulement)](docs/static-header-footer/bootstrap-3.html)
* [Prototype skeleton - Static header/footer - Bootstrap 4 (en anglais seulement)](docs/static-header-footer/bootstrap-4.html)

Évaluations et rapports

* [1 - Accessibility assessment as 2018-11-14 (en anglais seulement)](docs/evaluation-report/1-accessibility.html)
* [2 - Regression user acceptance testing as 2018-11-16 (en anglais seulement)](docs/evaluation-report/2-wetplugin-gcweb2.html)

## Developer pour GCWeb (en anglais seulement)

Install NodeJS

### Building GCweb

* Build a local development version: `grunt` or `grunt debug`
* Run code quality check: `grunt test`
* Build production files: `grunt dist`
* Compile and assemble méli-mélo:
	* Run local: `grunt méli-mélo`
	* Run from compiled dist: `grunt méli-mélo-runLocal`
	* Run from wet-boew sites : `grunt méli-mélo-remote`
* Regenerate site web content: `grunt site-contents`
	* `_data/components.json`
	* `_data/sites.json`
	* `_data/templates.json`
	* `_wetboew-demos/**`

### Run GCWeb wetsite locally

Ensure that you have builded GCWeb first

After your are running docking container or the docker composer you will be able to access your local website at: `http://localhost:4000`

Build Dockerfile locally

```
docker build -t jekyll-with-env-options .
```

Run your image
```
grunt debug

docker run -it --rm -v "$PWD":/usr/src/app -p "4000:4000" --env JEKYLL_OPTIONS='--config _config.yml,_localJekyll.yml' jekyll-with-env-options
```

#### alternative with docker-compose

This version leverage the remote theme wet-beoew/gcweb-jekyll. This equivalent if you run with gh-pages through your own GCWeb repository.

```
docker-compose up
```

### Run the continous integration and deployment script locally

Install ACT - [https://github.com/nektos/act](https://github.com/nektos/act)

Github fork needed:

* [wet-boew/gcweb](https://github.com/wet-boew/gcweb)
* [wet-boew/gcweb-jekyll](https://github.com/wet-boew/gcweb-jekyll)
* [wet-boew/gcweb-compiled-demos](https://github.com/wet-boew/gcweb-compiled-demos)
* [wet-boew/themes-dist](https://github.com/wet-boew/themes-dist)
* [wet-boew/themes-cdn](https://github.com/wet-boew/themes-cdn)

Run the continuous deployment script

```
act -f deploy-gcweb -s my_token=<XXXXXXXXXXXXXX> -s my_username="<GITHUB USERNAME>" - my_email="<GITHUB HANDLE>@users.noreply.github.com" -a <GITHUB HANDLE>
```

Where:
* `<GITHUB USERNAME>`: Your name, like "John Doe"
* `<GITHUB HANDLE>`: Your github id
* `<XXXXXXXXXXXXXX>`: Your personal access token with access to public repository

### Refresh your github pages with the latest theme changes

You can make a commit to your site and it will get regenerated with the latest version of the jekyll theme. Alternatively, the following curl command will told github to regenerate your site.

```
curl -u <GITHUB HANDLE>:<XXXXXXXXXXXXXX> -X POST https://api.github.com/repos/<GITHUB HANDLE>/<GITHUB REPOSITORY>/pages/builds
```

Where:
* `<GITHUB HANDLE>`: Your github id
* `<XXXXXXXXXXXXXX>`: Your personal access token with access to public repository
* `<GITHUB REPOSITORY>`: Your web site github repository, like "jekyll-website"

Note: A manual update is required if you have specified a version for your jekyll remote theme in your `config.yml` file.
