---
title: GCWeb, le thème WET-BOEW de Canada.ca
altLangPage: index-en.html
dateModified: 2025-10-07
description: "Page d'accueil décrivant l'ensemble des composants du thème de Canada.ca, nommé GCWeb."
layout: no-container
language: fr
overwriteBreadcrumbs: true
feedback: true
loadGCDS: true
css:
  - href: https://use.fontawesome.com/releases/v5.8.1/css/all.css
    integrity: sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf
---

{%- include variable-core.liquid -%}

{::nomarkdown}

<div class="container">
  <h1 id="wb-cont" property="name">GCWeb, le thème WET-BOEW de Canada.ca</h1>
  <div class="row">
    <div class="col-md-7 col-lg-8">
      <p>Les gabarits et les conceptions communes si dessous sont une référence d'implémentation du <a href="https://conception.canada.ca">Système de conception de Canada.ca</a>, incluant les exigences obligatoire de la spécifications du contenu et de l’architecture de l'information (C&amp;AI) pour Canada.ca. Les ministères et organisme du gouvernement du Canada peuvent y contribuer en publiant leur modèle et leur conception commune via le <a href="https://github.com/wet-boew/GCWeb">dépôt github de GCWeb</a>.</p>
    </div>
    <div class="col-xs-12 col-md-auto pull-right">
      <p><a href="https://github.com/wet-boew/GCWeb/archive/v17.6.0.zip" class="btn btn-primary">Télécharger le thème <strong>GCWeb v17.6.0</strong></a><br>
        <small>(<time>{{ page.dateModified | date: '%F' }}</time> - <a href="https://github.com/wet-boew/gcweb/releases/latest">Note de version</a>)</small></p>
    </div>
  </div>
</div>

<!-- Special Features -->
  <div class="bg-light py-4 mt-4">
    <div class="container">
      <h2 id="experiment" class="m-0">Fonctionnalités spéciales</h2>
      <div class="row">
        <div class="col-md-6">
          <h3 id="méli-mélo"><span class="fas fa-flask mrgn-rght-md" aria-hidden="true"></span>Expérimentation</h3>
          <p>Le centre d'expérimentation (méli-mélo) comprend du code expérimental que vous considérez généralement comme propre au thème Canada.ca.</p>
          <p><a href="méli-mélo/méli-mélo-fr.html">En savoir plus<span class="wb-inv"> sur les expérimentations</span></a></p>
        </div>
        <div class="col-md-6">
          <h3 id="thematics"><span class="fas fa-swatchbook mrgn-rght-md" aria-hidden="true"></span>Thématiques promotionnelles</h3>
          <p>Mettez en avant une promotion ou une campagne spécifique avec un look original grâce au hub thématique promotionnel spécial.</p>
          <p><a href="th%C3%A9matique/gc-th%C3%A9matique-fr.html">En savoir plus<span class="wb-inv"> sur les thématiques promotionnelles</span></a></p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Search and tag filters -->
<div class="container">
  {% assign page_group = site.data.i18n.page_group[ page.language ] %}
  {% assign comp_status = site.data.i18n.component_status[ page.language ] %}
  <h2>Composantes</h2>
  <div class="wb-tagfilter provisional wb-filter" data-wb-filter='{ "selector": "li.grid-item", "section": ".wb-tagfilter-items", "uiTemplate": "#searchFilterTemplate" }'>
    <div id="searchFilterTemplate" class="row mb-4">
      <div class="col-md-3 col-lg-4">
        <label for="searchFilter" class="h6 mb-2">Rechercher</label>
        <input type="search" class="form-control full-width wb-fltr-inpt" placeholder="Entrez des mots-clés..." id="searchFilter" data-wbfltrid="wb-auto-4" aria-controls="wb-auto-4">
      </div>
      <div class="col-md-9 col-lg-8">
        <fieldset class="p-0">
          <legend class="h6 mb-1"><span class="field-name">Catégorie</span></legend>
          <ul class="list-inline mb-0">
            <li class="checkbox">
              <label>
                <input type="checkbox" name="type" class="wb-tagfilter-ctrl" value="component" aria-controls="wb-auto-123"> Composantes
              </label>
            </li>
            <li class="checkbox">
              <label>
                <input type="checkbox" name="type" class="wb-tagfilter-ctrl" value="template" aria-controls="wb-auto-123"> Gabarits
              </label>
            </li>
            <li class="checkbox">
              <label>
                <input type="checkbox" name="type" class="wb-tagfilter-ctrl" value="core-element" aria-controls="wb-auto-123"> Éléments clés des gabarits
              </label>
            </li>
            <li class="checkbox">
              <label>
                <input type="checkbox" name="type" class="wb-tagfilter-ctrl" value="design-pattern" aria-controls="wb-auto-123"> Modèles de conception
              </label>
            </li>
          </ul>
        </fieldset>
      </div>
    </div>

  <!-- Components -->
