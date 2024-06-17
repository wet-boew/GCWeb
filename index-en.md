---
title: GCWeb, the WET-BOEW Canada.ca theme
altLangPage: index-fr.html
dateModified: 2024-07-03
description: "Home page describing all the components of the Canada.ca theme, named GCWeb."
layout: no-container
language: en
overwriteBreadcrumbs: true
feedback: true
css:
- href: https://use.fontawesome.com/releases/v5.8.1/css/all.css
  integrity: sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf
---

{::nomarkdown}
<div class="container">
	<h1 id="wb-cont" property="name">GCWeb, the WET-BOEW Canada.ca theme</h1>
	<div class="row">
		<div class="col-md-7 col-lg-8">
			<p>The page templates and design patterns below comprise a reference implementation of the <a href="https://design.canada.ca">Canada.ca design system</a>, including the mandatory requirement of the Content and Information Architecture (C&amp;IA) Specification. Government of Canada departments and agencies can contribute additional patterns and templates via <a href="https://github.com/wet-boew/GCWeb">GCWeb github repository</a>.</p>
		</div>
		<div class="col-xs-12 col-md-auto pull-right">
			<p><a href="https://github.com/wet-boew/GCWeb/archive/v15.3.0.zip" class="btn btn-primary">Download GCWeb theme <strong>v15.3.0</strong></a><br />
				<small>(<time>{{ page.dateModified | date: '%F' }}</time> - <a href="https://github.com/wet-boew/gcweb/releases/latest">Release notes</a>)</small></p>
		</div>
	</div>
</div>
<div class="container-fluid wb-inview show-none" data-inview="nav-menu">
	<div class="row">
		<nav class="well well-lg mrgn-tp-md">
			<div class="container">
				<h2 class="mrgn-tp-0">Get started</h2>
				<ul class="list-unstyled colcount-md-3">
					<li><a href="#components"><span aria-hidden="true" class="fas fa-cube mrgn-rght-md"></span>Components</a></li>
					<li><a href="#templates"><span aria-hidden="true" class="fas fa-table mrgn-rght-md"></span>Templates</a></li>
					<li><a href="#designPatterns"><span aria-hidden="true" class="fas fa-th-large mrgn-rght-md"></span>Design patterns</a></li>
					<li><a href="#experiment"><span aria-hidden="true" class="fas fa-puzzle-piece mrgn-rght-md"></span>Experimentation and thematics</a></li>
					<li><a href="#sitesglobal"><span aria-hidden="true" class="fas fa-globe mrgn-rght-md"></span>Sites and global functionality</a></li>
					<li><a href="#wetboew"><span aria-hidden="true" class="fas fa-cube mrgn-rght-md"></span>Wet-boew</a></li>
					<li><a href="#other"><span aria-hidden="true" class="fas fa-info-circle mrgn-rght-md"></span>Other documentation</a></li>
					<li><a href="#implementing-developing"><span aria-hidden="true" class="fas fa-code mrgn-rght-md"></span>Implementing&nbsp;/ Developing</a></li>
				</ul>
			</div>
		</nav>
	</div>
</div>
<nav id="nav-menu" class="wb-overlay modal-content overlay-def wb-bar-t hidden-xs" aria-hidden="true">
	<header class="pull-left">
		<h2 class="modal-title">Get started</h2>
	</header>
	<ul class="pull-left list-inline mrgn-lft-md mrgn-tp-sm">
		<li>
			<a href="#components" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-cube mrgn-rght-sm"></span>Components</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#templates" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-table mrgn-rght-sm"></span>Templates</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#designPatterns" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-th-large mrgn-rght-sm"></span>Design patterns</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#experiment" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-puzzle-piece mrgn-rght-sm"></span>Experimentation and thematics</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#sitesglobal" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-globe mrgn-rght-sm"></span>Sites and global</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#wetboew" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-cube mrgn-rght-sm"></span>Wet-boew</a>
		</li>
			<a href="#other" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-info-circle mrgn-rght-sm"></span>Other</a>
		</li>
		<li class="mrgn-lft-md">
			<a href="#implementing-developing" class="btn btn-link text-white"><span aria-hidden="true" class="fas fa-code mrgn-rght-sm"></span>Implementing&nbsp;/ Developing</a>
		</li>
	</ul>
