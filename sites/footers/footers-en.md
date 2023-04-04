---
altLangPage: footers-fr.html
breadcrumbs:
  - title: GCWeb
    link: https://wet-boew.github.io/GCWeb/index-en.html
contextualFooter:
  title: "[Contextual footer header]"
  links:
  - url: http://canada.ca/en
    text: Contextual link 1
  - url: http://canada.ca/en
    text: Contextual link 2
  - url: http://canada.ca/en
    text: Contextual link 3
dateModified: 2023-01-16
includes:
  footer: edge
language: en
secondlevel: false
share: true
title: Footer
---
<div class="wb-prettify all-pre hide"></div>

{% include alert-softlaunch.html component="site footer" version="6" %}

The global (site-wide) footer at the bottom of each web page can contain up to 3 bands:
* Contextual band
* Main band
* Sub-footer band

Consult the Canada.ca Design System for guidance on which footer elements or custom implementations to use based on the type of page you're creating:
* [Global footer - Canada.ca Design System](https://design.canada.ca/common-design-patterns/site-footer.html)

## Latest changes

### Version 6.0

The following changes have been made since version 5.0:
* Changed the "Veterans and military" URL.

## Reference implementation

<figure>
  <figcaption class="h3">Expected output code - Complete footer</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## Alternate implementations

### Standard pages

* [Main band and sub-footer band only (default implementation)](no-footer-contextual-en.html)

### Transactional or campaign pages only

* [Main band and sub-footer band only](no-footer-contextual-en.html)
* [Main band and sub-footer band with no optional links](only-footer-main-en.html)
* [Contextual band and sub-footer band](no-footer-main-en.html)
* [Contextual band and sub-footer band with no optional links](only-footer-contextual-en.html)
* [Sub-footer band only](only-footer-corporate-en.html)
* [Sub-footer band with no optional links](no-footers-en.html)

## GCWeb-Jekyll implementation

* The title and links are defined globally in `_config.yml`. It is also possible to remove the contextual band globally by removing its definition in `_config.yml`.
* The title and links can be changed for specific pages in the page's `contextualFooter` property.
* The links "Terms and conditions" and "Privacy" are visible at all times, even when `noFooterCorporate` is set to true.
* Footer skip link should always remain.

## Previous footer versions

Here is a list of [previous footer versions](old-footers-en.html) with their associated code samples.