<gcds-grid
  tag="ul"
  class="wb-tagfilter-items"
  columns-desktop="1fr 1fr 1fr"
  columns-tablet="1fr 1fr"
  columns="1fr"
  equal-row-height>
{% for component in site.data.components %}
{% assign list-pages = component.pages %}
{% assign overlay_id = 'details-overlay-component-' | append: component.componentName %}
<li class="grid-item list-unstyled" data-wb-tags="component ">
<!-- Overlay -->
<section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
<header class="modal-header">
<h2 class="modal-title">{{ component.title[ page.language ] }}
{% if component.status == "stable" %}
<span class="label label-success mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ component.status ] }}</span>
{% elsif component.status == "provisional" %}
<span class="label label-warning mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ component.status ] }}</span>
{% elsif component.status == "deprecated" %}
<span class="label label-danger mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ component.status ] }}</span>
{% elsif component.status == "demoted" %}
<span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ component.status ] }}</span>
{% else %}
<span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>Non défini</span>
{% endif %}
</h2>
</header>
<div class="modal-body">
<div class="mx-3">
<p>{{ component.description[ page.language ] | default: '[Courte description de la composante]' }}</p>
<a href="https://github.com/wet-boew/GCWeb/tree/master/components/{{ component.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Voir le code source</a>
{% for pgGroup in list-pages %}
{% assign grpkey = pgGroup[0] %}
<h3 class="h6">{{ page_group[ grpkey ] | default: "Groupe inconnu" }}</h3>
<ul>
{% assign examples = pgGroup[1] | where: "language", page.language %}
<!-- {% if examples.size == 0 %}
{% assign examples = pgGroup[1] | where: "language", "en" %}
{% endif %} -->
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
{% endfor %}
<!--
            Main working example
            - First working example in the example list where the language match
            -->
<!-- {% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
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
            {% endif %} -->
<!--
            Documentation
            - Link to the documentations if any
            -->
<!-- {% if list-pages.docs %} -->
<!--<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">-->
<!-- {% assign docs = list-pages.docs | where: "language", page.language %}
            {% for doc in docs %}
              <li><a href="components/{{ component.componentName }}/{{ doc.path }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
            {% endfor %}
            {% endif %}
            <li><a href="https://github.com/wet-boew/GCWeb/tree/master/components/{{ component.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Code source</a></li>
            </ul> -->
<!--
            * All examples and info
            * Example
            * Documentation
            * Spec
            -->
<!-- <details class="mrgn-tp-lg">
              <summary>Tous les exemples et info</summary>
            </details> -->
</div>
</div>
</section>
<!-- Overlay End -->
<a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
<gcds-card
        class="h-100"
        card-title="{{ component.title[ page.language ] }}"
        href="#{{ overlay_id }}"
        badge="Composante"
        description="{{ component.description[ page.language ] | default: '[Courte description de la composante]' }}">
</gcds-card>
</a>
</li>
{% endfor %}

  <!-- Templates -->

{% for template in site.data.templates %}
{% assign list-pages = template.pages %}
{% assign overlay_id = 'details-overlay-template-' | append: template.componentName %}
<li class="grid-item list-unstyled" data-wb-tags="template">
<!-- Overlay -->
<section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
<header class="modal-header">
<h2 class="modal-title">{{ template.title[ page.language ] }}
{% if template.status == "stable" %}
<span class="label label-success mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ template.status ] }}</span>
{% elsif template.status == "provisional" %}
<span class="label label-warning mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ template.status ] }}</span>
{% elsif template.status == "deprecated" %}
<span class="label label-danger mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ template.status ] }}</span>
{% elsif template.status == "demoted" %}
<span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ template.status ] }}</span>
{% else %}
<span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>Non défini</span>
{% endif %}
</h2>
</header>
<div class="modal-body">
<div class="mx-3">
<p>{{ template.description[ page.language ] | default: '[Courte description du gabarit]' }}</p>
<a href="https://github.com/wet-boew/GCWeb/tree/master/templates/{{ template.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Voir le code source</a>
{% for pgGroup in list-pages %}
{% assign grpkey = pgGroup[0] %}
<h3 class="h6">{{ page_group[ grpkey ] | default: "Groupe inconnu" }}</h3>
<ul>
{% assign examples = pgGroup[1] | where: "language", page.language %}
<!-- {% if examples.size == 0 %}
{% assign examples = pgGroup[1] | where: "language", "en" %}
{% endif %} -->
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
{% endfor %}
<!-- <p>{{ template.description[ page.language ] | default: "[Courte description du gabarit]" }}</p> -->
<!--
            Main working example
            - First working example in the example list where the language match
            -->
