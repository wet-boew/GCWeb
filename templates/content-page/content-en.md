---
title: "Content page"
language: en
category: templates
altLangPrefix: content
altLangPage: content-fr.html
secondlevel: false
dateModified: 2017-09-29
share: true
---
{% include byline/byline.html %}
{% include web-contents/placeholdercontent-en.html %}
<h2 id="cnt-wdth-lmtd">Section with limited width content</h2>
<p>Add the CSS class name <code>.cnt-wdth-lmtd</code> to a sectioning element <code>&lt;section class="cnt-wdth-lmtd"&gt;...&lt;section&gt;</code> inside the main content of your page. More guidance are provided in the Content and IA specification.</p>
<section class="cnt-wdth-lmtd">
  <h3>Section example with limited width content</h3>
  <p>Different example text. Different example text. Different example text. Different example text. Different example text. Different example text. Different example text. Different example text. This is a very long word pneumonoultramicroscopicsilicovolcanoconiosis.</p>
</section>
<h2 id="call-to-action">Call to action button</h2>
<p>Add the CSS class name <code>.btn-call-to-action</code> to a your button or link that define the main call for action for a page. For example the initiation button/link in a service initiation pages. More guidance are provided in the Content and IA specification.</p>
<div class="row">
  <div class="col-sm-6">
    <h3>Link</h3>
    <p class="mrgn-bttm-0"><a class="btn btn-call-to-action" href="#">[Call to action]</a></p>
    <pre><code>&lt;p&gt;&lt;a class="btn <strong>btn-call-to-action</strong>" href="#"&gt;[Call to action]&lt;/a&gt;&lt;/p&gt;</code></pre>
  </div>
  <div class="col-sm-6">
    <h3>Button</h3>
    <button class="btn btn-call-to-action" type="button">[Call to action]</button>
    <pre><code>&lt;button class="btn <strong>btn-call-to-action</strong>" type="button"&gt;[Call to action]&lt;/button&gt;</code></pre>
  </div>
</div>
