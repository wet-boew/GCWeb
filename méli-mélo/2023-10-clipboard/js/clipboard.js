/**
 * @title WET-BOEW Clipboard plugin
 * @overview Plugin contained to show an example of how to create your custom WET plugin
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author Andrew de Peiza
 */
( function( $, window, wb ) {
    "use strict";
    /*
     * Variable and function definitions.
     * These are global to the plugin - meaning that they will be initialized once per page,
     * not once per instance of plugin on the page. So, this is a good place to define
     * variables that are common to all instances of the plugin on a page.
     */
    var componentName = "wb-clipboard",
        selector = "." + componentName,
        initEvent = "wb-init" + selector,
        configData = componentName + "-config",
        $document = wb.doc,
        contentShell = componentName + "-shell",
        btnClass = componentName + "-btn",
        copiedSectionStyle = "copied",
        copyAreaClass = "copyarea",
        copyAreaClassComponent = copyAreaClass + " " + componentName + "-init",
        copyAreaInlineClass = copyAreaClass + "-inline",
        copyTextClass = componentName + "-text",
        inlineElmClass = " mrgn-lft-md",
        inlineBtnClass = "btn-xs wb-clipboard-btn-inline",
        defaultBtnClass = "btn",
        buttonStatus = false,
        focusReset = true,
        defaults = {
            i18n:
            {
                "en": {
                    clipStart: "Start of clipboard text",
                    clipEnd: "End of clipboard text",
                    copiedStart: "Start of copied text",
                    copiedEnd: "End of copied text",
                    copyBtnTxt: "Copy",
                    copyCompleteBtnTxt: "Copied"
                },
                "fr": {
                    clipStart: "D&eacute;but du texte du presse-papiers",
                    clipEnd: "Fin du texte du presse-papiers",
                    copiedStart: "D&eacute;but du texte copi&eacute;",
                    copiedEnd: "Fin du texte copi&eacute;",
                    copyBtnTxt: "Copier",
                    copyCompleteBtnTxt: "Copi&eacute;"
                }
            },
            btnAlign: "none",
            copyBtnStyle: "mrgn-tp-sm btn-default " + btnClass,
            copiedBtnStyle: "mrgn-tp-sm " + btnClass + " btn-success"
        },
        /**
         * @method init
         * @param {jQuery Event} event Event that triggered the function call
         */
        init = function( event ) {
            // Start initialization
            // returns DOM object = proceed with init
            // returns undefined = do not proceed with init (e.g., already initialized)
            var elm = wb.init( event, componentName, selector ),
                $elm, elmId,
                settings,
                wbDataElm,
                config;

            if ( elm ) {
                $elm = $( elm );
                elmId = elm.id;

                // Set default i18n information
                if ( defaults.i18n[ wb.lang ] ) {
                    defaults.i18n = defaults.i18n[ wb.lang ];
                }

                // Extend this data with the contextual default
                wbDataElm = wb.getData( $elm, componentName );
                if ( wbDataElm && wbDataElm.i18n ) {
                    wbDataElm.i18n = $.extend( {}, defaults.i18n, wbDataElm.i18n );
                }
                config = $.extend( {}, defaults, wbDataElm );

                if ( config.defaultIfNone && !$.isArray( config.defaultIfNone ) ) {
                    config.defaultIfNone = [ config.defaultIfNone ];
                }
                // Get the plugin JSON configuration set on attribute data-wb-clipboard
                settings = $.extend(
                    true,
                    {},
                    defaults,
                    window[ componentName ],
                    wb.getData( $elm, componentName )
                );

                // Set the data to the component, if other event need to have access to it.
                $elm.data( configData, config );

                $( "." + btnClass ).each( function() {
                    var btnData = wb.getData( $( this ), "wb-clipboard" );
                    if ( typeof( btnData.copyAreaId ) !== "undefined" && btnData.copyAreaId === elmId ) {
                        initCopyBtn( this, wb.getData( $( "#" + btnData.copyAreaId ), "wb-clipboard" ) );
                    } else if ( typeof( btnData.resetBtn ) !== "undefined" && btnData.resetBtn === true ) {
                        $( this ).trigger( "click vclick touchstart" );
                    }
                    if ( typeof( btnData.resetFocusOut ) !== "undefined" && btnData.resetFocusOut === true ) {
                        focusReset = true;
                    }
                } );

                // ... Do the plugin initialisation
                // Call my custom event
                $elm.trigger( "wb-clipboard", settings );
                // Identify that initialization has completed
                wb.ready( $elm, componentName );
            }
        },
        // Check if an element is displayed inline or not.
        getDisplayType = function( elm ) {
            var compStyle = elm.currentStyle || window.getComputedStyle( elm, "" );
            if ( compStyle.display.substr( 0, 6 ).toLowerCase() === "inline" ) {
                return true;
            }
            return false;
        },
        // Initializes the copy button
        initCopyBtn = function( btnElm, data ) {
            btnElm.copyBtn = btnElm.innerHTML;
            btnElm.copyBtnStyle = btnElm.getAttribute( "class" );
            if ( btnElm.parentNode.tagName === "SPAN" ) {
                btnElm.copyBtnSize = inlineBtnClass;
            } else {
                btnElm.copyBtnSize = defaultBtnClass;
            }
            if ( data.copiedBtnStyle ) {
                btnElm.copyCompleteBtnStyle = data.copiedBtnStyle;
            }
            if ( data.copiedBtn ) {
                btnElm.copyCompleteBtn = data.copiedBtn;
            }
            $( btnElm ).trigger( "click vclick touchstart" );
        },
        // This function checks if an element is a textarea or an input element of type text
        checkTextInputElm = function ( elm ) {
            const validInputType = ["text", "search", "url", "tel", "password"];
            if ( elm.tagName === "TEXTAREA" || ( elm.tagName === "INPUT" && validInputType.includes( elm.type ) === true ) ) {
                return true;
            }
            return false;
        },
        // This function checks if the selected content matches all the content in the copy area
        checkContentChange = function( copyAreaElm ) {
            var copyAreaText,
                selectionRange = window.getSelection(),
                selectionStr = selectionRange.toString(),
                copySegmentElm = document.getElementById( copyAreaElm.copySegmentId );

            if ( checkTextInputElm( copySegmentElm ) === true ) {
                copyAreaText = copySegmentElm.value;
            } else {
                copyAreaText = copySegmentElm.textContent;
            }
            if ( copyAreaText.trim() === selectionStr.trim() ) {
                return true;
            }
            return false;
        },
        // This function updates the class for all the copy areas
        updateCopyAreas = function( copyAreaElm ) {
            $( ".wb-clipboard" ).each( function() {
                if ( typeof( copyAreaElm ) !== "undefined" && copyAreaElm === this ) {
                    if ( copyAreaElm.addcopiedSectionStyle === true ) {
                        $( copyAreaElm ).addClass( copiedSectionStyle );
                    }
                } else {
                    $( this ).removeClass( copiedSectionStyle );
                }
            } );
        },
        // This function updates the content of a tag
        updateTag = function( clipElm, clipTxt ) {
            if ( clipElm.innerHTML !== clipTxt ) {
                clipElm.innerHTML = clipTxt;
            }
        },
        // This function updates the hidden text surronding and identifying the copyable area
        updateClipText = function( copyAreaElm ) {
            $( "." + contentShell ).each( function() {
                if ( typeof( copyAreaElm ) !== "undefined" && copyAreaElm.id === this.copyAreaId ) {
                    updateTag( this, this.copiedTxt );
                } else {
                    updateTag( this, this.clipTxt );
                }
            } );
        },
        // This function resets the copy button
        resetCopyBtn = function( elm, btnData, btnElm ) {
            if ( "resetBtn" in btnData === false || ( "resetBtn" in btnData === false && typeof( btnElm ) !== "undefined" && btnElm !== elm ) ) {
                $( elm ).removeAttr( "class" );
                $( elm ).addClass( elm.copyBtnStyle );
                $( elm ).html( elm.copyBtn );
                $( elm ).parent().attr( "aria-live", "off" );
            }
        },
        // This function updates the copy button
        updateCopyBtns = function( copyAreaElm ) {
            // This function updates the copy button when copying is a success
            var copyBtnSuccess = function( btnElm ) {
                $( btnElm ).parent().attr( "aria-live", "polite" );
                if ( btnElm.copyCompleteBtn ) {
                    $( btnElm ).html( btnElm.copyCompleteBtn );
                } else {
                    $( btnElm ).html( "<span class='glyphicon glyphicon-ok mrgn-rght-sm'></span>" + wb.escapeAttribute( defaults.i18n.copyCompleteBtnTxt ) );
                }
                $( btnElm ).removeAttr( "class" );
                $( btnElm ).addClass( btnElm.copyBtnSize );
                if ( btnElm.copyCompleteBtnStyle ) {
                    $( btnElm ).addClass( btnElm.copyCompleteBtnStyle );
                } else {
                    $( btnElm ).addClass( defaults.copiedBtnStyle );
                }
            };
            // Loop through all the copy buttons on the page and if copied then updates the copy button, if not then resets the copy button
            $( "." + btnClass ).each( function() {
                var btnData = wb.getData( $( this ), "wb-clipboard" );
                if ( typeof( copyAreaElm ) !== "undefined" && copyAreaElm.id === btnData.copyAreaId ) {
                    copyBtnSuccess( this );
                } else {
                    resetCopyBtn( this, btnData );
                }
            } );
        },
        // This function updates all the copy buttons and areas
        updateAll = function( copyAreaElm ) {
            updateCopyAreas( copyAreaElm );
            updateClipText( copyAreaElm );
            updateCopyBtns( copyAreaElm );
        },
        // This function updates a specific element's content
        updateElmCopy = function( copyAreaElm ) {
            if ( $( copyAreaElm ).hasClass( "wb-clipboard" ) === true && ( checkContentChange( copyAreaElm ) === true || buttonStatus === true ) ) {
                updateAll( copyAreaElm );
                buttonStatus = false;
            }
        },
        // This function checks for clipboard write permission for the async clipboard API
        clipboardPermission = function () {
            return navigator.permissions.query( {name: "clipboard-write"} ).then( function( result ) {
                if ( result.state == "granted" || result.state == "prompt" ) {
                    return true;
                }
                return false;
            } );
        },
        // This function selects the content of an area. If the element is an input or textarea, it selects the field contents. Otherwise, it selects the entire copy area.
        selectCopyArea = function( copySegmentElm ) {
            copySegmentElm.focus();
            if ( checkTextInputElm( copySegmentElm ) === true ) {
                copySegmentElm.select();
            } else {
                window.getSelection().selectAllChildren( copySegmentElm );
            }
        },
        // This function copies the content of an HTML element to the clipboard using execCommand and falls back to the async clipboard API for copying if that is unsuccessful.
        copyToClipboard = async function( copyAreaId ) {
            var copyAreaElm = document.getElementById( copyAreaId ),
                clipCopy = async function( copyAreaElm ) {
                    var clipItem, htmlBlob,
                        copySegmentElm = document.getElementById( copyAreaElm.copySegmentId );
                    selectCopyArea( copySegmentElm );
                    buttonStatus = true;
                    if ( document.execCommand( "Copy" ) ) {
                        return true;
                    } else if ( await clipboardPermission() === true ) {
                        htmlBlob = new Blob( [copySegmentElm.innerHTML], {type: "text/html"} );
                        try {
                            clipItem = new ClipboardItem( {[htmlBlob.type]: htmlBlob} );
                            navigator.clipboard.write( [clipItem] );
                            return true;
                        } catch ( e ) {
                            return false;
                        }
                    }
                    return false;
                };
            if ( await clipCopy( copyAreaElm ) === true ) {
                window.getSelection();
                return true;
            }
        };

    // Initalizes and styles the copy area and copy button or reset button
    $document.on( "wb-clipboard", selector, function( event, data ) {
        var elm = event.currentTarget,
            $elm = $( elm ),
            i18n = $elm.data( configData ).i18n,
            clipStartId = wb.getId(),
            clipStartTxt = i18n.clipStart,
            copiedStartTxt = i18n.copiedStart,
            copySegmentId = wb.getId(),
            clipEndId = wb.getId(),
            clipEndTxt = i18n.clipEnd,
            copiedEndTxt = i18n.copiedEnd,
            containTag = "div",
            inlineElmCls = "",
            inlineBtn = "",
            copyBtnSize = defaultBtnClass,
            buttonId, copyBtn, btnStr, btnAlign;
        if ( !elm.hasAttribute( "id" ) ) {
            elm.id = wb.getId();
        }
        if ( "resetFocusOut" in data === true && data.resetFocusOut === true ) {
            focusReset = true;
        }
        if ( elm.tagName !== "PRE" && ( "border" in data === false || data.border === true ) ) {
            if ( getDisplayType( elm ) === true ) {
                $elm.addClass( copyAreaInlineClass );
            } else {
                $elm.addClass( copyAreaClassComponent );
            }
            elm.addcopiedSectionStyle = true;
        } else {
            elm.addcopiedSectionStyle = false;
        }
        if ( checkTextInputElm( elm ) === true ) {
            elm.copySegmentId = elm.id;
        } else {
            $elm.wrapInner( "<span id=\"" + copySegmentId + "\"></span>" );
            elm.copySegmentId = copySegmentId;
            if ( "noTextStyle" in data === false || data.noTextStyle === false ) {
                $( "#" + copySegmentId ).addClass( copyTextClass );
            }
            if ( data.clipStartText ) {
                clipStartTxt = data.clipStartText;
            }
            if ( data.copiedStartText ) {
                copiedStartTxt = data.copiedStartText;
            }
            // Add a hidden span at the beginning of the copy area
            $elm.prepend( "<span id=\"" + clipStartId + "\" class=\"wb-inv " + contentShell + "\">" + wb.escapeAttribute( clipStartTxt ) + "</span>" );
            document.getElementById( clipStartId ).copyAreaId = elm.id;
            document.getElementById( clipStartId ).clipTxt = wb.escapeAttribute( clipEndTxt );
            document.getElementById( clipStartId ).copiedTxt = wb.escapeAttribute( copiedStartTxt );
            if ( data.clipEndText ) {
                clipEndTxt = data.clipEndText;
            }
            if ( data.copiedEndText ) {
                copiedEndTxt = data.copiedEndText;
            }
            // Add a hidden span at the end of the copy area
            $elm.append( "<span id=\"" + clipEndId + "\" class=\"wb-inv " + contentShell + "\">" + wb.escapeAttribute( clipEndTxt ) + "</span>" );
            document.getElementById( clipEndId ).copyAreaId = elm.id;
            document.getElementById( clipEndId ).clipTxt = wb.escapeAttribute( clipEndTxt );
            document.getElementById( clipEndId ).copiedTxt = wb.escapeAttribute( copiedEndTxt );
        }
        if ( "noButton" in data === false ) {
            buttonId = wb.getId();
            switch ( data.btnAlign ) {
				case "left":
					btnAlign = "text-left ";
					break;
				case "right":
					btnAlign = "text-right ";
					break;
				case "center":
					btnAlign = "text-center ";
					break;
				case "none":
				default:
					btnAlign = "";
            }
            if ( getDisplayType( elm ) === true ) {
                containTag = "span";
                inlineElmCls = inlineElmClass;
                copyBtnSize = inlineBtnClass;
                inlineBtn = " class=\"" + inlineBtnClass + "\"";
            }
            // Create the copy button
            btnStr = "<" + containTag + " class=\"" + btnAlign + inlineElmCls + "\"/><button" + inlineBtn + " type=\"button\" aria-live=\"polite\" id=\"" + buttonId + "\" data-wb-clipboard='{\"copyAreaId\": \"" + elm.id + "\"}'></button></" + containTag + ">";
            if ( checkTextInputElm( elm ) === true ) {
                $elm.after( btnStr );
            } else {
                $elm.append( btnStr );
            }
            $( "#" + buttonId ).addClass( data.copyBtnStyle + " " + copyBtnSize );
            if ( data.copyBtn ) {
                copyBtn = data.copyBtn;
            } else {
                copyBtn = "<span class='glyphicon glyphicon-copy mrgn-rght-sm'></span>" + wb.escapeAttribute( i18n.copyBtnTxt );
            }
            $( "#" + buttonId ).html( copyBtn );
            initCopyBtn( document.getElementById( buttonId ), data );
        }
        // Selects everything in the copy area if there is no button or selectAllContent is true
        if ( ( "selectAllContent" in data === true && data.selectAllContent === true ) || ( "selectAllContent" in data === false && "noButton" in data === true ) ) {
            $( "#" + copySegmentId ).on( "click vclick touchstart", function() {
                selectCopyArea( document.getElementById( copySegmentId ) );
            } );
        }
    } );
    // Update the copy area and button on copy
    $( "body" ).on( "copy", "*", function( event ) {
        updateElmCopy( event.currentTarget ); // , event.target
    } );
    // On focus and change of a contenteditable tag trigger the change action
    $document.on( "focus", selector + "[contenteditable]", function() {
        const $this = $( this );
        $this.data( "before", $this.html() );
    } ).on( "blur keyup paste input", selector + "[contenteditable]", function() {
        const $this = $( this );
        if ( $this.data( "before" ) !== $this.html() ) {
            $this.data( "before", $this.html() );
            $this.trigger( "change" );
        }
    } );
    // Update the copy area and button on change
    $document.on( "change", selector, function( event ) {
        updateElmCopy( event.currentTarget ); //, event.target
    } );
    // On click perform a copy or reset action
    $document.on( "click", "." + btnClass, async function( event ) {
        var btnData = wb.getData( $( event.currentTarget ), "wb-clipboard" );
        if ( btnData.resetBtn ) {
            $( event.currentTarget ).trigger( "reset" + selector );
        } else if ( btnData.copyAreaId ) {
            if ( await copyToClipboard( btnData.copyAreaId ) === true ) {
                if ( focusReset === true ) {
                    $( ":focus" ).one( "focusout", function( event ) {
                        event.stopPropagation();
                        document.getSelection().removeAllRanges();
                        updateAll();
                    } );
                }
            }
        }
    } );
    // Reset the copy area and buttons
    $document.on( "reset" + selector, function( event ) {
        $( "." + btnClass ).each( function() {
            var btnData = wb.getData( $( this ), "wb-clipboard" );
            resetCopyBtn( this, btnData, event.target );
        } );
        $( "." + contentShell ).each( function() {
            updateTag( this, this.clipTxt );
        } );
        $( ".wb-clipboard" ).each( function() {
            $( this ).removeClass( copiedSectionStyle );
        } );
        document.getSelection().removeAllRanges();
    } );
    // Bind the init event of the plugin
    $document.on( "timerpoke.wb " + initEvent, selector, init );
    // Add the timer poke to initialize the plugin
    wb.add( selector );
} )( jQuery, window, wb );
