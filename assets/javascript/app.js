// set up API for Edamam
var edamamSearch = $(this).attr("data-name");
var edamamQueryURL = "https://api.edamam.com/api/food-database/parser?cuisineType=" + edamamSearch + "&app_id={awesome}&app_key={e4946987}";

$.ajax({
    url: edamamqueryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});

// get summary view of 5 results rendering

// create button with jQuery to show detail of each result

// show detail on button submit in container of detail view