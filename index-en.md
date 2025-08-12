---
title: GCWeb, the WET-BOEW Canada.ca theme
altLangPage: index-fr.html
dateModified: 2025-07-23
description: "Home page describing all the components of the Canada.ca theme, named GCWeb."
layout: no-container
language: en
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
  <h1 id="wb-cont" property="name">GCWeb, the WET-BOEW Canada.ca theme</h1>
  <div class="row">
    <div class="col-md-7 col-lg-8">
      <p>The page templates and design patterns below comprise a reference implementation of the <a href="https://design.canada.ca">Canada.ca design system</a>, including the mandatory requirement of the Content and Information Architecture (C&amp;IA) Specification. Government of Canada departments and agencies can contribute additional patterns and templates via <a href="https://github.com/wet-boew/GCWeb">GCWeb github repository</a>.</p>
    </div>
    <div class="col-xs-12 col-md-auto pull-right">
      <p><a href="https://github.com/wet-boew/GCWeb/archive/v17.1.1.zip" class="btn btn-primary">Download GCWeb theme <strong>v17.1.1</strong></a><br>
        <small>(<time>{{ page.dateModified | date: '%F' }}</time> - <a href="https://github.com/wet-boew/gcweb/releases/latest">Release notes</a>)</small></p>
    </div>
  </div>
