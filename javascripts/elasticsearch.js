$(function() {
  $( "#search" ).autocomplete({
    source: function( request, response ) {
      var wildcard = { "title": "*" + request.term + "*" };
      var postData = {
        "query": { "wildcard": wildcard },
        "fields": ["title", "_id"]
      };
      $.ajax({
        url: "http://50.18.47.23:9200/mongo-recipes/_search",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        success: function( data ) {
          response( $.map( data.hits.hits, function( item ) {
            return {
              label: item.fields.title,
              id: item.fields._id
            }
          }));
        }
      });
    },
    minLength: 2,
    select: function( event, ui ) {
      $("#company_id").val(ui.item.id);
    },
    open: function() {
      $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
    },
    close: function() {
      $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
    }
  })
});