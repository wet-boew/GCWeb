---
feature: thématique
lang: en
title: Canada Strong theme
description: Styles used for the Canada Strong campaign
componentName: th-canada-strong
expiry: November 30, 2027
mainPage: canada-strong.html
cssClass:
- canada-strong-page
- canada-strong-hero
- "canada-strong-hero__overlay (scope: canada-strong-hero)"
- "canada-strong-hero__row (scope: canada-strong-hero)"
- "canada-strong-hero__copy (scope: canada-strong-hero)"
- canada-strong-section-header
- canada-strong-audience-card
- canada-strong-support-section
- canada-strong-support-grid
- canada-strong-support-card
- "canada-strong-support-card__icon (scope: canada-strong-support-card)"
- canada-strong-closing-band
- canada-strong-closing-panel
- "canada-strong-closing-panel__icon (scope: canada-strong-closing-panel)"
- canada-strong-banner
peNote:
- The <code>canada-strong-audience-card</code> and <code>canada-strong-closing-panel</code> classes should be accompanied with the <code>well</code> class so the content keeps a visual grouping if the thematic is not loaded.
- The <code>canada-strong-support-card</code> class must be accompanied with the <code>panel</code> and <code>panel-default</code> classes.
- The hero background image is decorative. Use <code>data-bgimg-srcset</code> with the <code>no-image</code> value at <code>991w</code> to remove it on medium and small screens.
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
    description: Initial version of the Canada Strong thematic. Standardizes the custom CSS that was embedded through a media player on the Canada Strong campaign pages.
    departmentImpact: Canada Strong pages no longer need to embed custom CSS in AEM. The styles are maintained in GCWeb and applied through CSS classes.
    publicImpact: No visual impact. The pages look the same as before.

output: false
---
