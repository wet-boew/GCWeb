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
        /**
         * @method init
         * @param {jQuery Event} event Event that triggered the function call
         */
        init = function (event) {
            
            var testing = true;

            // Start initialization
            // returns DOM object = proceed with init
            // returns undefined = do not proceed with init (e.g., already initialized)
            var elm = wb.init(event, componentName, selector),
                $elm,
                settings;

            if (elm) {

                // At this point, the GCWeb menu is already completed
                $elm = $(elm);        
                
                // Check if there is already a gcweb menu (or if there are 2 present)
                /// If global gcmenu is present, hide the campaign menu and return, do not continue
                var gcWebMenus = document.querySelectorAll(".gcweb-menu");
                if (gcWebMenus.length > 1) {
                    console.warn(componentName + " - gcweb menu already exsits on the page, hiding gcweb campaign menu");
                    $elm.addClass('hidden');
                    return;
                }
                
                // Apply appropriate visible CSS classes to the GCWeb menu
                $elm.addClass( "visible-sm visible-xs" );
                
                // Use the GCWeb menu to create the megamenu for md and lg                
                // If a megamenu is already present, abort to avoid duplicate wb-sm IDs 
                var megamenuExists = document.querySelector("#wb-sm");
                if (megamenuExists != undefined || megamenuExists != null) {
                    console.warn(componentName + " can't start, megamenu already exsits on the page");
                    wb.ready($elm, componentName);
                    return;
                }

                // Megamenu does not exist, let's start to build it
                
                // Retrieve the top level list items from GCWeb men
                /// USE $elm that is already in scope
                /// TODO: Make the elm.queryselectorall work
                /// var gcwebMenuListItems = elm.querySelectorAll("> ul > li");                
                /// TEMP QUERY
                var gcwebMenuListItems = document.querySelectorAll(selector + " > ul > li");
                //console.log(gcwebMenuListItems);
            
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
                    if(listItemchildren.length > 0) {
                        // Use counter to generate dynamic href bookmarks and ids for submenus
                        subMenuCounter++;
                        
                        // Build list item with a submenu
                        let subMenuId = "menu-" + subMenuCounter;
                        
                        var submegamenuHTML = "";
                        // TODO: Verify all the attributes
                        megamenuHTML += '<li><a href="#' + subMenuId + '" class="item" tabindex="0" aria-posinset="' + listItemCounter + '" aria-setsize="' + gcwebMenuListItems.length + '" role="menuitem" aria-haspopup="true">' + listItemAnchor.textContent;
                        if (!testing) {
                            megamenuHTML += '<span class="expicon glyphicon glyphicon-chevron-down"></span>';
                        }
                        megamenuHTML += '</a>'; 
                            
                        $.each(listItemchildren, function (key, element) {
                            //console.log(key + ": " + element);
                            var listItemAnchor = element.querySelector("a");
                            var href = listItemAnchor.getAttribute('href');                           
                                
                            // TODO: Add missing attributes present in the 
                            submegamenuHTML += '<li><a href="' + href + '">' + listItemAnchor.textContent + '</a></li>';
                        });
                        
                        megamenuHTML += '<ul class="sm list-unstyled" id="' + subMenuId + '" role="menu">' + submegamenuHTML + '</ul></li>';
                    } 
                    else {
                        // Build list item without a submenu
                        let href = listItemAnchor.getAttribute('href');
                        megamenuHTML += '<li><a href="' + href + '">' + listItemAnchor.textContent + '</a></li>';
                    }                    
                });
                
                // Get GCWeb h2
                var gcwebMenuH2 = document.querySelector(selector + " > h2");
                
                // Wrap menu HTML with the megamenu wrapper
                // NOTE: Removed role="navigation" (redundant) and typeof="SiteNavigationElement" (not required)
                megamenuHTML = `
                <nav id="wb-sm" class="campaign-menu wb-menu visible-md visible-lg">
                    <div class="pnl-strt nvbar">
                        <h2>` + gcwebMenuH2.textContent + `</h2>
                        <ul role="menubar" class="list-inline menu">
                        ` + megamenuHTML + `
                        </ul>
                    </div>
                </nav>`;                
                //console.log(megamenuHTML);
                
                // Add the megamenu
                $elm.after( megamenuHTML );             

                // Identify that initialization has completed - Does this conflict with GCWeb initialization? All we did to GCWeb menu was add classes for xs and sm visible... This might not be required.
                wb.ready($elm, componentName);
                
                if(testing) {
                    // Start the megamenu plugin
                    
                    // HACKS - Add the div required to build the hamburger menu, but hide it, since all we're trying to do is fully initialize the megamenu
                    $( ".wb-menu" ).attr('data-trgt', 'mb-pnl');
                    $( ".wb-menu" ).after( '<div id="mb-pnl" hidden></div>');
                    $( ".wb-menu" ).after( '<div id="wb-glb-mn" hidden><h2> </h2></div>');

                    // Initialize it
                    $( ".wb-menu" ).trigger( "wb-init.wb-menu" );

                    $( "#mb-pnl" ).remove();
                    $( "#wb-glb-mn" ).remove();
                    $( ".wb-menu" ).removeAttr('data-trgt');
                }
            }
        };

    // Add your plugin event handler
    // No new plugin for now, comment out
    /*
    $document.on("ready", selector, function (event, data) {

        var elm = event.currentTarget,
            $elm = $(elm);

        $elm.append(" Hello World "); // Do we need this?

        if (data && data.domore) { // Do we need this?
            $elm.prepend("Do more");
        }
    });
*/
    // Bind the init event of the plugin
    $document.on("timerpoke.wb " + initEvent, selector, init);


    // Add the timer poke to initialize the plugin
    wb.add(selector);

})(jQuery, window, document, wb);