</nav>
<div class="container">
	<p><small>Found an C&amp;IA implementation issue or you want to contribute at their development, let us know by submiting <a href="https://github.com/wet-boew/GCWeb/issues/new?title=C&amp;IA%20implementation%20error:%20">GCweb issue</a>, sending <a href="https://github.com/wet-boew/GCWeb/pulls">pull request</a> or by participating at one of our weekly <a href="https://github.com/wet-boew/wet-boew/wiki/WET-Office-hours,-Heures-de-service-de-la-BOEW">WET office hours</a> (formerly known as WET-BOEW code sprint) every Tuesday.</small></p>
	{% assign page_group = site.data.i18n.page_group[ page.language ] %}
	{% assign comp_status = site.data.i18n.component_status[ page.language ] %}
	<details class="mrgn-tp-lg">
		<summary>Meaning of statuses</summary>
		<dl class="dl-horizontal mrgn-bttm-0">
			<dt><span class="label label-success">{{comp_status.stable}}</span></dt>
			<dd>Meet the latest published specification.</dd>
			<dt><span class="label label-warning">{{comp_status.provisional}}</span></dt>
			<dd>Relatively stable, yet experimental; use at your own risks.</dd>
			<dt><span class="label label-danger">{{comp_status.deprecated}}</span></dt>
			<dd>Do not use because it's deprecated, but listed here for your information.</dd>
			<dt><span class="label label-default">Undefined</span></dt>
			<dd>Missing State in the component documentation.</dd>
			<!--<dt><span class="label label-success">Up to spec</span></dt>
			<dd>Meet the latest published C&amp;IA specification.</dd>
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
			<dd>Incomplete because it don't fully meet all the specification yet. Still need developpement work.</dd>-->
		</dl>
	</details>
	<h2 id="components" class="mrgn-bttm-lg">Components</h2>
	<ul class="row list-unstyled wb-eqht-grd wb-filter mrgn-tp-md pb-4" data-wb-filter='{ "selector": ">li" }'>
	{% for component in site.data.components %}
		{% assign list-pages = component.pages %}
		<li class="col-xs-12 col-md-6 mrgn-tp-md mrgn-bttm-md">
			<div class="brdr-tp brdr-rght brdr-bttm brdr-lft hght-inhrt">
				<h3 class="mrgn-tp-md mrgn-rght-md mrgn-bttm-md mrgn-lft-md">{{ component.title[ page.language ] }}
				{% if component.status == "stable" %}
				<span class="label label-success mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ component.status ] }}</span>
				{% elsif component.status == "provisional" %}
				<span class="label label-warning mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ component.status ] }}</span>
				{% elsif component.status == "deprecated" %}
				<span class="label label-danger mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ component.status ] }}</span>
				{% else %}
				<span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>Undefined</span>
				{% endif %}
				</h3>
				<div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
					<p>{{ component.description[ page.language ] | default: "[Short description of the component]" }}</p>
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
							{{ mainExamples.path }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% elsif mainExamples.url %}
						<a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% else %}
						<span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example
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
					<li><a href="https://github.com/wet-boew/GCWeb/tree/master/components/{{ component.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Source code</a></li>
					</ul>
					<!--
					> All examples and info
					* Example
					* Documentation
					* Spec
					-->
					<details class="mrgn-tp-lg"><summary>All examples and info</summary>
					<ul class="list-unstyled">
					{% for pgGroup in list-pages %}
						{% assign grpkey = pgGroup[0] %}
						<li>{{ page_group[ grpkey ] | default: "Unknown group" }}
							<ul>
							{% assign examples = pgGroup[1] %}
							{% for example in examples %}
								{% if example.path %}
								<li><a href="components/
											{%- if component.componentName -%}
												{{ component.componentName }}/
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
	<hr />
	<h2 id="templates" class="mrgn-bttm-lg pt-4">Templates</h2>
	<ul class="row list-unstyled wb-eqht-grd wb-filter mrgn-tp-md pb-4" data-wb-filter='{ "selector": ">li" }'>
	{% for template in site.data.templates %}
		{% assign list-pages = template.pages %}
		<li class="col-xs-12 col-md-6 mrgn-tp-md mrgn-bttm-md">
			<div class="brdr-tp brdr-rght brdr-bttm brdr-lft hght-inhrt">
				<h3 class="mrgn-tp-md mrgn-rght-md mrgn-bttm-md mrgn-lft-md">{{ template.title[ page.language ] }}
				{% if template.status == "stable" %}
				<span class="label label-success mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ template.status ] }}</span>
				{% elsif template.status == "provisional" %}
				<span class="label label-warning mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ template.status ] }}</span>
				{% elsif template.status == "deprecated" %}
				<span class="label label-danger mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ template.status ] }}</span>
				{% else %}
				<span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>Undefined</span>
				{% endif %}
				</h3>
				<div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
					<p>{{ template.description[ page.language ] | default: "[Short description of the template]" }}</p>
					<!--
					Main working example
					- First working example in the example list where the language match
					-->
					{% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
					<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
					{% if mainExamples %}
					<li>
					{% if mainExamples.path %}
					<a href="templates/
								{%- if template.componentName -%}
									{{ template.componentName }}/
								{%- endif -%}
							{{ mainExamples.path }}" {% if mainExamples.language != page.language %}lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"{% endif %}><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% elsif mainExamples.url %}
						<a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% else %}
						<span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example
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
					<details class="mrgn-tp-lg"><summary>All examples and info</summary>
						<ul class="mrgn-tp-md">
							{% for pgGroup in list-pages %}
							{% assign grpkey = pgGroup[0] %}
							<li>{{ page_group[ grpkey ] | default: "Unknown group" }}
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
	<hr />
	<h2 id="designPatterns" class="mrgn-bttm-lg pt-4">Design patterns</h2>
	<ul class="row list-unstyled wb-eqht-grd wb-filter mrgn-tp-md pb-4" data-wb-filter='{ "selector": ">li" }'>
	{% for designPattern in site.data.design-patterns %}
		{% assign list-pages = designPattern.pages %}
		<li class="col-xs-12 col-md-6 mrgn-tp-md mrgn-bttm-md">
			<div class="brdr-tp brdr-rght brdr-bttm brdr-lft hght-inhrt">
				<h3 class="mrgn-tp-md mrgn-rght-md mrgn-bttm-md mrgn-lft-md">{{ designPattern.title[ page.language ] }}</h3>
				<div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
					<p>{{ designPattern.description[ page.language ] | default: "[Short description of the design pattern]" }}</p>
					<!--
					Main working example
					- First working example in the example list where the language match
					-->
					{% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
					<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
					{% if mainExamples %}
					<li>
					{% if mainExamples.path %}
					<a href="design-patterns/
								{%- if designPattern.componentName -%}
									{{ designPattern.componentName }}/
								{%- endif -%}
							{{ mainExamples.path }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% elsif mainExamples.url %}
						<a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% else %}
						<span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example
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
						<li><a href="design-patterns/{{ designPattern.componentName }}/{{ doc.path }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
					{% endfor %}
					{% endif %}
					<li><a href="https://github.com/wet-boew/GCWeb/tree/master/design-patterns/{{ designPattern.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Source code</a></li>
					</ul>
					<!--
					> All examples and info
					* Example
					* Documentation
					* Spec
					-->
					<details class="mrgn-tp-lg"><summary>All examples and info</summary>
					<ul class="list-unstyled">
					{% for pgGroup in list-pages %}
						{% assign grpkey = pgGroup[0] %}
						<li>{{ page_group[ grpkey ] | default: "Unknown group" }}
							<ul>
							{% assign examples = pgGroup[1] %}
							{% for example in examples %}
								{% if example.path %}
								<li><a href="design-patterns/
											{%- if designPattern.componentName -%}
												{{ designPattern.componentName }}/
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
				<h2 id="experiment" class="mrgn-tp-md mrgn-bttm-0">Special features</h2>
					<div class="row">
					    <div class="col-md-6">
					    	<h3 id="méli-mélo">Experimentation</h3>
						<p>The experimentation hub you have been waiting for! The méli-mélo compilation which include experimental code allow you to bring in some awesome new code you would usually consider "custom" to the Canada.ca theme.</p>
						<p class="mrgn-tp-lg"><a href="méli-mélo/méli-mélo-en.html" class="btn btn-default btn-lg">Learn more<span class="wb-inv"> about experimentation</span></a></p>
					    </div>
					    <div class="col-md-6">
						<h3 id="thematics">Promotional thematics</h3><p>Do you have a set of pages that use an original look related to a specific promotion? Try this special hub for promotional thematics instead.</p>
						<p class="mrgn-tp-lg"><a href="th%C3%A9matique/gc-th%C3%A9matique-en.html" class="btn btn-default btn-lg">Learn more<span class="wb-inv"> about promotional thematics</span></a></p>
				</div>
			</div>
        	</div>
        </div>
    </div>
