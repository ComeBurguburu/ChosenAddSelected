(function ($) {
    "use strict";
    var init = function (selectTarget, options) {
            var settings = $.extend({
                    url: "setOptions.php"
                }, options),
                value = $(selectTarget).next().find("input").val(),
                tableName;
            if (value === "") {
                return;
            }

            if (value === $(selectTarget).data("placeholder")) {
                value = undefined;
            }

            if ($(selectTarget).prop('id') !== "") {
                tableName = $(selectTarget).prop('id');
            } else if ($(selectTarget).prop('class') !== "") {
                tableName = $(selectTarget).prop("class");
            } else {
                tableName = "";
            }

            $.ajax({
                type: "GET",
                url: settings.url,
                data: {
                    value: value,
                    table: tableName
                },
                success: function (result) {
                    $(selectTarget).html(result);
                    $(selectTarget).trigger("chosen:updated");
                    $(selectTarget).trigger("ready");
                    if (value !== "") {
                        $(selectTarget).trigger("change");
                    }
                },
                error: function (error) {
                    console.error(error);
                }
            });
            return selectTarget;
        },
        chosenAddSelectOption = function (selectTarget) {
            init(selectTarget);
        },
        getServerData = function () {

            $(this).next().find(".chosen-results li").html($(this).next().find("input").val() + "\t\t\t (press ENTER to add)");
            var ENTER = 13;

            $(this).next().find(".search-field input").one("keyup", {
                origin: $(this)
            }, function (event) {
                if (event.which === ENTER) {
                    chosenAddSelectOption(event.data.origin);
                    $(event.data.origin).trigger("chosen:updated");
                    return $(this);
                }
            });
        };
    $.fn.ChosenAddSelected = function (options) {
        chosenAddSelectOption($(this), options);
        getServerData();
        $(this).on("chosen:no_results", getServerData);
    };

})(jQuery);