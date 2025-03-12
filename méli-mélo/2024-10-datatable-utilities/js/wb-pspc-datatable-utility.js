/********************************************************************************************
 *
 *           Program: Wet-Boew Plugin that will add Column Totals to the Table's <tfoot> element
 *                    Additionally this plugin can format data that is loaded via AJAX, such as Money
 *
 *            Author: Steve Bourgeois <steveb@bozzit.com>
 *                                    <steve.bourgeois@tpsgc-pwgsc.gc.ca>
 *
 *
 *      Version  History: 1.1.1
 *                        Implement Wet-Boew Team recommendations Post Pull Request
 *                          1. Suggestion: create a separate documentation page for all the options instead of having them in the JS file
 *                          2. Please add an implementation plan item: "Produce accessibility conformance report"
 *                          3. I don't see a working example for the following option: wb-col-cur-thousand.
 *
 *      Version  History: 1.1.0
 *                        Implement Wet-Boew Team recommendations
 *                          1. Remove <strong> formatting on Totals in favour of css
 *                          2. Change Init Event to a single function instead
 *                          3. French Translation of Examples Page
 *
 *      Version  History: 1.0.4
 *                        Footercallback Applied to ALL wb-tables, added code to check the current Table for its Settings
 *                        Footer Total in French displayed as NaN
 *
 *                        Fix for wb-col-mailto not Working
 *
 *      Version  History: 1.0.2
 *                        Small Fix that has to do with Assigning values to uninitialized Variables
 *
 *                        1.0.1
 *                        Small Fix that has to do with Assigning values to uninitialized Variables
 *
 *                        1.0.0
 *                        Initial Release
 *
 *          Sample Usage: add class wb-tables-utility to your wb-tables <table element to enable the plugin
 *                        and using the data-wb-tables columnDefs option add class wb-col-sum to the column(s)
 *                        you want totals to appear don't forget to add a blank <tfoot> section
 *
 *   <table class="wb-tables table table-striped table-hover table-condensed small wb-tables-utility" id="t2" data-wb-tables='{ "ajax":"data/ytt-table-2.json", "columns": [
 *                        { "data": "SupplierEN" },
 *                        { "data": "Number of custom studies" },
 *                        { "data": "Contract value" }
 *                      ],
 *              "columnDefs": [{ "className": "text-left", "targets": [0]},
 *                      { "className": "wb-col-sum text-center", "targets": [1] },
 *                      { "className": "wb-col-sum wb-col-money text-right", "targets": [2] }],
 *                       "lengthMenu": [ [5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"] ]}'>
 *
 *            Parameters: filteredsum     Total of Filtered Results Only or All if nothing was filtered
 *                        Default Value:  true
 *
 *                           wb-col-sum   Class added to the columnDefs option of data-wb-tables to let the plugin know that this column needs to be totalled
 *
 *    Formatting Options: wb-col-money    Turns raw numbers such as 123987.10 to Localized Money $123,987.10 (en) 123 987,10 $ (fr)
 *
 *                       wb-col-mailto    Scan for email addresses in column and add the <a href="mailto:" around it
 *                          mailto-col    Legacy Value for wb-col-mailto
 *
 *                 wb-col-cur-thousand    Format number with Thousands Separator and force 2 decimals
 *                    cur-thousand-col    Legacy Value for wb-col-cur-thousand
 *
 *                          wb-col-url    Process url's in column and turn them into clickable <a href="http...."
 *                             url-col    Legacy Value for wb-col-cur-thousand
 *
 ********************************************************************************************
 */

