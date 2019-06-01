


var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1901+East+Asbury,+Denver,+CO&key=AIzaSyBr1UF29gLIRNBbxHQG3ElsfeB0RV_dufg"

$.ajax({
    url: geoURL,
    method: "GET"
})
.then(function (response) {
    console.log(response)
});


// set up API for Edamam
var edamamQueryURL = "https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id={awesome}&app_key={e4946987}"

$.ajax({
    url: edamamQueryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});

// get summary view of 5 results rendering

// create button with jQuery to show detail of each result

// show detail on button submit in container of detail view
