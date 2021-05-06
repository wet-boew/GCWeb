---
title: GCWeb, le thème de Canada.ca - GCWeb, the Canada.ca theme
altLangPage: index.html
dateModified: 2020-05-06
description: "Page d'accueil décrivant l'ensemble des composants du thème de Canada.ca, nommé GCWeb."
lang: fr
---
{::nomarkdown}


<p lang="en"><a hreflang="en" href="#english"><em>(Go to English content)</em></a></p>

<div class="row">
	<div class="col-md-7 col-lg-8">
		<p>Les gabarits et les conceptions communes si dessous sont une référence d'implémentation du <a href="https://conception.canada.ca">Système de conception de Canada.ca</a>, incluant les exigences obligatoire de la spécifications du contenu et de l’architecture de l'information (C&amp;AI) pour Canada.ca. Les ministères et organisme du gouvernement du Canada peuvent y contribuer en publiant leur modèle et leur conception commune via le <a href="https://github.com/wet-boew/GCWeb">dépôt github de GCWeb</a>.</p>
	</div>
	<div class="col-xs-12 col-md-auto pull-right">
		<p><a href="https://github.com/wet-boew/GCWeb/archive/v9.3.0.zip" class="btn btn-primary">Télécharger le thème <strong>GCWeb v9.3.0</strong></a><br />
			<small>(<time>2021-05-06</time> - <a href="https://github.com/wet-boew/gcweb/releases/tag/v9.3.0">Note de version</a>)</small></p>
	</div>
</div>

<ul class="colcount-md-2">
	<li><a href="docs/index.html" hreflang="en" lang="en">GCWeb v5 Summary and others technical notes</a> <br />(En anglais seulement)</li>
	<li><a href="docs/implementing.html" hreflang="en" lang="en">Implementing GCWeb</a> <br />(En anglais seulement)</li>

	<li><a href="#components">Composants</a></li>
	<li><a href="#templates">Gabarit</a></li>
	<li><a href="#méli-mélo">Méli-mélo packages</a></li>
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

<hr />

<div id="english" lang="en">
<div class="row">
	<div class="col-md-7 col-lg-8">
		<p>The page templates and design patterns below comprise a reference implementation of the <a href="https://design.canada.ca">Canada.ca design system</a>, including the mandatory requirement of the Content and Information Architecture (C&amp;IA) Specification. Government of Canada departments and agencies can contribute additional patterns and templates via <a href="https://github.com/wet-boew/GCWeb">GCWeb github repository</a>.</p>
	</div>
	<div class="col-xs-12 col-md-auto pull-right">
		<p><a href="https://github.com/wet-boew/GCWeb/archive/v9.3.0.zip" class="btn btn-primary">Download GCWeb theme <strong>v9.3.0</strong></a><br />
			<small>(<time>2021-05-06</time> - <a href="https://github.com/wet-boew/gcweb/releases/tag/v9.3.0">Release notes</a>)</small></p>
	</div>
</div>

<ul class="colcount-md-2">
	<li><a href="docs/index.html">GCWeb v5 Summary and others technical notes</a></li>
	<li><a href="docs/implementing.html">Implementing GCWeb</a></li>

	<li><a href="#components">Components</a></li>
	<li><a href="#templates">Templates</a></li>
	<li><a href="#méli-mélo">Méli-mélo packages</a></li>
	<li><a href="#sitesglobal">Sites and global functionality</a></li>
</ul>

<p><small>Found an C&amp;IA implementation issue or you want to contribute at their development, let us know by submiting <a href="https://github.com/wet-boew/GCWeb/issues/new?title=C&amp;IA%20implementation%20error:%20">GCweb issue</a>, sending <a href="https://github.com/wet-boew/GCWeb/pulls">pull request</a> or by participating at one of our <a href="https://wet-boew.github.io/wet-boew-documentation/index-en.html#wet-boew-code-sprint">WET-BOEW weekly Tuesday code sprint</a>.</small></p>

<!--
The following status was not transposed yet with the repository structure reorg
<details>
	<summary>Meaning of statuses</summary>
	<dl class="dl-horizontal mrgn-bttm-0">
		<dt><span class="label label-success">Up to spec</span></dt>
		<dd>Meet the latest published C&amp;IA specification.</dd>

		<dt><span class="label label-success">Stable</span></dt>
		<dd>Meet the latest published specification.</dd>

		<dt><span class="label label-info">Informational</span></dt>
		<dd>It's for your information. It's complete and suggestive but not defined by and from a specification yet.</dd>

		<dt><span class="label label-info">Need to revalidate</span></dt>
		<dd>Was meeting the preceding published specification, but it need to be manually revalidated to ensure it continues to meet the latest published specification.</dd>

		<dt><span class="label label-warning">Partial</span></dt>
		<dd>Partially up to spec or partially stable in order to meet other core web standards such WCAG 2.0 Level AA.</dd>

		<dt><span class="label label-warning">Outdated</span></dt>
		<dd>Don't meet the latest specification but met a previous version. It requires updates.</dd>

		<dt><span class="label label-default">Backlog</span></dt>
		<dd>Need to be developped.</dd>

		<dt><span class="label label-danger">Incomplete</span></dt>
		<dd>Incomplete because it don't fully meet all the specification yet. Still need developpement work.</dd>

		<dt><span class="label label-danger">Deprecated</span></dt>
		<dd>Do not use because it's deprecated, but listed here for your information.</dd>
	</dl>
