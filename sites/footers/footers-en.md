---
altLangPage: footers-fr.html
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

The global (site-wide) footer at the bottom of each web page can contain up to 3 bands:
* Contextual band
* Main band
* Sub-footer band

Consult the Canada.ca Design System for guidance on which footer elements or custom implementations to use based on the type of page you're creating:
* [Global footer - Canada.ca Design System](https://design.canada.ca/common-design-patterns/site-footer.html)

## Latest changes

### Version 6.0

The following changes have been made since **version 2.0**:
* Added a contextual band above the main band.
* The `.landscape` class was renamed to `.gc-main-footer`
* Added new heading "Government of Canada" in the main band.
* Added row of government-wide links.
* Added short white horizontal rule to separate government-wide links and theme and topics links.
* Modified the list of themes and topics links.
* The classes for the themes and topics links list were updated to `list-col-xs-1 list-col-sm-2 list-col-md-3`.
  * Some lists now use the CSS "Flexbox" feature which distributes links horizontally instead of vertically.
  * Links are now displayed in one (1) column on extra small screens, in two (2) columns on small screens, and in three (3) columns on medium screens and up.
* The `.brand` class was renamed to `.gc-sub-footer`
* The links "Terms and conditions" and "Privacy" have to remain visible at all times, even when `noFooterCorporate` is set to true.
* Removed "Top of page" anchor.
* Complete rework of the footer's headings for accessibility.
* GCWeb Jekyll specific: Footer skip link should always remain.
* Changed the "Veterans and military" URL.

The following changes have been made since **version 4.0**:
* Changed “All Contacts” to “All contacts”.
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

* For the contextual band over the main band: 
  * the title and links are defined globally in `_config.yml`. It is also possible to remove the contextual band globally by removing its definition in `_config.yml`.
  * the title and links can be changed for specific pages in the page's `contextualFooter` property.
* The links "Terms and conditions" and "Privacy" are visible at all times, even when `noFooterCorporate` is set to true.
* Footer skip link should always remain.

## Previous footer versions

Here is a list of [previous footer versions](old-footers-en.html) with their associated code samples.
