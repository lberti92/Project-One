// set up API for Edamam

var edamamSearchResults = $(this).attr("data-name");

var edamamQueryURL = "https://api.edamam.com/search?q=" + edamamSearchResults + "&app_id=e4946987&app_key=ee70be41f697b3bd702e4e02fc258d39";


$.ajax({
    url: edamamQueryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});

// get summary view of 5 results rendering

// create button with jQuery to show detail of each result

// show detail on button submit in container of detail view