<!-- {% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
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
            {% endif %} -->
<!--
            Documentation
            - Link to the documentations if any
            -->
<!-- {% if list-pages.docs %} -->
<!--<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">-->
<!-- {% assign docs = list-pages.docs | where: "language", page.language %}
            {% for doc in docs %}
              <li><a href="templates/{{ template.componentName }}/{{ doc.path }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
            {% endfor %}
            {% endif %}
            </ul> -->
<!--
            * All examples and info
            * Example
            * Documentation
            * Spec
            -->
<!-- <details class="mrgn-tp-lg"><summary>Tous les exemples et info</summary>
            </details> -->
</div>
</div>
</section>
<!-- Overlay End -->
<a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
<gcds-card
        class="h-100"
        card-title="{{ template.title[ page.language ] }}"
        href="#{{ overlay_id }}"
        badge="Gabarit"
        description="{{ template.description[ page.language ] | default: '[Courte description du gabarit]' }}">
</gcds-card>
</a>
</li>
{% endfor %}

  <!-- Design Patterns -->
{% for designPattern in site.data.design-patterns %}
{% assign list-pages = designPattern.pages %}
{% assign overlay_id = 'details-overlay-design-pattern-' | append: designPattern.componentName %}
<li class="grid-item list-unstyled" data-wb-tags="design-pattern">
<!-- Overlay -->
<section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
<header class="modal-header">
<h2 class="modal-title">{{ designPattern.title[ page.language ] }}</h2>
</header>
<div class="modal-body">
<div class="mx-3">
<p>{{ designPattern.description[ page.language ] | default: '[Courte description des configurations de conception]' }}</p>
<a href="https://github.com/wet-boew/GCWeb/tree/master/design-patterns/{{ designPattern.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Voir le code source</a>
{% for pgGroup in list-pages %}
{% assign grpkey = pgGroup[0] %}
<h3 class="h6">{{ page_group[ grpkey ] | default: "Groupe inconnu" }}</h3>
<ul>
{% assign examples = pgGroup[1] | where: "language", page.language %}
<!-- {% if examples.size == 0 %}
{% assign examples = pgGroup[1] | where: "language", "en" %}
{% endif %} -->
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
{% endfor %}
<!-- <p>{{ designPattern.description[ page.language ] | default: "[Courte description des configurations de conception]" }}</p> -->
<!--
            Main working example
            - First working example in the example list where the language match
            -->
<!-- {% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
            <ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
            {% if mainExamples %}
            <li>
            {% if mainExamples.path %}
            <a href="design-patterns/
                  {%- if designPattern.componentName -%}
                    {{ designPattern.componentName }}/
                  {%- endif -%}
                {{ mainExamples.path }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
            {% elsif mainExamples.url %}
              <a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
            {% else %}
              <span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique
            {% endif %}
            {% endif %} -->
<!--
            Documentation
            - Link to the documentations if any
            -->
<!-- {% if list-pages.docs %} -->
<!--<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">-->
<!-- {% assign docs = list-pages.docs | where: "language", page.language %}
            {% for doc in docs %}
              <li><a href="design-patterns/{{ designPattern.componentName }}/{{ doc.path }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
            {% endfor %}
            {% endif %}
            <li><a href="https://github.com/wet-boew/GCWeb/tree/master/design-patterns/{{ designPattern.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Code source</a></li>
            </ul> -->
<!--
            * All examples and info
            * Example
            * Documentation
            * Spec
            -->
<!-- <details class="mrgn-tp-lg">
              <summary>Tous les exemples et info</summary>
            </details> -->
</div>
</div>
</section>
<!-- Overlay End -->
<a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
<gcds-card
          class="h-100"
          card-title="{{ designPattern.title[ page.language ] }}"
          href="#{{ overlay_id }}"
          badge="Modèle de conception"
          description="{{ designPattern.description[ page.language ] | default: '[Courte description des configurations de conception]' }}">
</gcds-card>
</a>
</li>
{% endfor %}

  <!-- Core components for the Canada.ca theme  -->
{% for item in site.data.sites %}
{% assign list-pages = item.pages %}
{% assign overlay_id = 'details-overlay-core-' | append: item.componentName %}
<li class="grid-item list-unstyled" data-wb-tags="core-element">
<!-- Overlay -->
<section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
<header class="modal-header">
<h2 class="modal-title">{{ item.title[ page.language ] }}
{% if item.status == "stable" %}
<span class="label label-success mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ item.status ] }}</span>
{% elsif item.status == "provisional" %}
<span class="label label-warning mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ item.status ] }}</span>
{% elsif item.status == "deprecated" %}
<span class="label label-danger mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ item.status ] }}</span>
{% elsif item.status == "demoted" %}
<span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ item.status ] }}</span>
{% else %}
<span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>Non défini</span>
{% endif %}
</h2>
</header>
<div class="modal-body">
<div class="mx-3">
<p>{{ item.description[ page.language ] | default: "[Courte description de la fonctionnalité globale]" }}</p>
<a href="https://github.com/wet-boew/GCWeb/tree/master/sites/{{ item.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Voir le code source</a>
{% for pgGroup in list-pages %}
{% assign grpkey = pgGroup[0] %}
<h3 class="h6">{{ page_group[ grpkey ] | default: "Groupe inconnu" }}</h3>
<ul>
{% assign examples = pgGroup[1] | where: "language", page.language %}
<!-- {% if examples.size == 0 %}
{% assign examples = pgGroup[1] | where: "language", "en" %}
{% endif %} -->
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
{% endfor %}
<!--
          Main working example
          - First working example in the example list where the language match
          -->
