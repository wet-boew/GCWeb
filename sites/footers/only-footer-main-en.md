---
altLangPage: only-footer-main-fr.html
breadcrumbs:
  - title: Footer
    link: sites/footers/footers-en.html
dateModified: 2023-01-16
includes:
  footer: edge
language: en
noFooterContextual: 'true'
noFooterCorporate: 'true'
secondlevel: false
share: 'true'
title: Main band and sub-footer band with no optional links
titleH1: Display main band and sub-footer band with no optional links
---
<div class="wb-prettify all-pre hide"></div>

The global (site-wide) footer at the bottom of each web page contains up to 3 bands:
* Contextual band
* Main band
* Sub-footer band

The contextual band is optional on all page types (standard, transactional, campaign).

On **transactional** and **campaign** pages, you can omit the Social media, Mobile applications and About Canada.ca links from the sub-footer band.

## Reference implementation
<figure>
  <figcaption class="h3">Expected output code - Footer with no contextual band and no optional links in sub-footer band</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## For GCWeb-Jekyll theme
By setting the `noFooterContextual` and `noFooterCorporate` variables to "true", the contextual band and optional links from the sub-footer band will be hidden on page load.</p>

## Guidance
Consult the Canada.ca Design System for guidance on which footer elements to use based on the type of page you’re creating:
* [Global footer - Canada.ca Design System](https://design.canada.ca/common-design-patterns/site-footer.html)