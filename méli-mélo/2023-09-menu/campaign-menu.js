/**
 * @title Campaign menu
 * @author PCH
 */
(function ($, window, document, wb) {
    "use strict";

    /*
     * Variable and function definitions.
     * These are global to the plugin - meaning that they will be initialized once per page,
     * not once per instance of plugin on the page. So, this is a good place to define
     * variables that are common to all instances of the plugin on a page.
     */
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

                // At this point, the GCWeb menu is already initialized
                $elm = $(elm);

                // Add IDs for GC menu. This must be synchronized with the ids for the mega menu below.
                var gcSubmenus = $elm.find("ul ul");
                for (var i = 1; i < gcSubmenus.length + 1; i++) {
                    gcSubmenus.eq(i - 1).attr("id", 'sub-menu-' + i);
                }

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

                // Megamenu does not exist, let's build it for md and lg using the content in the GCWeb
                // Retrieve the top level list items from GCWeb men
                var gcwebMenuListItems = $elm.find("> ul > li");

                // Start building mega menu
                var megamenuHTML = "";
                var listItemCounter = 0;
                var subMenuCounter = 0;
                $.each(gcwebMenuListItems, function (key, element) {
                    // console.log(key + ": " + element);
                    listItemCounter++;

                    // Get top level list item's anchor
                    var listItemAnchor = element.querySelector("a");
                    listItemAnchor.setAttribute('class', 'item');
                    //console.log("anchor: ",  listItemAnchor);

                    // Get top level list item's children
                    var listItemchildren = element.querySelectorAll("li");
                    //console.log("children: ",  listItemchildren);
                    //console.log("children length: " + gcwebMenuListItems.length);                  

                    // Build top level list items, with and without submenus                    
                    if (listItemchildren.length > 0) {
                        // Use counter to generate dynamic href bookmarks and ids for submenus
                        subMenuCounter++;

                        // Build list item with a submenu
                        let subMenuId = "menu-" + subMenuCounter;

                        var submegamenuHTML = "";
                        // TODO: Verify all the attributes
                        megamenuHTML += `
                        <li><a href="#${subMenuId}" class="item" tabindex="0" aria-posinset="${listItemCounter}" aria-setsize="${gcwebMenuListItems.length}" role="menuitem" aria-haspopup="true">${listItemAnchor.textContent}</a>`;

                        $.each(listItemchildren, function (key, element) {
                            //console.log(key + ": " + element);
                            var subListItemAnchor = element.querySelector("a");
                            var href = subListItemAnchor.getAttribute('href');

                            // TODO: Add missing attributes present in the 
                            submegamenuHTML += `<li><a href="${href}">${subListItemAnchor.textContent}</a></li>`;
                        });

                        megamenuHTML += `<ul class="sm list-unstyled" id="${subMenuId}" role="menu">${submegamenuHTML}</ul></li>`;
                    } else {
                        // Build list item without a submenu
                        let href = listItemAnchor.getAttribute('href');
                        megamenuHTML += `<li><a href="${href}">${listItemAnchor.textContent}</a></li>`;
                    }
                });

                // Get GCWeb h2
                var gcwebMenuH2 = document.querySelector(selector + " > h2");

                // Wrap menu HTML with the megamenu wrapper
                // NOTE: Removed role="navigation" (redundant) and typeof="SiteNavigationElement" (not required)
                megamenuHTML = `
                <nav id="wb-sm" class="campaign-menu wb-menu visible-md visible-lg">
                    <div class="pnl-strt nvbar">
                        <h2>${gcwebMenuH2.textContent}</h2>
                        <ul role="menubar" class="list-inline menu">
                            ${megamenuHTML}
                        </ul>
                    </div>
                </nav>`;
                //console.log(megamenuHTML);                          

                // Apply appropriate visible CSS classes to the GCWeb menu
                $elm.addClass("visible-sm visible-xs");

                // Add the megamenu
                $elm.after(megamenuHTML);

                // Start the megamenu plugin
                // Workaround - Add the div required to build the hamburger menu, but hide it, since all we're trying to do is fully initialize the megamenu
                $(".wb-menu").attr('data-trgt', 'mb-pnl');
                $(".wb-menu").after('<div id="mb-pnl" hidden></div>');
                $(".wb-menu").after('<div id="wb-glb-mn" hidden><h2> </h2></div>');

                // Initialize it
                $(".wb-menu").trigger("wb-init.wb-menu");

                $("#mb-pnl").remove();
                $("#wb-glb-mn").remove();
                $(".wb-menu").removeAttr('data-trgt');

                wb.ready($elm, componentName);
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
        },

        openMenu = function () {
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
                            let submenuId = savedFocusHref.substring(6);
                            $(".gcweb-menu a[aria-controls='sub-menu-" + submenuId + "']").focus();
                        } else {
                            let gcMenuFocusAnchor = $('.gcweb-menu a[href="' + savedFocusHref + '"]');
                            let ulParents = $(gcMenuFocusAnchor).parents("ul");
                            if (ulParents.length > 1) {
                                let submenu = ulParents.eq(0);
                                submenu.parent()
                                    .children('a.item')
                                    .attr("aria-expanded", "true");
                            }
                            gcMenuFocusAnchor.focus();
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
                            let submenuId = gcSubmenuFocus.substring(9);
                            $(".wb-menu a[href='#menu-" + submenuId + "']").focus();
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
                            megaMenuFocusAnchor.focus();
                        }
                    }
                }
            }
        };

    $(window).on("resize", function () {
        //console.log(document.activeElement);
        if (document.activeElement.nodeName == 'A') {
            savedAnchorFocus = document.activeElement;
        }
    });

    $document.on(wb.resizeEvents, openMenu);

    // Bind the init event of the plugin
    $document.on("timerpoke.wb " + initEvent, selector, init);

    // Add the timer poke to initialize the plugin
    wb.add(selector);

})(jQuery, window, document, wb);
