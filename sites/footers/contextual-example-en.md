---
altLangPage: contextual-example-fr.html
breadcrumbs:
  - title: Footer
    link: sites/footers/footers-en.html
contextualFooter:
  title: "[Contextual footer header]"
  links:
    - url: mailto:info@example.com
      text: Mail to email
    - url: ?abc=123#ancre
      text: Query string and anchor
    - url: ../../
      text: Up two folders
    - url: tel:555-0123
      text: Telephone number 555-0123
dateModified": 2023-03-28
includes:
  footer: edge
language: en
share: true
title: Contextual band and link variations
titleH1: Display contextual band and Contextual band and link variations
---
<div class="wb-prettify all-pre hide"></div>

The global (site-wide) footer at the bottom of each web page contains up to 3 bands:
* Contextual band
* Main band
* Sub-footer band

## Reference implementation
<figure>
  <figcaption class="h3">Expected output code - Contextual band and link variations</figcaption>
{%- include variable-core.liquid -%}
{% highlight html %}
	{%- include footers/footer.html -%}
{% endhighlight %}
</figure>

## Guidance
Consult the Canada.ca Design System for guidance on which footer elements to use based on the type of page you’re creating:
* [Global footer - Canada.ca Design System](https://design.canada.ca/common-design-patterns/site-footer.html)
