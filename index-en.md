---
title: GCWeb, the WET-BOEW Canada.ca theme
altLangPage: accueil.html
dateModified: 2021-11-10
description: "Home page describing all the components of the Canada.ca theme, named GCWeb."
lang: en
---

{::nomarkdown}
<div class="row">
	<div class="col-md-7 col-lg-8">
		<p>The page templates and design patterns below comprise a reference implementation of the <a href="https://design.canada.ca">Canada.ca design system</a>, including the mandatory requirement of the Content and Information Architecture (C&amp;IA) Specification. Government of Canada departments and agencies can contribute additional patterns and templates via <a href="https://github.com/wet-boew/GCWeb">GCWeb github repository</a>.</p>
	</div>
	<div class="col-xs-12 col-md-auto pull-right">
		<p><a href="https://github.com/wet-boew/GCWeb/archive/v10.0.1.zip" class="btn btn-primary">Download GCWeb theme <strong>v10.0.1</strong></a><br />
			<small>(<time>{{ page.dateModified | %F }}</time> - <a href="https://github.com/wet-boew/gcweb/releases/tag/v10.0.1">Release notes</a>)</small></p>
	</div>
</div>

<ul class="colcount-md-2">
	<li><a href="docs/index.html">GCWeb v5 Summary and others technical notes</a></li>
	<li><a href="docs/implementing.html">Implementing GCWeb</a></li>
	<li><a href="#components">Components</a></li>
	<li><a href="#templates">Templates</a></li>
	<li><a href="méli-mélo/méli-mélo-en.html">Méli-mélo features</a></li>
	<li><a href="thématique/gc-thématique-en.html">GC promotional thematic</a></li>
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

<h2 id="components">Components</h2>

{% assign page_group = site.data.i18n.page_group[ page.lang ] %}
{% assign comp_status = site.data.i18n.component_status[ page.lang ] %}

<ul>
{% assign components = site.data.components %}
{% for component in site.data.components %}
	{% assign list-pages = component.pages %}
	<li>{{ component.title[ page.lang ] }} (State: {{ comp_status[ component.status ] | default: "Undefined" }})
	<ul>
	{% for pgGroup in list-pages %}
		{% assign grpkey = pgGroup[0] %}
		<li>{{ page_group[ grpkey ] | default: "Unknown group" }}
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

<h2 id="templates">Templates</h2>
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

<p><a href="méli-mélo/méli-mélo-en.html">Consult méli-mélo dedicated page</a></p>


<h2 id="sitesglobal">Sites and global functionality</h2>
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

<h2>WET-BOEW feature demos styled with Canada.ca theme</h2>
<p><a href="/gcweb-compiled-demos/index.html#wet-boew">WET-BOEW feature overview</a></p>
{:/}

## GCWeb project documentation

* [GCWeb theme - Meta information](docs/index.html)
* [Quick implementation guide - GCWeb theme](docs/implementing.html)
* [Migration instruction - GCWeb theme V5](docs/v5-migration.html)
* [Archived - Documentation - GCWeb English](docs/GCWeb-en.html)
* [Archived - Releases English](docs/release/index-en.html)
* [Skeleton - Static header/footer - Bootstrap 3](docs/static-header-footer/bootstrap-3.html)
* [Prototype skeleton - Static header/footer - Bootstrap 4](docs/static-header-footer/bootstrap-4.html)

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