</div>
<div class="container">
  <p><small>Found a C&amp;IA implementation issue or you want to contribute at their development? Let us know by submitting <a href="https://github.com/wet-boew/GCWeb/issues/new?title=C&amp;IA%20implementation%20error:%20">GCweb issue</a>, sending <a href="https://github.com/wet-boew/GCWeb/pulls">pull request</a> or by participating at one of our weekly <a href="https://github.com/wet-boew/wet-boew/wiki/WET-Office-hours,-Heures-de-service-de-la-BOEW">WET office hours</a> (formerly known as WET-BOEW code sprint) every Tuesday.</small></p>
  {% assign page_group = site.data.i18n.page_group[ page.language ] %}
  {% assign comp_status = site.data.i18n.component_status[ page.language ] %}
  <details class="mrgn-tp-lg mrgn-bttm-lg">
    <summary>Meaning of statuses</summary>
    <dl class="dl-horizontal mrgn-bttm-0">
      <dt><span class="label label-success">{{comp_status.stable}}</span></dt>
      <dd>Meet the latest published specification.</dd>
      <dt><span class="label label-warning">{{comp_status.provisional}}</span></dt>
      <dd>Relatively stable, yet experimental; use at your own risks.</dd>
      <dt><span class="label label-danger">{{comp_status.deprecated}}</span></dt>
      <dd>Do not use because it's deprecated, but listed here for your information.</dd>
      <dt><span class="label label-default">{{comp_status.demoted}}</span></dt>
      <dd>Not recommended as it's going to be deprecated in the next major version.</dd>
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
      <dd>Need to be developed.</dd>
      <dt><span class="label label-danger">Incomplete</span></dt>
      <dd>Incomplete because it don't fully meet all the specification yet. Still need development work.</dd>-->
    </dl>
  </details>

  <div class="wb-tagfilter provisional wb-filter" data-wb-filter='{ "selector": "li.grid-item", "section": ".wb-tagfilter-items", "uiTemplate": "#searchFilterTemplate" }'>
    <div id="searchFilterTemplate" class="d-sm-flex align-items-center mb-4" style="justify-content: space-between;">
      <div class="form-group mb-0 mr-sm-3" style="flex-grow: 1;">
        <label for="searchFilter" class="h6 mb-2">Search</label>
        <input type="search" class="form-control full-width" placeholder="Enter keywords..." id="searchFilter">
      </div>
      <div class="form-group mrgn-bttm-0 mr-3">
        <fieldset class="p-0">
          <legend class="h6 mrgn-bttm-0"><span class="field-name">Category</span></legend>
          <ul class="list-unstyled list-inline mb-0">
            <li class="checkbox">
              <label>
                <input type="checkbox" name="type" class="wb-tagfilter-ctrl" value="component"> Component
              </label>
            </li>
            <li class="checkbox">
              <label>
                <input type="checkbox" name="type" class="wb-tagfilter-ctrl" value="template"> Template
              </label>
            </li>
            <li class="checkbox">
              <label>
                <input type="checkbox" name="type" class="wb-tagfilter-ctrl" value="design-pattern"> Design Pattern
              </label>
            </li>
            <li class="checkbox">
              <label>
                <input type="checkbox" name="type" class="wb-tagfilter-ctrl" value="sites-global"> Sites and Global
              </label>
            </li>
            <li class="checkbox">
              <label>
                <input type="checkbox" name="type" class="wb-tagfilter-ctrl" value="wetboew"> Wet-boew
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
      {% assign overlay_id = 'details-overlay-' | append: component.componentName %}
      <li class="grid-item" data-wb-tags="component" style="list-style-type: none;">
        <!-- Overlay -->
        <section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
          <header class="modal-header">
            <h2 class="modal-title">{{ component.title[ page.language ] }}
              {% if component.status == "stable" %}
              <span class="label label-success mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ component.status ] }}</span>
              {% elsif component.status == "provisional" %}
              <span class="label label-warning mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ component.status ] }}</span>
              {% elsif component.status == "deprecated" %}
              <span class="label label-danger mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ component.status ] }}</span>
              {% elsif component.status == "demoted" %}
              <span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ component.status ] }}</span>
              {% else %}
              <span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>Undefined</span>
              {% endif %}
            </h2>
          </header>
          <div class="modal-body">
            <div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
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
              <details class="mrgn-tp-lg">
                <summary>All examples and info</summary>
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
        </section>
        <!-- Overlay End -->
        <a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
          <gcds-card
          class="h-100"
          card-title="{{ component.title[ page.language ] }}" 
          href="#{{ overlay_id }}" 
          badge="Component" 
          description="{{ component.description[ page.language ] | default: '[Short description of the component]' }}">
          </gcds-card>
        </a>
      </li>
    {% endfor %}
    <!-- Templates -->
    {% for template in site.data.templates %}
      {% assign list-pages = template.pages %}
      {% assign overlay_id = 'details-overlay-' | append: template.componentName %}
      <li class="grid-item" data-wb-tags="template" style="list-style-type: none;">
        <!-- Overlay -->
        <section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
          <header class="modal-header">
            <h2 class="modal-title">{{ template.title[ page.language ] }}
            {% if template.status == "stable" %}
            <span class="label label-success mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ template.status ] }}</span>
            {% elsif template.status == "provisional" %}
            <span class="label label-warning mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ template.status ] }}</span>
            {% elsif template.status == "deprecated" %}
            <span class="label label-danger mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ template.status ] }}</span>
            {% elsif template.status == "demoted" %}
            <span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ template.status ] }}</span>
            {% else %}
            <span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>Undefined</span>
            {% endif %}
            </h2>
          </header>
          <div class="modal-body">
            <div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
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
        </section>
        <!-- Overlay End -->
        <a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
          <gcds-card
          class="h-100"
          card-title="{{ template.title[ page.language ] }}"
          href="#{{ overlay_id }}"
          badge="Template" 
          description="{{ template.description[ page.language ] | default: '[Short description of the template]' }}">
          </gcds-card>
        </a>
      </li>
    {% endfor %}
    <!-- Design Patterns -->
    {% for designPattern in site.data.design-patterns %}
      {% assign list-pages = designPattern.pages %}
      {% assign overlay_id = 'details-overlay-' | append: designPattern.componentName %}
      <li class="grid-item" data-wb-tags="design-pattern" style="list-style-type: none;">
      <!-- Overlay -->
        <section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
          <header class="modal-header">
            <h2 class="modal-title">{{ designPattern.title[ page.language ] }}</h2>
          </header>
          <div class="modal-body">
            <div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
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
              <details class="mrgn-tp-lg">
                <summary>All examples and info</summary>
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
        </section>
        <!-- Overlay End -->
          <a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
            <gcds-card
            class="h-100"
            card-title="{{ designPattern.title[ page.language ] }}"
            href="#{{ overlay_id }}"
            badge="Design Pattern" 
            description="{{ designPattern.description[ page.language ] | default: '[Short description of the design pattern]' }}">
            </gcds-card>
          </a>
      </li>
    {% endfor %}
    <!-- Core components for the Canada.ca theme  -->
    {% for item in site.data.sites %}
      {% assign list-pages = item.pages %}
      {% assign overlay_id = 'details-overlay-' | append: item.componentName %}
      <li class="grid-item" data-wb-tags="sites-global" style="list-style-type: none;">
      <!-- Overlay -->
      <section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
        <header class="modal-header">
          <h2 class="modal-title">{{ item.title[ page.language ] }}
            {% if item.status == "stable" %}
            <span class="label label-success mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
            {% elsif item.status == "provisional" %}
            <span class="label label-warning mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
            {% elsif item.status == "deprecated" %}
            <span class="label label-danger mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
            {% elsif item.status == "demoted" %}
            <span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
            {% else %}
            <span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>Undefined</span>
            {% endif %}
          </h2>
        </header>
        <div class="modal-body">
          <div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
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
      </section>
      <!-- Overlay End -->
      <a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
        <gcds-card
        class="h-100"
        card-title="{{ item.title[ page.language ] }}" 
        href="#{{ overlay_id }}" 
        badge="Core Component" 
        description="{{ item.description[ page.language ] | default: '[Short description of the Canada.ca core component]' }}">
        </gcds-card>
      </a>
    </li>
    {% endfor %}
    <!-- Common Components -->
    {% for item in site.data.common %}
      {% assign list-pages = item.pages %}
      {% assign overlay_id = 'details-overlay-' | append: item.componentName %}
      <li class="grid-item" data-wb-tags="sites-global" style="list-style-type: none;">
        <!-- Overlay -->
        <section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
          <header class="modal-header">
            <h2 class="modal-title">{{ item.title[ page.language ] }}
              {% if item.status == "stable" %}
              <span class="label label-success mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
              {% elsif item.status == "provisional" %}
              <span class="label label-warning mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
              {% elsif item.status == "deprecated" %}
              <span class="label label-danger mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
              {% elsif item.status == "demoted" %}
              <span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ item.status ] }}</span>
              {% else %}
              <span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>Undefined</span>
              {% endif %}
            </h2>
          </header>
          <div class="modal-body">
            <div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
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
        </section>
        <!-- Overlay End -->
        <a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
          <gcds-card
          class="h-100"
          card-title="{{ item.title[ page.language ] }}"
          href="#{{ overlay_id }}"  
          badge="Common Component" 
          description="{{ item.description[ page.language ] | default: '[Short description of the common component]' }}">
          </gcds-card>
        </a>
      </li>
    {% endfor %}
    <!-- Wet-boew (New) -->
    {% for wetboew in site.data[ "wet-boew" ] %}
      {% assign list-pages = wetboew.pages %}
      {% assign overlay_id = 'details-overlay-' | append: wetboew.componentName %}
      <li class="grid-item" data-wb-tags="wetboew" style="list-style-type: none;">
      <!-- Overlay -->
      <section id="{{ overlay_id }}" class="mfp-hide modal-dialog modal-content overlay-def" role="dialog" aria-modal="true">
        <header class="modal-header">
            <h2 class="modal-title">{{ wetboew.title[ page.language ] }}
              {% if wetboew.status == "stable" %}
              <span class="label label-success mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ wetboew.status ] }}</span>
              {% elsif wetboew.status == "provisional" %}
              <span class="label label-warning mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ wetboew.status ] }}</span>
              {% elsif wetboew.status == "deprecated" %}
              <span class="label label-danger mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ wetboew.status ] }}</span>
              {% elsif wetboew.status == "demoted" %}
              <span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>{{ comp_status[ wetboew.status ] }}</span>
              {% else %}
              <span class="label label-default mrgn-lft-sm"><span class="wb-inv">State: </span>Undefined</span>
              {% endif %}
            </h2>
        </header>
        <div class="modal-body">
          <div class="mrgn-rght-md mrgn-bttm-md mrgn-lft-md">
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
            {% elsif mainExamples.wetboew %}
              <a href="{{ setting-demosBasePath }}wetboew-demos/{{ mainExamples.wetboew }}" lang="{{ mainExamples.language }}" hreflang="{{ mainExamples.language }}"><span class="fas fa-eye small mrgn-rght-sm" aria-hidden="true"></span>Working example</a>
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
            <details class="mrgn-tp-lg">
              <summary>All examples and info</summary>
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
                    {% elsif example.wetboew %}
                      <li><a href="{{ setting-demosBasePath }}wetboew-demos/{{ example.wetboew }}">{{ example.title }}</a></li>
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
      </section>
      <!-- Overlay End -->
        <a href="#{{ overlay_id }}" aria-controls="{{ overlay_id }}" class="wb-lbx lbx-modal no-undrln" role="button">
          <gcds-card
          class="h-100"
          card-title="{{ wetboew.title[ page.language ] }}"
          href="#{{ overlay_id }}" 
          badge="Wet-boew" 
          description="{{ wetboew.description[ page.language ] | default: '[Short description of the wetboew]' }}">
          </gcds-card>
        </a>
      </li>
    {% endfor %}
    </gcds-grid>
  </div>
</div>

<!-- Special Features -->
<div class="container-fluid">
  <div class="row">
    <div class="py-4 my-5 bg-gctheme text-white">
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
<!-- Special Features End -->

<div class="container">
  <!-- <h2 id="sitesglobal">Sites and global functionality</h2>
  <ul>
    <li><a href="#core-canadaca-theme">Core components for the Canada.ca theme</a></li>
    <li><a href="#common-components">Common components</a></li>
  </ul>
  <hr> -->

  <!-- Other documentation -->
  <h2 id="other">Other documentation</h2>
  <div class="row mrgn-tp-md">
    <div class="col-md-8">
      <section class="row d-flex">
        <div class="col-xs-3 col-md-2 d-flex align-self-center">
          <img src="https://raw.github.com/wet-boew/wet-boew-attachments/master/Promo/WET_Logo.png" class="full-width" alt="">
        </div>
        <div class="col-xs-9 col-md-10">
          <h3 class="mrgn-tp-md" id="wet-boew-demos">WET features styled with Canada.ca theme</h3>
          <p><a href="/gcweb-compiled-demos/index.html#wet-boew">View list of demos</a></p>
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
