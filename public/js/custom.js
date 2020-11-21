/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */

"use strict";

Ractive.decorators.select2 = function (node, url, name){
   
    const keypath = this.getContext(node).getBindingPath();

    $(node).select2({
        ajax: {
            url: url,
            processResults: function (data) {
            // Transforms the top-level key of the response object from 'items' to 'results'
                var items  = data.map(function(d){
                    var obj = { 
                        id:d.id, 
                        text: d.name
                    };
                    return obj;
                })
                return {
                    results: items
                };
            }

        }
    })
    $(node).on('select2:select', (e) => {
        this.set(keypath, e.params.data.id)
    });
    return {
      update (value) {
        $(node).vale(value).trigger('change')
      },
      teardown(){
        $(node).select2('destroy')
      }
    }
  }