<!-- {% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
          <ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
          {% if mainExamples %}
          <li>
          {% if mainExamples.path %}
          <a href="sites/
                {%- if item.componentName -%}
                  {{ item.componentName }}/
                {%- endif -%}
              {{ mainExamples.path }}" {% if mainExamples.language != page.language %}lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"{% endif %}><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
          {% elsif mainExamples.url %}
            <a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
          {% else %}
            <span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique
          {% endif %}
          {% endif %} -->
<!--
          Documentation
          - Link to the documentations if any
          -->
<!-- {% if list-pages.docs %} -->
<!--<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">-->
<!-- {% assign docs = list-pages.docs | where: "language", page.language %}
          {% for doc in docs %}
            <li><a href="sites/{{ item.componentName }}/{{ doc.path }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
          {% endfor %}
          {% endif %}
          </ul> -->
<!--
          * All examples and info
          * Example
          * Documentation
          * Spec
          -->
<!-- <details class="mrgn-tp-lg"><summary>Tous les exemples et info</summary>
          </details> -->
</div>
</div>
</section>
<!-- Overlay End -->
<a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
<gcds-card
      class="h-100"
      card-title="{{ item.title[ page.language ] }}"
      href="#{{ overlay_id }}"
      badge="Élément clé"
      description="{{ item.description[ page.language ] | default: '[Courte description de la fonctionnalité globale]' }}">
</gcds-card>
</a>

  </li>
  {% endfor %}
  <!-- Common Components -->
  {% for item in site.data.common %}
    {% assign list-pages = item.pages %}
    {% assign overlay_id = 'details-overlay-common-' | append: item.componentName %}
    <li class="grid-item list-unstyled" data-wb-tags="component">
      <!-- Overlay -->
      <section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
        <header class="modal-header">
          <h2 class="modal-title">{{ item.title[ page.language ] }}
            {% if item.status == "stable" %}
            <span class="label label-success mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ item.status ] }}</span>
            {% elsif item.status == "provisional" %}
            <span class="label label-warning mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ item.status ] }}</span>
            {% elsif item.status == "deprecated" %}
            <span class="label label-danger mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ item.status ] }}</span>
            {% elsif item.status == "demoted" %}
            <span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ item.status ] }}</span>
            {% else %}
            <span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>Non défini</span>
            {% endif %}
          </h2>
        </header>
        <div class="modal-body">
          <div class="mx-3">
            <p>{{ item.description[ page.language ] | default: "[Courte description de la fonctionnalité commune]" }}</p>
            <a href="https://github.com/wet-boew/GCWeb/tree/master/common/{{ item.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Voir le code source</a>
            {% for pgGroup in list-pages %}
              {% assign grpkey = pgGroup[0] %}
            <h3 class="h6">{{ page_group[ grpkey ] | default: "Groupe inconnu" }}</h3>
            <ul>
              {% assign examples = pgGroup[1] | where: "language", page.language %}
              <!-- {% if examples.size == 0 %}
                {% assign examples = pgGroup[1] | where: "language", "en" %}
              {% endif %} -->
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
            {% endfor %}
            <!--
            Main working example
            - First working example in the example list where the language match
            -->
            <!-- {% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
            <ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
            {% if mainExamples %}
            <li>
            {% if mainExamples.path %}
            <a href="common/
                  {%- if item.componentName -%}
                    {{ item.componentName }}/
                  {%- endif -%}
                {{ mainExamples.path }}" {% if mainExamples.language != page.language %}lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"{% endif %}><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
            {% elsif mainExamples.url %}
              <a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
            {% else %}
              <span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique
            {% endif %}
            {% endif %} -->
            <!--
            Documentation
            - Link to the documentations if any
            -->
            <!-- {% if list-pages.docs %} -->
            <!--<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">-->
            <!-- {% assign docs = list-pages.docs | where: "language", page.language %}
            {% for doc in docs %}
              <li><a href="common/{{ item.componentName }}/{{ doc.path }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
            {% endfor %}
            {% endif %}
            </ul> -->
            <!--
            * All examples and info
            * Example
            * Documentation
            * Spec
            -->
            <!-- <details class="mrgn-tp-lg"><summary>Tous les exemples et info</summary>
            </details> -->
          </div>
        </div>
      </section>
      <!-- Overlay End -->
      <a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
        <gcds-card
        class="h-100"
        card-title="{{ item.title[ page.language ] }}"
        href="#{{ overlay_id }}"
        badge="Composante"
        description="{{ item.description[ page.language ] | default: '[Courte description de la fonctionnalité commune]' }}">
        </gcds-card>
      </a>
    </li>
  {% endfor %}
  <!-- Wet-boew (New) -->
  {% for wetboew in site.data[ "wet-boew" ] %}
    {% assign list-pages = wetboew.pages %}
    {% assign overlay_id = 'details-overlay-wetboew-' | append: wetboew.componentName %}
    <li class="grid-item list-unstyled" data-wb-tags="component">
    <!-- Overlay -->
      <section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
        <header class="modal-header">
            <h2 class="modal-title">{{ wetboew.title[ page.language ] }}
              {% if wetboew.status == "stable" %}
              <span class="label label-success mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ wetboew.status ] }}</span>
              {% elsif wetboew.status == "provisional" %}
              <span class="label label-warning mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ wetboew.status ] }}</span>
              {% elsif wetboew.status == "deprecated" %}
              <span class="label label-danger mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ wetboew.status ] }}</span>
              {% elsif wetboew.status == "demoted" %}
              <span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>{{ comp_status[ wetboew.status ] }}</span>
              {% else %}
              <span class="label label-default mrgn-lft-sm"><span class="wb-inv">État: </span>Non défini</span>
              {% endif %}
            </h2>
        </header>
        <div class="modal-body">
          <div class="mx-3">
            <p>{{ wetboew.description[ page.language ] | default: "[Courte description de wetboew]" }}</p>
            <a href="https://github.com/wet-boew/GCWeb/tree/master/wet-boew/{{ wetboew.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Voir le code source</a>
            {% for pgGroup in list-pages %}
              {% assign grpkey = pgGroup[0] %}
            <h3 class="h6">{{ page_group[ grpkey ] | default: "Groupe inconnu" }}</h3>
            <ul>
              {% assign examples = pgGroup[1] | where: "language", page.language %}
              <!-- {% if examples.size == 0 %}
                {% assign examples = pgGroup[1] | where: "language", "en" %}
              {% endif %} -->
              {% for example in examples %}
                {% if example.path %}
              <li><a href="wet-boew/
                    {%- if wetboew.componentName -%}
                      {{ wetboew.componentName }}/
                    {%- endif -%}
                  {{ example.path }}" {% if example.language != page.language %}lang="{{ example.language }}" hreflang="{{ example.language }}"{% endif %}>{{ example.title }}</a></li>
              {% elsif example.url %}
                <li><a href="{{ example.url }}">{{ example.title }}</a></li>
              {% elsif example.wetboew %}
                <li><a href="{{ setting-demosBasePath }}wetboew-demos/{{ example.wetboew }}">{{ example.title }}</a></li>
              {% else %}
                <li>{{ example.title }}</li>
              {% endif %}
            {% endfor %}
            </ul>
            {% endfor %}
            <!--
            Main working example
            - First working example in the example list where the language match
            -->
            <!-- {% assign mainExamples = list-pages.examples | where: "language", page.language | first %}
            <ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">
            {% if mainExamples %}
            <li>
            {% if mainExamples.path %}
            <a href="wet-boew/
                  {%- if wetboew.componentName -%}
                    {{ wetboew.componentName }}/
                  {%- endif -%}
                {{ mainExamples.path }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
            {% elsif mainExamples.url %}
              <a href="{{ mainExamples.url }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
            {% elsif mainExamples.wetboew %}
              <a href="{{ setting-demosBasePath }}wetboew-demos/{{ mainExamples.wetboew }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique</a>
            {% else %}
            <span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Exemple pratique
            {% endif %}
            {% endif %} -->
            <!--
            Documentation
            - Link to the documentations if any
            -->
            <!-- {% if list-pages.docs %} -->
            <!--<ul class="list-unstyled mrgn-bttm-lg mrgn-lft-md">-->
            <!-- {% assign docs = list-pages.docs | where: "language", page.language %} -->
            <!--
            Documentation in GCWeb repo
            -->
              <!-- {% for doc in docs %}
                  {% if doc.url %}
              <li><a href="{{ doc.url }}"><span class="fas fa-info-circle small mrgn-rght-sm" aria-hidden="true"></span>Documentation</a></li>
                  {% endif %}
              {% endfor %}
            {% endif %}
                <li><a href="https://github.com/wet-boew/GCWeb/tree/master/wet-boew/{{  wetboew.componentName }}" hreflang="en"><span class="fas fa-code small mrgn-rght-sm" aria-hidden="true"></span>Code source</a></li>
            </ul> -->
            <!--
            * All examples and info
            * Example
            * Documentation
            * Spec
            -->
            <!-- <details class="mrgn-tp-lg">
              <summary>Tous les exemples et info</summary>
            </details> -->
          </div>
        </div>
      </section>
    <!-- Overlay End -->
      <a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
        <gcds-card
        class="h-100"
        card-title="{{ wetboew.title[ page.language ] }}"
        href="#{{ overlay_id }}"
        badge="Composante"
        description="{{ wetboew.description[ page.language ] | default: '[Courte description de wetboew]' }}">
        </gcds-card>
      </a>
      </li>
  {% endfor %}
    </gcds-grid>
  </div>
  {% assign page_group = site.data.i18n.page_group[ page.language ] %}
  {% assign comp_status = site.data.i18n.component_status[ page.language ] %}
  <details class="my-4">
    <summary>Définition des états</summary>
    <dl class="dl-horizontal mrgn-bttm-0">
      <dt><span class="label label-success">{{comp_status.stable}}</span></dt>
      <dd>Rencontre les exigences d'une spécification.</dd>
      <dt><span class="label label-warning">{{comp_status.provisional}}</span></dt>
      <dd>Plutôt stable, mais expérimental; utilisez à vos risques et périls.</dd>
      <dt><span class="label label-danger">{{comp_status.deprecated}}</span></dt>
      <dd>Ne pas utilisé car c'est obsolète, mais disponible pour votre information.</dd>
      <dt><span class="label label-default">{{comp_status.demoted}}</span></dt>
      <dd>Utilisation non recommandée puisque ce sera obsolète à la prochaine version majeure.</dd>
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
      <dd>N'est pas conforme à la dernière spécification, mais il l'a précédemment été. Son rétablissement à la conformité nécessite des changements immédiat.</dd>
      <dt><span class="label label-default">Arriéré</span></dt>
      <dd>Nécessite du développement.</dd>
      <dt><span class="label label-danger">Incomplet</span></dt>
      <dd>Incomplet car il ne se conforme pas complètement à toute les exigences de la spécification. Nécessite encore des travaux de développement.</dd>-->
    </dl>
  </details>
</div>

<!-- Implement and develop -->
<div class="bg-light py-4 mt-4">
  <div class="container">
    <h2 id="implementing-developing" class="m-0">Implémenter et développer</h2>
    <div class="row">
      <div class="col-md-6">
        <h3 id="developing-for-gcweb"><span aria-hidden="true" class="fas fa-code mrgn-rght-md"></span>Développer pour GCWeb</h3>
        <p>Rejoignez la communauté et commencez à créer, améliorer et réparer GCWeb, le thème de Canada.ca. Apprenez comment organiser votre environnement local.</p>
        <p class="mb-4 mb-md-0"><a href="docs/developing-en.html" class="btn btn-lg btn-primary">Commencer à programmer</a></p>
      </div>
      <div class="col-md-6">
        <h3><span class="fas fa-toolbox mrgn-rght-md" aria-hidden="true"></span>Implémenter GCWeb sur votre site</h3>
        <p>Consultez le guide d'implémentation du thème Canada.ca à l'aide de la version 4.x de la boîte à outils l'expérience. Intégrez GCWeb à vos projets.</p>
        <p><a href="docs/implementing-en.html" class="btn btn-lg btn-default">Guide rapide</a></p>
      </div>
    </div>
  </div>
</div>

<!-- Other Documentation -->
<div class="container">
  <h2 id="other">Autre documentation</h2>
  <div class="row mrgn-tp-md">
    <div class="col-md-8">
      <section class="row d-flex">
        <div class="col-xs-3 col-md-2 d-flex align-self-center">
          <img src="https://raw.github.com/wet-boew/wet-boew-attachments/master/Promo/WET_Logo.png" class="full-width" alt="">
        </div>
        <div class="col-xs-9 col-md-10">
          <h3 class="mrgn-tp-md" id="wet-boew-demos">Fonctionnalités BOEW avec le thème de Canada.ca</h3>
          <p><a href="/gcweb-compiled-demos/index.html#wet-boew">Voir les démos</a></p>
        </div>
      </section>
    </div>
  </div>
  <details class="my-4">
    <summary>Documents et rapports du projet</summary>
    <h4>Documentation du projet GCWeb</h4>
    <ul>
      <li><a href="docs/index.html">GCWeb theme - Meta information</a></li>
      <li><a href="docs/v5-migration.html">Migration instruction - GCWeb theme V5</a></li>
      <li><a href="docs/GCWeb-en.html">Archived - Documentation - GCWeb English</a></li>
      <li><a href="docs/release/index-en.html">Archived - Releases English</a></li>
      <li><a href="docs/static-header-footer/bootstrap-3.html">Skeleton - Static header/footer - Bootstrap 3</a></li>
      <li><a href="docs/static-header-footer/bootstrap-4.html">Prototype skeleton - Static header/footer - Bootstrap 4</a></li>
    </ul>
    <h4>Évaluations et rapports</h4>
    <ul>
      <li><a href="docs/evaluation-report/1-accessibility.html">1 - Accessibility assessment as 2018-11-14</a></li>
      <li><a href="docs/evaluation-report/2-wetplugin-gcweb2.html">2 - Regression user acceptance testing as 2018-11-16</a></li>
    </ul>
  </details>
</div>
{:/}