</details>
-->
</div>


<h2 id="components">Components</h2>

{% assign page_group = site.data.i18n.page_group[ page.lang ] %}
{% assign comp_status = site.data.i18n.component_status[ page.lang ] %}

<ul>
{% for item in site.data.components %}
	{% assign list-pages = item.pages %}
	<li>{{ item.title.fr }} (État: {{ comp_status[ item.status ] | default: "Non définie" }})
	<ul>
	{% for pgGroup in list-pages %}
		{% assign grpkey = pgGroup[0] %}
		<li>{{ page_group[ grpkey ] | default: "Groupe inconnu" }}
			<ul>
			{% for example in pgGroup[1] %}
			  {% if example.path %}
				<li><a href="components/
							{%- if item.componentName -%}
								{{ item.componentName }}/
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


<h2 id="templates">Templates</h2>
<ul>
{% for item in site.data.templates %}
	{% assign list-pages = item.pages %}
	<li>{{ item.title.fr }} (État: {{ comp_status[ item.status ] | default: "Non définie" }})
	<ul>
	{% for pgGroup in list-pages %}
		{% assign grpkey = pgGroup[0] %}
		<li>{{ page_group[ grpkey ] | default: "Groupe inconnu" }}
			<ul>
			{% for example in pgGroup[1] %}
			  {% if example.path %}
				<li><a href="templates/
							{%- if item.componentName -%}
								{{ item.componentName }}/
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

<p>Vous permet d'utiliser du style et du javascript perdonnalisé en vous partageant une dettes commune selon la date de gel de la compilation.
<ul>
{% for item in site.data[ "mli-mlo" ].packages %}
	<li>{{ item.nom }}
		<ul>
		{% for pack in item.libs %}
			{% assign indexPage = site.data[ "mli-mlo" ].subProjects | where: "nom", pack | first %}
			<li><a href="/gcweb-compiled-demos/méli-mélo-demos/{{ item.nom }}/{{ pack }}/{{ indexPage.mainpage }}">{{ pack }}</a></li>
		{% endfor %}
		</ul>
	</li>
{% endfor %}
</ul>

<p><small>(<a href="méli-mélo/compilation-gelé/index.html">Consulter les compilations gelé de méli-mélo</a>)</small></p>

<h3>Sous-projet méli-mélo sous leur forme indépendante</h3>
<ul>
{% for item in site.data[ "mli-mlo" ].subProjects %}
	<li><a href="méli-mélo/{{ item.nom }}/{{ item.mainpage }}">{{ item.nom }}</a></li>
{% endfor %}
</ul>
{:/}



<h2 id="sitesglobal">Sites and global functionality</h2>
<ul>
{% for item in site.data.sites %}
	{% assign list-pages = item.pages %}
	<li>{{ item.title.fr }} (État: {{ comp_status[ item.status ] | default: "Non définie" }})
	<ul>
	{% for pgGroup in list-pages %}
		{% assign grpkey = pgGroup[0] %}
		<li>{{ page_group[ grpkey ] | default: "Groupe inconnu" }}
			<ul>
			{% for example in pgGroup[1] %}
			  {% if example.path %}
				<li><a href="sites/
							{%- if item.componentName -%}
								{{ item.componentName }}/
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


<h2>Aperçu des fonctionalité wet-boew avec le thème de Canada.ca - <span lang="en">WET-BOEW feature demos styled with Canada.ca theme</span></h2>
<p><a href="/gcweb-compiled-demos/index.html#wet-boew">Aperçu des fonctionalité wet-boew</a></p>


## GCWeb project documentation

* [GCWeb theme - Meta information](docs/index.html)
* [Quick implementation guide - GCWeb theme](docs/implementing.html)
* [Migration instruction - GCWeb theme V5](docs/v5-migration.html)
* [Archived - Documentation - GCWeb English](docs/GCWeb-en.html)
* [Archived - Documentation - GCWeb French](docs/GCWeb-fr.html)
* [Archived - Releases English](docs/release/index-en.html)
* [Archived - Releases French](docs/release/index-fr.html)
* [Skeleton - Static header/footer - Bootstrap 3](docs/static-header-footer/bootstrap3.html)
* [Prototype skeleton - Static header/footer - Bootstrap 4](docs/static-header-footer/bootstrap4.html)

Evaluations and reports

* [1 - Accessibility assessment as 2018-11-14](docs/evaluation-report/1-accessibility.html)
* [2 - Regression user acceptance testing as 2018-11-16](docs/evaluation-report/2-wetplugin-gcweb2.html)

## Developping for GCWeb

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
