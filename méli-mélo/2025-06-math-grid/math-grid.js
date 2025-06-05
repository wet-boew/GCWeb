/**
 * @title WET-BOEW Barebone plugin container
 * @overview Plugin contained to show an example of how to create your custom WET plugin
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp
 */
(function ($, window, wb) {
  "use strict";
  /*
   * Variable and function definitions.
   * These are global to the plugin - meaning that they will be initialized once per page,
   * not once per instance of plugin on the page. So, this is a good place to define
   * variables that are common to all instances of the plugin on a page.
   */
  var componentName = "wb-math-grid",
    selector = "." + componentName,
    initEvent = "wb-init" + selector,
    $document = wb.doc,
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

        //Validate equal column count
        const $rows = $elm.find('.mg-row');
        if ($rows.length === 0) return;
        const counts = [];
        $rows.each(function (rowIndex) {
          const count = $(this).find('.mg-cell').length;
          counts.push({
            count,
            row: rowIndex + 1
          });
        });
        const firstObject = counts[0];
        const firstValue = firstObject.count;
        const allMatch = counts.every(obj => obj.count === firstValue);

        if (!allMatch) {
          console.error('Grid layout error for' + elm.id + ' - inconsistent cell counts detected:\n'
            + counts.map(r =>
              `→ Row: ${r.row}, Cell count: ${r.count}`
            ).join('\n')
          );
            $(this).addClass('bg-danger');
        } else {
            
//Function to add in aria and roles for accessibility            
          const attrData = $(this).attr('data-wb-math-grid');
const srPause = attrData ? JSON.parse(attrData)?.srPause : undefined;
const $cells = $(this).find('.mg-cell');

srPause === true
  ? $(this).attr('role', 'presentation')
  : $cells.attr('role', 'none');     
          $cells.each(function () {
            const content = $(this).text().replace(/[\u202F\u00A0]/g, '').trim();
            if (content === '') {
              $(this).attr('aria-hidden', 'true');
            }
          })
        }
        wb.ready($elm, componentName);
      }
    };
  // Bind the init event of the plugin
  $document.on("timerpoke.wb " + initEvent, selector, init);

  wb.add(selector);
})(jQuery, window, wb);

