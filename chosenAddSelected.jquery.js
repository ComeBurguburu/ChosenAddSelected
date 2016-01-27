(function ($) {

    var chosenAddSelectOption = function (selectTarget) {
        init(selectTarget);
    },
        init = function (selectTarget) {
            var value = $(selectTarget).next().find("input").val(), tableName;
            if (value === "") {
                return;
            }

            if (value === $(selectTarget).data("placeholder")) {
                value = "";
            }

            if ($(selectTarget).prop('id') !== "") {
                tableName = $(selectTarget).prop('id');
            } else if ($(selectTarget).prop('class') !== "") {
                tableName = $(selectTarget).prop("class");
            } else{
			      }
		
            $.ajax({
                type: "GET",
                url: "get/setOptions.php",
                data: {
                    value: value,
                    table: tableName,
                    customer: getCustomer()
                },
                success: function (result) {
                    $(selectTarget).html(result);
                    $(selectTarget).trigger("chosen:updated");
                    $(selectTarget).trigger("ready");
					if(value!==""){
						$(selectTarget).trigger("change");
					}
                },
                fail: function (error) {alert(error); }
            });
            return selectTarget;
        },
        getServerData = function () {

            $(this).next().find(".chosen-results li").html($(this).next().find("input").val() + "\t\t\t (press ENTER to add)");
            var ENTER = 13;

            $(this).next().find(".search-field input").one("keyup", {origin: $(this)}, function (event) {
                if (event.which === ENTER) {
                    chosenAddSelectOption(event.data.origin);
                    $(event.data.origin).trigger("chosen:updated");
                    return $(this);
                }
            });
        };
    $.fn.ChosenAddSelected = function () {
        chosenAddSelectOption($(this));
		$(this).on("addSelected",function(){init($(this));console.warn($(this).parent().html());alert("up to date")});

        getServerData();
        $(this).on("chosen:no_results", getServerData);
    };
    
})(jQuery);