---
feature: thématique
lang: en
title: Canada Strong theme
description: Styles used for the Canada Strong campaign
componentName: th-canada-strong
expiry: November 30, 2027
mainPage: canada-strong.html
cssClass:
- canada-strong
- "hero (scope: canada-strong)"
- "title-bar (scope: canada-strong)"
- "card-audience (scope: canada-strong)"
- "card-support (scope: canada-strong)"
- "end-page-promo (scope: canada-strong)"
- "support-banner (scope: canada-strong)"
peNote:
- The <code>end-page-promo</code> class is placed in a full-width section using the <code>bg-light</code> and <code>py-3</code> classes for the grey band.
- The <code>card-support</code> class must be accompanied with the <code>panel</code> and <code>panel-default</code> classes.
- The <code>support-banner</code> class must be accompanied with the <code>panel</code> class.
- The hero background image is decorative. Use <code>data-bgimg-srcset</code> with the <code>no-image</code> value at <code>1199w</code> to remove it on screens narrower than 1200 pixels.
pages:
  examples:
    - title: Canada Strong theme
      language: en
      path: canada-strong.html
    - title: Thématique Un Canada fort
      language: fr
      path: canada-fort.html
    - title: Landing page layout
      language: en
      path: landing-page-en.html
    - title: Gabarit de page d'accueil
      language: fr
      path: landing-page-fr.html
    - title: Support page layout
      language: en
      path: support-en.html
    - title: Gabarit de page de soutien
      language: fr
      path: support-fr.html
sponsor: Principal Publisher on behalf of the Privy Council Office

changes:
  - date: 2026-09-22
    description: Initial version of the Canada Strong thematic based on the recently launch campaign that were customized in-place. This normalize the CSS required for the Canada strong thematic.
    departmentImpact: Canada Strong pages no longer need to embed custom CSS in AEM. The styles are maintained in GCWeb and applied through CSS classes. This will help to maintain campaign style consistency across multiple departments.
    publicImpact: No visual impact. The pages look the same as before.

output: false
---
