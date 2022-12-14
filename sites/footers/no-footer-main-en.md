---
altLangPage: no-footer-main-fr.html
breadcrumbs:
  - title: Footer
    link: sites/footers/footers-en.html
contextualFooter:
  title: "[Contextual footer header]"
  links:
    - url: http://canada.ca/en
      text: Contextual link 1
    - url: http://canada.ca/en
      text: Contextual link 2
    - url: http://canada.ca/en
      text: Contextual link 3
dateModified": 2023-01-16
includes:
  footer: edge
language: en
noFooterMain: true
secondlevel: false
share: true
title: Main band and sub-footer band with no optional links
titleH1: Display main band and sub-footer band with no optional links
---
<div class="wb-prettify all-pre hide"></div>

{% include alert-softlaunch.html component="site footer" version="4" %}

The global (site-wide) footer at the bottom of each web page contains up to 3 bands:
* contextual band
* main band
* sub-footer band

On **transactional** and **campaign** pages, the main band is optional.

## Reference implementation
### Expected output code - Footer with no main band
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}

## For GCWeb-Jekyll theme
By setting the `noFooterMain` variables to "true", the main band will be hidden on page load.

## Guidance
Consult the Canada.ca Design System for guidance on which footer elements to use based on the type of page you’re creating:
* [Global footer - Canada.ca Design System](https://design.canada.ca/common-design-patterns/site-footer.html)