(function ($, window, wb)
{
    'use strict';

    /** Localized Strings used through
     *  this Script for both French and English
     * Currently just a Placeholder for future messages and features
     **/

    const appMessages = {
        'en': {
            'future-msg': 'Some Future Messages'
        },
        'fr': {
            'future-msg': '(FR) Some Future Messages'
        }
    };

    /** Set global variable for all Strings for html page's current language */
    var i18n = appMessages[wb.lang];

    var options = {};

    /*
    * Variable and function definitions.
    * These are global to the plugin - meaning that they will be initialized once per page,
    * not once per instance of plugin on the page. So, this is a good place to define
    * variables that are common to all instances of the plugin on a page.
    */

    var componentName = 'wb-tables-utility',
        selector = "." + componentName,
        initEvent = "wb-init" + selector,
        $document = wb.doc,
        defaults = { 'filteredsum': true },

        /**
         * @method init
         * @param {jQuery Event} event Event that triggered the function call
         */

        init = function (event)
        {
            // Start initialization
            // returns DOM object = proceed with init
            // returns undefined = do not proceed with init (e.g., already initialized)
            var elm = wb.init(event, componentName, selector),
                $elm,
                settings;

            if (elm)
            {
                $elm = $(elm);

                // ... Do the plugin initialisation
                // Get the plugin JSON configuration set on attribute data-wb-form-select

                settings = $.extend(
                    true,
                    {},
                    defaults,
                    window[componentName],
                    wb.getData($elm, componentName)
                );

                options = settings;

                if (window["wb-tables"] && window["wb-tables"][componentName])
                {
                    // Call Initialization
                    initDataTableUtilityInstance(settings);
                }

                // Identify that initialization has completed
                wb.ready($elm, componentName);
            }
        },
        debugMsg = function (msg)
        {
            if (!options.debug)
            {
                return false;
            }

            return typeof msg === 'object' ? console.table(msg) : console.log(`DEBUG '${componentName}': ${msg}`);
        };

    // Add your plugin event handler

    var initDataTableUtilityInstance = function (settings)
    {
        /**
         * Lowercase and Trim Settings Object Keys so LOADLIST, LoadList or loadlist parameters will work
         */

        var key, keys = Object.keys(settings);
        var n = keys.length;
        var data = {}

        while (n--)
        {
            key = keys[n];
            data[key.toLowerCase().trim()] = settings[key];
        }

        /** Message Overridden by User are replaced in the i18n global variable */
        if (data && data.pluginlabels)
        {
            Object.keys(data.pluginlabels[0]).forEach(key =>
            {
                i18n[key] = data.pluginlabels[0][key];
            });
        }

        debugMsg('PSPC: wb-pspc-datatable-utility plugin Version 1.1.1 Initialized');
        debugMsg(data);

    }

    function toFrenchMoney(amount, noDecimals)
    {
        if (arguments.length == 1) // Means second parameter is not passed
        {
            noDecimals = 2;
        }
        return intVal(amount).toFixed(noDecimals).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace(/\./, ',') + ' $'
    }

    function toEnglishMoney(amount, noDecimals)
    {
        if (arguments.length == 1) // Means second parameter is not passed
        {
            noDecimals = 2;
        }
        return '$' + intVal(amount).toFixed(noDecimals).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    var intVal = function (i)
    {

        if (typeof i === 'string' && wb.lang == 'fr')
        {
            i = i.replace(/[,]/g, '.');
        }

        return typeof i === 'string' ? i.replace(/[\$,\s%]/g, '') * 1 :
            typeof i === 'number' ?
                i : 0;
    };

    /**
     * This applies to all wb-tables, so if the plugin is initialized
     **/

    if (window["wb-tables"])
    {
        console.error("Can not initialize wb-table global settings as it is already define.");
    }
    else
    {
        window["wb-tables"] = {
            footerCallback: function (tfoot, aData, start, end, display)
            {
                /* Only do the footerCallback if the wb-tables has the wb-tables-utility class */

                if (!$(this).hasClass("wb-tables-utility"))
                {
                    return;
                }

                var data = $(this).data('wb-tables-utility');

                debugMsg('wb-datatable-utility: footerCallback Executed');

                var api = this.api();

                var searchApplied = { search: 'applied' };

                if (typeof (data) !== "undefined")
                {
                    if (data && !data.filteredsum)
                    {
                        searchApplied = {};
                    }
                }

                api.columns('.wb-col-sum', {}).every(function (index)
                {
                    var GrandTotal = api.column(index, searchApplied).data().reduce(function (a, b)
                    {
                        return intVal(a) + intVal(b);
                    }, 0);

                    var formatedGrandTotal = 0;

                    if ($(this.header()).hasClass('wb-col-money'))
                    {
                        if (wb.lang == 'fr')
                        {
                            formatedGrandTotal = toFrenchMoney(GrandTotal);
                        }
                        else
                        {
                            formatedGrandTotal = toEnglishMoney(GrandTotal);
                        }
                    }
                    else if ($(this.header()).hasClass('cur-thousand-col') || $(this.header()).hasClass('wb-col-cur-thousand'))
                    {
                        var GrandTotal = api.column(index, searchApplied).data().reduce(function (a, b)
                        {
                            return intVal(a) + intVal(b);
                        }, 0);

                        formatedNumber = parseFloat(GrandTotal).toFixed(2)

                        formatedGrandTotal = Number(formatedNumber).toLocaleString(wb.lang, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });
                    }
                    else
                    {
                        formatedGrandTotal = GrandTotal;
                    }

                    $(api.column(index).footer()).html('<strong>' + formatedGrandTotal.toString().replace(/\s/g, '&nbsp;') + '</strong>');
                });
            }
        };
        /** set a flag that we where able to initialize wb-tables with our footerCallback */
        window["wb-tables"][componentName] = true;
    }

    /********************************************************************************************
     *
     * Add Classes to Datatable Columns to force column Specific Formatting
     *
     *       wb-col-mailto: Scan for email addresses in column and add the <a href="mailto:" around it
     * wb-col-cur-thousand: Format number with Thousands Separator and force 2 decimals
     *          wb-col-url: process url's from -url column into <a href="http...."
     *        wb-col-money: formats money with $ and localization
     *
     ********************************************************************************************
     */
    // $('.wb-tables).on('xhr.dt', function ()
    $('.wb-tables.wb-tables-utility').on('xhr.dt', function ()
    {
        var oTable = $(this).DataTable();

        /**
         * Default data Source for most DataTable within
         * PSPC is the data: [ ] Object
         */

        var dataSrc = 'data';

        /* Check if a dataSrc parameter was passed to load something different than data [] */
        if (typeof (oTable.settings().init().ajax['dataSrc']) !== "undefined")
        {
            dataSrc = oTable.settings().init().ajax['dataSrc'];
        }

        var oRow = oTable.data().row().ajax.json()[dataSrc];

        /* if we can't load the AJAX data, log and bailout */
        if (typeof (oRow) == "undefined")
        {
            debugMsg('wb-pspc-plugin: Could Not Get wb-table JSON Data Bailing Out')
            return;
        }

        var mailtoColumnTarget = [];
        var curThousandColTarget = [];
        var moneyFormat = [];
        var urlColTarget = [];

        var oAllColumnNames = oTable.settings().init().columns;

        var oGetColumnVisibility = oTable.columns().visible();

        /**
         * Only put Visible Columns in the list of Available ColumnNames
         */

        var oColumnNames = [];


        for (var key in oAllColumnNames)
        {
            if (oGetColumnVisibility[key])
            {
                oColumnNames.push(oAllColumnNames[key]);
            }
        }

        /**
         * Find all table columns that have
         * Column Formatting Classes
         */

        $(this).find('th.mailto-col, th.wb-col-mailto').each(function ()
        {
            mailtoColumnTarget.push(oColumnNames[$(this).index()]['data']);
        });

        $(this).find('th.cur-thousand-col, th.wb-col-cur-thousand').each(function ()
        {
            curThousandColTarget.push(oColumnNames[$(this).index()]['data']);
        });

        $(this).find('th.wb-col-money').each(function ()
        {
            moneyFormat.push(oColumnNames[$(this).index()]['data']);
        });

        $(this).find('th.url-col, th.wb-col-url').each(function ()
        {
            urlColTarget.push(oColumnNames[$(this).index()]['data']);
        });

        /**
         * Loop over JSON data array and format Columns that are affected by Classes
         */

        for (var i = 0, ien = oRow.length; i < ien; i++)
        {
            /** Process Currency with Thousands Separator [ wb-col-money ] and include a $*/
            moneyFormat.forEach(function (column)
            {
                var justDidgits = oRow[i][column].replace(/[\s,]/g, '');

                var formatedNumber = parseFloat(justDidgits).toFixed(2)

                formatedNumber = Number(formatedNumber).toLocaleString(wb.lang, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });

                if (wb.lang == 'fr')
                {
                    oRow[i][column] = formatedNumber + ' $';
                }
                else
                {
                    oRow[i][column] = '$' + formatedNumber;
                }
            });

            /** Process Numbers with Thousands Separator [ wb-col-cur-thousand ] */
            curThousandColTarget.forEach(function (column)
            {
                var justDidgits = oRow[i][column].replace(/[\s,]/g, '');

                var formatedNumber = parseFloat(justDidgits).toFixed(2)

                oRow[i][column] = Number(formatedNumber).toLocaleString(wb.lang, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            });

            /** Process columns with Email addresses [ wb-col-mailto ] */
            mailtoColumnTarget.forEach(function (column)
            {
                var celldata = oRow[i][column];

                if (!celldata.match(/mailto:/))
                {
                    var allEmails = celldata.match(/(?<!"\>)([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/g);

                    if (allEmails)
                    {
                        allEmails.forEach(function (email)
                        {
                            var emailhref = '<a href="mailto:' + email.toLowerCase() + '">' + email.toLowerCase() + '</a>';
                            celldata = celldata.replace(email, emailhref);
                        });
                    }
                }

                oRow[i][column] = celldata;
            });

            /** Process Columns that have Urls [wb-col-url] */
            urlColTarget.forEach(function (column)
            {
                var anchorText = oRow[i][column];
                var urlValue = '';

                if (oRow[i][column + "-url"])
                {
                    urlValue = oRow[i][column + "-url"];
                }

                if (urlValue)
                {
                    oRow[i][column] = `<a href="${urlValue}">${anchorText}</a>`;
                }
                else
                {
                    var allUrls = anchorText.match(/(https?:\/\/[^ ]*)/);

                    if (allUrls)
                    {
                        allUrls.forEach(function (singleUrl)
                        {
                            var urlhref = `<a href="${singleUrl}">${singleUrl}</a>`;
                            oRow[i][column] = anchorText.replace(singleUrl, urlhref);
                        });
                    }
                }
            });
        }
    });

    // Bind the init event of the plugin
    $document.on("timerpoke.wb " + initEvent, selector, init);

    // Add the timer poke to initialize the plugin
    wb.add(selector);

})(jQuery, window, wb);