</div>
<div class="container">
	<h2 id="sitesglobal">Sites and global functionality</h2>
	<ul>
	  <li><a href="#core-canadaca-theme">Core components for the Canada.ca theme</a></li>
	  <li><a href="#common-components">Common components</a></li>
	</ul>

	<h3 id="core-canadaca-theme">Core components for the Canada.ca theme</h3>
	<ul class="row list-unstyled wb-eqht-grd wb-filter mrgn-tp-md" data-wb-filter='{ "selector": ">li" }'>
	{% for item in site.data.sites %}
		{% assign list-pages = item.pages %}
		<li class="col-xs-12 col-md-6 mrgn-tp-md mrgn-bttm-md">
			<div class="brdr-tp brdr-rght brdr-bttm brdr-lft hght-inhrt">
				<h4 class="mrgn-tp-md mrgn-rght-md mrgn-bttm-md mrgn-lft-md">{{ item.title[ page.language ] }}
				{% if item.status == "stable" %}
				<span class="label label-success mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
				{% elsif item.status == "provisional" %}
				<span class="label label-warning mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
				{% elsif item.status == "deprecated" %}
				<span class="label label-danger mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
				{% else %}
				<span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>Undefined</span>
				{% endif %}
				</h4>
				<div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
					<p>{{ item.description[ page.language ] | default: "[Short description of the site global functionality]" }}</p>
					<!--
					Main working example
					- First working example in the example list where the language match
					-->
					{% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
					<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
					{% if mainExamples %}
					<li>
					{% if mainExamples.path %}
					<a href="sites/
								{%- if item.componentName -%}
									{{ item.componentName }}/
								{%- endif -%}
							{{ mainExamples.path }}" {% if mainExamples.language != page.language %}lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"{% endif %}><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% elsif mainExamples.url %}
						<a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% else %}
						<span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example
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
						<li><a href="sites/{{ item.componentName }}/{{ doc.path }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
					{% endfor %}
					{% endif %}
					</ul>
					<!--
					> All examples and info
					* Example
					* Documentation
					* Spec
					-->
					<details class="mrgn-tp-lg"><summary>All examples and info</summary>
						<ul class="mrgn-tp-md">
							{% for pgGroup in list-pages %}
							{% assign grpkey = pgGroup[0] %}
							<li>{{ page_group[ grpkey ] | default: "Unknown group" }}
								<ul>
								{% assign examples = pgGroup[1] %}
								{% for example in examples %}
									{% if example.path %}
									<li><a href="sites/
												{%- if item.componentName -%}
													{{ item.componentName }}/
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

	<h3 id="common-components">Common components</h3>
	<ul class="row list-unstyled wb-eqht-grd wb-filter mrgn-tp-md" data-wb-filter='{ "selector": ">li" }'>
	{% for item in site.data.common %}
		{% assign list-pages = item.pages %}
		<li class="col-xs-12 col-md-6 mrgn-tp-md mrgn-bttm-md">
			<div class="brdr-tp brdr-rght brdr-bttm brdr-lft hght-inhrt">
				<h4 class="mrgn-tp-md mrgn-rght-md mrgn-bttm-md mrgn-lft-md">{{ item.title[ page.language ] }}
				{% if item.status == "stable" %}
				<span class="label label-success mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
				{% elsif item.status == "provisional" %}
				<span class="label label-warning mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
				{% elsif item.status == "deprecated" %}
				<span class="label label-danger mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
				{% else %}
				<span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>Undefined</span>
				{% endif %}
				</h4>
				<div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
					<p>{{ item.description[ page.language ] | default: "[Short description of the common component]" }}</p>
					<!--
					Main working example
					- First working example in the example list where the language match
					-->
					{% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
					<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
					{% if mainExamples %}
					<li>
					{% if mainExamples.path %}
					<a href="common/
								{%- if item.componentName -%}
									{{ item.componentName }}/
								{%- endif -%}
							{{ mainExamples.path }}" {% if mainExamples.language != page.language %}lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"{% endif %}><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% elsif mainExamples.url %}
						<a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% else %}
						<span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example
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
						<li><a href="common/{{ item.componentName }}/{{ doc.path }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
					{% endfor %}
					{% endif %}
					</ul>
					<!--
					> All examples and info
					* Example
					* Documentation
					* Spec
					-->
					<details class="mrgn-tp-lg"><summary>All examples and info</summary>
						<ul class="mrgn-tp-md">
							{% for pgGroup in list-pages %}
							{% assign grpkey = pgGroup[0] %}
							<li>{{ page_group[ grpkey ] | default: "Unknown group" }}
								<ul>
								{% assign examples = pgGroup[1] %}
								{% for example in examples %}
									{% if example.path %}
									<li><a href="common/
												{%- if item.componentName -%}
													{{ item.componentName }}/
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
	                           <!-- The new added section of wet-boew -->
	<h2 id="wetboew" class="mrgn-bttm-lg">Wet-boew</h2>
	<ul class="row list-unstyled wb-eqht-grd wb-filter mrgn-tp-md pb-4" data-wb-filter='{ "selector": ">li" }'>
	{% for wetboew in site.data[ "wet-boew" ] %}
		{% assign list-pages = wetboew.pages %}
		<li class="col-xs-12 col-md-6 mrgn-tp-md mrgn-bttm-md">
			<div class="brdr-tp brdr-rght brdr-bttm brdr-lft hght-inhrt">
				<h3 class="mrgn-tp-md mrgn-rght-md mrgn-bttm-md mrgn-lft-md">{{ wetboew.title[ page.language ] }}
				{% if wetboew.status == "stable" %}
				<span class="label label-success mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ wetboew.status ] }}</span>
				{% elsif wetboew.status == "provisional" %}
				<span class="label label-warning mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ wetboew.status ] }}</span>
				{% elsif wetboew.status == "deprecated" %}
				<span class="label label-danger mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ wetboew.status ] }}</span>
				{% else %}
				<span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>Undefined</span>
				{% endif %}
				</h3>
				<div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
					<p>{{ wetboew.description[ page.language ] | default: "[Short description of the wetboew]" }}</p>
					<!--
					Main working example
					- First working example in the example list where the language match
					-->
					{% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
					<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
					{% if mainExamples %}
					<li>
					{% if mainExamples.path %}
					<a href="wet-boew/
								{%- if wetboew.componentName -%}
									{{ wetboew.componentName }}/
								{%- endif -%}
							{{ mainExamples.path }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% elsif mainExamples.url %}
						<a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
					{% else %}
					<span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example
					{% endif %}
					{% endif %}
					<!--
					Documentation
					- Link to the documentations if any
					-->
					{% if list-pages.docs %}
					<!--<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">-->
					{% assign docs = list-pages.docs | where: "language", page.language %}
					<!--
					Documentation in GCWeb repo
					-->
					  {% for doc in docs %}
					      {% if doc.url %}
						<li><a href="{{ doc.url }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
					       {% endif %}
					   {% endfor %}
					{% endif %}
					    <li><a href="https://github.com/wet-boew/GCWeb/tree/master/wet-boew/{{  wetboew.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Source code</a></li>
					</ul>
					<!--
					> All examples and info
					* Example
					* Documentation
					* Spec
					-->
					<details class="mrgn-tp-lg"><summary>All examples and info</summary>
					<ul class="list-unstyled">
					{% for pgGroup in list-pages %}
						{% assign grpkey = pgGroup[0] %}
						<li>{{ page_group[ grpkey ] | default: "Unknown group" }}
							<ul>
							{% assign examples = pgGroup[1] %}
							{% for example in examples %}
								{% if example.path %}
								<li><a href="wet-boew/
											{%- if wetboew.componentName -%}
												{{ wetboew.componentName }}/
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
	<hr />
	<h2 id="other">Other documentation</h2>
	<div class="row mrgn-tp-md">
		<div class="col-md-8">
			<section class="row d-flex">
				<div class="col-xs-3 col-md-2 d-flex align-self-center">
					<img src="https://raw.github.com/wet-boew/wet-boew-attachments/master/Promo/WET_Logo.png" class="full-width" alt="">
				</div>
				<div class="col-xs-9 col-md-10">
					<h3 class="mrgn-tp-md" id="wet-boew-demos">WET features styled with Canada.ca theme</h3>
					<p><a href="/gcweb-compiled-demos/index.html#wet-boew">view list of demos</a></p>
				</div>
			</section>
		</div>
	</div>
	<h3 id="gcweb-project-documentation">GCWeb project documentation</h3>
	<ul>
		<li><a href="docs/index.html">GCWeb theme - Meta information</a></li>
		<li><a href="docs/v5-migration.html">Migration instruction - GCWeb theme V5</a></li>
		<li><a href="docs/GCWeb-en.html">Archived - Documentation - GCWeb English</a></li>
		<li><a href="docs/release/index-en.html">Archived - Releases English</a></li>
		<li><a href="docs/static-header-footer/bootstrap-3.html">Skeleton - Static header/footer - Bootstrap 3</a></li>
		<li><a href="docs/static-header-footer/bootstrap-4.html">Prototype skeleton - Static header/footer - Bootstrap 4</a></li>
	</ul>
	<h4>Evaluations and reports</h4>
	<ul>
		<li><a href="docs/evaluation-report/1-accessibility.html">1 - Accessibility assessment as 2018-11-14</a></li>
		<li><a href="docs/evaluation-report/2-wetplugin-gcweb2.html">2 - Regression user acceptance testing as 2018-11-16</a></li>
	</ul>
	<div class="cnt-wdth-lmtd">
		<h2 id="implementing-developing"><span aria-hidden="true" class="fas fa-code mrgn-rght-md"></span>Implementing&nbsp;/ Developing</h2>
		<h3>Implementing GCWeb on your site</h3>
		<p>Implementation guide for the Canada.ca theme with the Web Experience Toolkit version 4.x.</p>
		<p><a href="docs/implementing-en.html" class="btn btn-lg btn-default">Quick guide</a></p>
		<h3 id="developing-for-gcweb">Developing for WET / GCWeb</h3>
		<p>Join the community and start creating, improving and fixing GCWeb, the Canada.ca theme. Learn how to set up your local environment.</p>
		<p class="mrgn-bttm-lg"><a href="docs/developing-en.html" class="btn btn-call-to-action">Start coding</a></p>
	</div>
</div>
{:/}
