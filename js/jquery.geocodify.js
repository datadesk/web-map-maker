(function($) {
    'use strict';

    $.fn.geocodify = function(options) {
        var settings = {
            'regionBias': null,
            'viewportBias': null,
            'onSelect': function(ele) {
                alert('Jump to: ' + ele.formatted_address);
            },
            'minimumCharacters': 5,
            'prepSearchString': null,
            'filterResults': null,
            'errorHandler': null,
            'noResultsText': "No results found. Please refine your search.",
            'acceptableAddressTypes': ['street_address', 'route', 'intersection', 'political', 'country', 'administrative_area_level_1', 'administrative_area_level_2', 'administrative_area_level_3 ', 'colloquial_area', 'locality', 'sublocality', 'neighborhood', 'premise', 'subpremise', 'postal_code', 'natural_feature', 'airport', 'park', 'point_of_interest', 'post_box', 'street_number', 'floor', 'room'],
            'keyCodes': {
                UP: 38,
                DOWN: 40,
                DEL: 46,
                TAB: 9,
                RETURN: 13,
                ESC: 27,
                COMMA: 188,
                PAGEUP: 33,
                PAGEDOWN: 34,
                BACKSPACE: 8
            }
        };

        return this.each(function() {
            var $this = $(this),
                $input = $this,
                dropdownId = $this.attr("id") + "-dropdown",
                dropdown;

            if (options) {
                $.extend(settings, options);
            }

            // Ensure that autocomplete is turned off on input field
            $input.attr("autocomplete", "off").addClass("geocodify");

            // Add the dropdown box
            $("<div>")
                .attr({
                    id: dropdownId
                })
                .addClass("geocodify-dropdown")
                .hide()
                .insertAfter($input);

            dropdown = $("#" + dropdownId);

            // Define what will happen when the form is reset
            $this.reset = function() {
                dropdown.empty();
                dropdown.hide();
            };

            // Create the bizness for how the geocoder work
            $this.previousSearch = null;
            $this.searchCache = {};
            $this.google = new google.maps.Geocoder();
            $this.fetch = function(query, force) {

                if (query === $this.previousSearch && force !== true) {
                    return false;
                }

                $this.previousSearch = query;
                var qLength = query.length,
                    params = {
                        'address': query
                    };

                if (qLength < settings.minimumCharacters && force !== true) {
                    dropdown.html("");
                    dropdown.hide();
                    return false;
                }

                if (settings.prepSearchString) {
                    query = settings.prepSearchString(query);
                }

                if (settings.regionBias) {
                    params.region = settings.regionBias;
                }

                if (settings.viewportBias) {
                    params.bounds = settings.viewportBias;
                }

                this.google.geocode(params, $this.onGeocode(force));

            };

            // The callback that runs after the geocoder returns
            $this.onGeocode = function(force) {
                return function(results, status) {
                    var keep = [],
                        count = 0,
                        ul,
                        li;

                    $this.reset();

                    // Handle errors
                    if (status !== google.maps.GeocoderStatus.OK) {
                        if (settings.errorHandler) {
                            settings.errorHandler(results, status);
                            return false;
                        }
                    }

                    // Loop through the results and filter out precision
                    // levels we will not accept.
                    $.each(results, function(i, val) {
                        $.each(val.types, function(ii, type) {
                            if (new RegExp(type).test(settings.acceptableAddressTypes.join("|"))) {
                                keep.push(val);
                                return false;
                            }
                        });
                    });

                    // Further filter the results if a function has been provided
                    if (settings.filterResults) {
                        keep = settings.filterResults(keep);
                    }

                    count = keep.length;
                    if (count === 0) {
                        ul = $("<ul>");
                        li = $("<li>")
                            .html(settings.noResultsText)
                            .appendTo(ul);
                        ul.appendTo(dropdown);
                        dropdown.show();
                        $("li", dropdown).css("cursor", "default");
                    } else if (count === 1 && force) {
                        settings.onSelect(keep[0]);
                        $this.reset();
                        $this.previousSearch = results[0].formatted_address;
                        $input.val(keep[0].formatted_address);
                    } else {
                        ul = $("<ul>");
                        $.each(keep, function(i, val) {
                            $('<li>')
                                .html(val.formatted_address)
                                .click(function() {
                                settings.onSelect(val);
                                $this.reset();
                                $this.previousSearch = val.formatted_address;
                                $input.val(val.formatted_address);
                            })
                                .hover(

                            function() {
                                $(this).addClass("selected");
                            },

                            function() {
                                $(this).removeClass("selected");
                            })
                                .appendTo(ul);
                        });
                        ul.appendTo(dropdown);
                        dropdown.show();
                    }
                };
            };

            // Bind our geocoding operation to the input entry
            $this.on("keyup", function () {
                $this.fetch($this.val(), false);
            });

            // Bind dropdown reset to input unfocus
            $this.on("blur", function () {
                // Small delay so that script can carry out other actions (like selecting a dropdown entry)
                window.setTimeout(function () {
                    $this.reset();
                }, 200);
            });

            // Bind key up and down events
            $this.bind("keydown", function(event) {
                var resultList,
                selectedIndex;

                switch (event.keyCode) {
                    case settings.keyCodes.UP:
                        resultList = $("li", dropdown);
                        selectedIndex = 0;
                        $.each(resultList, function(i, li) {
                            if ($(li).hasClass("selected")) {
                                selectedIndex = i;
                                $(li).removeClass("selected");
                            }
                        });
                        if (selectedIndex - 1 < 0) {
                            break;
                        }
                        $(resultList[selectedIndex - 1]).addClass("selected");
                        break;
                    case settings.keyCodes.DOWN:
                        resultList = $("li", dropdown);
                        selectedIndex = -1;
                        $.each(resultList, function(i, li) {
                            if ($(li).hasClass("selected")) {
                                selectedIndex = i;
                                $(li).removeClass("selected");
                            }
                        });
                        if (selectedIndex - 1 >= resultList.length) {
                            break;
                        }
                        $(resultList[selectedIndex + 1]).addClass("selected");
                        break;
                    case settings.keyCodes.RETURN:
                        resultList = $("li.selected", dropdown);
                        if (resultList) {
                            resultList.click();
                        } else {
                            $this.fetch($input.val(), true);
                        }
                        break;
                    default:
                        break;
                }
            });

        });
    };
})(jQuery);
