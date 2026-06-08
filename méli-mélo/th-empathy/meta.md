---
feature: thématique
lang: en
title: Empathy theme
description: Background colours used for empathy.
componentName: th-empathy
expiry: November 30, 2026
mainPage: empathy.html
cssClass:
- empathy
- btn-empathy
- text-empathy
jsFunctions:
- init - on detection of .provisional.gc-empathy
a11yStatement: >
  These colours meet the colour contrast requirements as outlined in WCAG 2.1 AA Success Criterion 1.4.3: Contrast (Minimum). After validation using WebAIM online contrast checker, I can certified that the color matches used in this thematic are meeting a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text and also a contrast ratio of at least 3:1 for graphics and user interface components. I did my due diligence and to knowledge and from my understanding, all elements of this thematic are meeting WCAG 2.1 AA standards.
  Tested by Eric Guitard, eric.guitard@servicecanada.gc.ca. 2024-04-30.
peNote:
- The <code>btn-empathy</code> class must be accompanied with a fall back button class such as <code>btn-default</code> or <code>btn-primary</code>.
pages:
  examples:
    - title: Empathy theme
      language: en
      path: empathy.html
    - title: Death layout
      language: en
      path: death.html
    - title: Checklist layout
      language: en
      path: checklist.html
sponsor: Francis Snoddy on behalf of ESDC - Portfolio Web

changes:
  - date: 2025-11-04
    description: The thematic has been renewed for another year therefore, the expiry date has been updated to Nov 30, 2026.   
    publicImpact: No impact only minor content change.
  - date: 2025-10-22
    description: Removal of the custom purple color for the bar underneath the main title H1 of the thematic. The coporate red color will now be applied on page load. This is to aligned with TBS/DTO recommendations and directives.   
    publicImpact: No impact since that the only site "What to do when someone dies" make use of this thematic is already using the red underline. 
  - date: 2024-12-02
    description: Life Journey home page layout, includes the code and an example to enable the home page layout to be used by current and future Life Journey projects
    departmentImpact: Having this layout integrated will allow Canada.ca to have a more streamlined and consistent theme throughout the Journey Labs projects. Currently the pages that make use of this layout have it hardcoded into the page
    publicImpact: The Public at Large, the layout makes it easy for users to know that they are currently on a Journey Labs project page

output: false
---
