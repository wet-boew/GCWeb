---
altLangPage: no-footer-contextual-fr.html
breadcrumbs:
 - title: Footer
   link: sites/footers/footers-en.html
dateModified: 2023-01-16
includes:
  footer: edge
language: en
noFooterContextual: true
secondlevel: false
share: true
title: Main footer band and sub-footer band
titleH1: Display main footer band and sub-footer band
---
<div class="wb-prettify all-pre hide"></div>

The global (site-wide) footer at the bottom of each web page contains up to 3 bands:
* Contextual band
* Main band
* Sub-footer band

The contextual band is optional on all page types (standard, transactional, campaign).

## Reference implementation

<figure>
  <figcaption class="h3">Expected output code - Footer with no contextual band</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## GCWeb-Jekyll implementation

* By setting the `noFooterContextual` variable to "true", the contextual band will be hidden on page load.
* The contextual band is defined in `_config.yml`, but can also be overwritten on any given page in the front matter section (view [Complete footer](footers-en.html) for an example).


## Guidance

Consult the Canada.ca Design System for guidance on which footer elements to use based on the type of page you’re creating:

* [Global footer - Canada.ca Design System](https://design.canada.ca/common-design-patterns/site-footer.html)