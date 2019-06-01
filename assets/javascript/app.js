


var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1901+East+Asbury,+Denver,+CO&key=AIzaSyBr1UF29gLIRNBbxHQG3ElsfeB0RV_dufg"

$.ajax({
    url: geoURL,
    method: "GET"
})
.then(function (response) {
    console.log(response)
});


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
