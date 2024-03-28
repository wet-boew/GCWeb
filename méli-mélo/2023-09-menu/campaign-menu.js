/**
 * @title Campaign menu
 * @author PCH
 */
(function ($, window, document, wb) {
    "use strict";

    var componentName = "campaign-menu",
        selector = "." + componentName + ".gcweb-menu",
        initEvent = "wb-init" + selector,
        $document = wb.doc,
        savedAnchorFocus,
        /**
         * @method init
         * @param {jQuery Event} event Event that triggered the function call
         */
        init = function (event) {
            // Start initialization
            // returns DOM object = proceed with init
            // returns undefined = do not proceed with init (e.g., already initialized)
            var elm = wb.init(event, componentName, selector),
                $elm;

            if (elm) {
                $elm = $(elm);

                // Check if there is already a gcweb menu. 
                // If there are 2 present, the global GCWeb menu is present, hide this custom menu
                var gcWebMenus = document.querySelectorAll(".gcweb-menu");
                if (gcWebMenus.length > 1) {
                    console.warn(componentName + " - gcweb menu already exsits on the page, hiding gcweb campaign menu and aborting");
                    $elm.addClass('hidden');
                    wb.ready($elm, componentName);
                    return;
                }

                // If a megamenu is already present, abort to avoid duplicate wb-sm IDs 
                var megamenuExists = document.querySelector("#wb-sm");
                if (megamenuExists != undefined || megamenuExists != null) {
                    console.warn(componentName + " - megamenu already exsits on the page, aborting");
                    $elm.addClass('hidden');
                    wb.ready($elm, componentName);
                    return;
                }

                // Build megamenu once WET is fully initialized, to ensure the GCWeb menu ajax append is complete
                $(document).on("wb-ready.wb", buildMegaMenu($elm));

                wb.ready($elm, componentName);
            }
        },

        buildMegaMenu = function ($elm) {
            return function (e) {
                // Retrieve the top level list items from GCWeb men
                var gcwebMenuListItems = $elm.find("> ul > li");

                // Start building mega menu
                var megamenuHTML = "";
                $.each(gcwebMenuListItems, function (key, element) {
                    // Get top level list item's anchor
                    var anchor = element.querySelector("a");
                    // Build list item without a submenu
                    let href = anchor.getAttribute('href');
                    let linkText = anchor.textContent;
                    megamenuHTML += `<li><a href="${href}">${linkText}</a></li>`;
                });

                // Get GCWeb h2
                var gcwebMenuH2 = document.querySelector(selector + " > h2");

                var megamenuAjaxReplace = $elm[0].getAttribute('data-megamenu-ajax');

                // Wrap menu HTML with the megamenu wrapper
                // NOTE: Removed role="navigation" (redundant) and typeof="SiteNavigationElement" (not required)
                megamenuHTML = `
                <nav id="wb-sm" class="campaign-menu wb-menu visible-md visible-lg" data-trgt="mb-pnl" data-ajax-replace="${megamenuAjaxReplace}">
                    <div class="pnl-strt nvbar">
                        <h2>${gcwebMenuH2.textContent}</h2>
                        <ul role="menubar" class="list-inline menu">
                            ${megamenuHTML}
                        </ul>
                    </div>
                </nav>`;

                // Apply appropriate visible CSS classes to the GCWeb menu
                $elm.addClass("visible-sm visible-xs");

                // Workaround - Add the div required to build the hamburger menu, but hide it, since all we're trying to do is fully initialize the megamenu
                $(".gcweb-menu").after('<div id="mb-pnl" hidden></div>');
                $(".gcweb-menu").after('<div id="wb-glb-mn" hidden><h2> </h2></div>');

                // Add the megamenu
                $elm.after(megamenuHTML);

                // Initialize it
                $(".wb-menu").trigger("wb-init.wb-menu");

                $(document).on("wb-ready.wb-menu", cleanUp);
            }
        },

        cleanUp = function () {
            $("#mb-pnl").remove();
            $("#wb-glb-mn").remove();
        },

        switchMenu = function () {
            // Show/hide the appropriate menu when the viewport changes between xs/sm and md/lg
            // and transfer the active element/active link (if it's within the menu) to the visible menu
            if (savedAnchorFocus != undefined) {
                let nav = findNavElement(savedAnchorFocus);

                if (nav) {
                    let savedFocusHref = savedAnchorFocus.getAttribute("href");
                    if (nav.classList.contains('wb-menu') && $(".wb-menu").is(":hidden")) {

                        // Close any previously opened GCWeb submenus
                        let itemOpened = $('.gcweb-menu a[aria-expanded=true]');
                        for (var i = 0; i < itemOpened.length; i++) {
                            $(itemOpened).eq(i).attr("aria-expanded", "false");
                        }

                        // Open GCWeb menu button
                        $(selector).find('button').attr("aria-expanded", "true");

                        // Determine if the focus is on a link or an anchor to open a submenu
                        if (savedFocusHref.match("^#")) {
                            let submenuId = savedFocusHref.substring(14);
                            let equivalentElement = $(".gcweb-menu a[aria-controls='gc-sub-menu-" + submenuId + "']");
                            if (equivalentElement != undefined) {
                                equivalentElement.focus();
                                if (equivalentElement[0].hasAttribute('aria-haspopup') && equivalentElement[0].getAttribute('aria-haspopup') == "true") {
                                    equivalentElement.attr("aria-expanded", "true");
                                }
                            } else {
                                console.warn("Unable to find equivalent link in GCWeb menu top level items");
                            }
                        } else {
                            let gcMenuFocusAnchor = $('.gcweb-menu a[href="' + savedFocusHref + '"]');
                            let ulParents = $(gcMenuFocusAnchor).parents("ul");
                            if (ulParents.length > 1) {
                                let submenu = ulParents.eq(0);
                                submenu.parent()
                                    .children('a')
                                    .attr("aria-expanded", "true");
                            }
                            if (gcMenuFocusAnchor != undefined) {
                                gcMenuFocusAnchor.focus();
                            } else {
                                console.warn("Unable to find equivalent link in GCWeb menu submenu items");
                            }
                        }
                    } else if (nav.classList.contains('gcweb-menu') && $(".gcweb-menu").is(":hidden")) {
                        // Close submenus
                        $(".wb-menu li").removeClass('active sm-open');
                        $(".wb-menu ul.open").attr("aria-expanded", "false");
                        $(".wb-menu ul.open").attr("aria-hidden", "true");
                        $(".wb-menu ul").removeClass('open');

                        // Set focus on submenu
                        if (savedFocusHref.match("^#")) {
                            let gcSubmenuFocus = $(savedAnchorFocus).attr("aria-controls");
                            let submenuId = gcSubmenuFocus.substring(12);
                            let equivalentElement = $(".wb-menu a[href='#wet-sub-menu-" + submenuId + "']");
                            if (equivalentElement != undefined) {
                                equivalentElement.focus();
                            } else {
                                console.warn("Unable to find equivalent link in WET megamenu top level items");
                            }
                        } else {
                            // Find if it is focused a submenu item
                            let megaMenuFocusAnchor = $('.wb-menu a[href="' + savedFocusHref + '"]');
                            let ulParents = $(megaMenuFocusAnchor).parents("ul");

                            // Open submenu
                            if (ulParents.length > 1) {
                                let submenu = ulParents.eq(0);
                                submenu.attr("aria-expanded", "true");
                                submenu.attr("aria-hidden", "false");
                                submenu.addClass('open');
                                submenu.parent().addClass('active sm-open');
                            }
                            if (megaMenuFocusAnchor != undefined) {
                                megaMenuFocusAnchor.focus();
                            } else {
                                console.warn("Unable to find equivalent link in WET megamenu submenu items");
                            }
                        }
                    }
                }
            }
        },

        findNavElement = function (activeElement) {
            let parentElement = activeElement.parentElement;
            while (parentElement.nodeName != "NAV" && parentElement.nodeName != "BODY") {
                parentElement = parentElement.parentElement;
            }
            if (parentElement.nodeName == "NAV") {
                return parentElement;
            } else {
                return false;
            }
        };

    $(window).on("resize", function () {
        if (document.activeElement.nodeName == 'A') {
            savedAnchorFocus = document.activeElement;
        }
    });

    $document.on(wb.resizeEvents, switchMenu);

    // Bind the init event of the plugin
    $document.on("timerpoke.wb " + initEvent, selector, init);

    // Add the timer poke to initialize the plugin
    wb.add(selector);

})(jQuery, window, document, wb);
