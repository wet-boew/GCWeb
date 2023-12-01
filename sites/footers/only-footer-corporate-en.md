---
altLangPage: only-footer-corporate-fr.html
breadcrumbs:
  - title: Footer
    link: sites/footers/footers-en.html
dateModified: 2023-01-16
includes:
  footer: edge
language: en
noFooterContextual: 'true'
noFooterMain: 'true'
secondlevel: false
share: 'true'
title: Sub-footer band only
titleH1: Display sub-footer band only
---
<div class="wb-prettify all-pre hide"></div>

The global (site-wide) footer at the bottom of each web page contains up to 3 bands:
* Contextual band
* Main band
* Sub-footer band

The sub-footer band is mandatory on all page types (standard, transactional, campaign).

## Reference implementation
<figure>
  <figcaption class="h3">Expected output code - Sub-footer only</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## For GCWeb-Jekyll theme
By setting the `noFooterContextual` and `noFooterMain` variables to "true", the contextual and main bands will be hidden on page load.

## Guidance
Consult the Canada.ca Design System for guidance on which footer elements to use based on the type of page you’re creating:
* [Global footer - Canada.ca Design System](https://design.canada.ca/common-design-patterns/site-footer.html)