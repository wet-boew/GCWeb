---
altLangPage: no-footers-fr.html
breadcrumbs:
- title: Footer
  link: sites/footers/footers-en.html
dateModified: 2023-01-16
includes:
  footer: edge
language: en
noFooterCorporate: 'true'
noFooterContextual: 'true'
noFooterMain: 'true'
secondlevel: false
share: 'true'
title: Sub-footer band only, with no optional links
titleH1: Display sub-footer band only, with no optional links
---
<div class="wb-prettify all-pre hide"></div>

The global (site-wide) footer at the bottom of each web page contains up to 3 bands:
* Contextual band
* Main band
* Sub-footer band

The sub-footer band is mandatory on all page types, but on **transactional** and **campaign** pages, you can omit the Social media, Mobile applications and About Canada.ca links.

## Reference implementation
<figure>
  <figcaption class="h3">Expected output code - Minimum footer with only sub-footer band and no optional links</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## For GCWeb-Jekyll theme
By setting the `noFooterContextual`, `noFooterMain` and `noFooterCorporate` variables to "true", the contextual and main footer bands as well as optional links from the sub-footer band will be hidden on page load.

## Guidance
Consult the Canada.ca Design System for guidance on which footer elements to use based on the type of page you’re creating:
* [Global footer - Canada.ca Design System](https://design.canada.ca/common-design-patterns/site-footer.html)