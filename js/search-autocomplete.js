(function($) {
	$(function() {
		var options = $.extend({
			'fieldName': '#s',
			'maxRows': 10,
			'minLength': 4
		}, SearchAutocomplete);

		options.fieldName = $('<div />').html(options.fieldName).text();

		$(options.fieldName).autocomplete({
			source: function( request, response ) {
                var term = $(options.fieldName).val();
			    $.ajax({
			        url: options.ajaxurl,
			        dataType: "json",
			        data: {
			        	action: 'autocompleteCallback',
			            term: term
			        },
			        success: function( data ) {
                        data.results.unshift({title: "חיפוש חופשי: " + term , url:"?s=" + term});
			            response( $.map( data.results, function( item ) {
                            var title = $("<div />").html(item.title).text();
			                return {
			                	label: title,
			                	value: title,
			                	url: item.url
			                }
			            }));
			        },
			        error: function(jqXHR, textStatus, errorThrown) {
			        	console.log(jqXHR, textStatus, errorThrown);
			        }
			    });
			},
			minLength: options.minLength,
            delay:10,
            position:{collision:"flipfit"},
			search: function(event, ui) {
				$(event.currentTarget).addClass('sa_searching');
			},
			create: function() {
			},
			select: function( event, ui ) {
				if ( ui.item.url !== '#' ) {
					location = ui.item.url;
				} else {
					return true;
				}
			},
			open: function(event, ui) {
				var acData = $(this).data('uiAutocomplete');
				acData
						.menu
						.element
						.find('a')
				$(event.target).removeClass('sa_searching');
			},
			close: function() {
			}
		});
	});
})(jQuery);