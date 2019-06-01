// set up API for Edamam
// var edamamQueryURL = "https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id={awesome}&app_key={e4946987}"

// $.ajax({
//     url: edamamqueryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
// });

// get summary view of 5 results rendering

// create button with jQuery to show detail of each result

// show detail on button submit in container of detail view

// var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1901+East+Asbury,+Denver,+CO&key=AIzaSyBr1UF29gLIRNBbxHQG3ElsfeB0RV_dufg"

// $.ajax({
//    url: geoURL,
//    method: "GET"
// })
// .then(function (response) {
//     console.log("response" + response);
//    console.log(response.geometry.location.lat);
//    console.log(response.geometry.location.lng);
// });


var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1901+East+Asbury,+Denver,+CO&key=AIzaSyAoCyFHVjRHTcxhvoWxkgFC7G6fpCXn2-I"

$.ajax({
   url: geoURL,
   method: "GET"
})
.then(function (response) {
   console.log("geo-response" + JSON.stringify(response));
   console.log(response.results[0].geometry.location.lat);
});
// var key = "5f7e180716b2eb861d47aa1baa40e686"

// // NOTE: you can only run the code below once you have the geocoded lat/lon from Google Geocoder...
// // for that reason, you'll likely run this code in the .then for the geocoder API call:

// // api query link to grab all cuisine types based on location (lat/lon, in this case)
// var cuisinesQuery = "https://developers.zomato.com/api/v2.1/cuisines?lat=39.7392&lon=-104.9903";

$.ajax({
    method: "GET",
    url: cuisinesQuery,
    // the Zomato API is expecting the 'user-key' to be passed in as a header
    beforeSend: function(request) {
        request.setRequestHeader("user-key", key);
    },
// after the cuisine data comes back from the API...
}).then(function(response) {
    console.log(response);
    // loop through all the cuisines in the response; for each one, make an 'option' for the
    // data-list (in the HTML above)... the text of the option is the cuisine, but there's
    // also a 'data-cuisine-id' on each that is the number the Zomato API needs for the
    // final query
    response.cuisines.forEach(function(type) {
        $("#cuisines").append(`<option value="${type.cuisine.cuisine_name}" data-cuisine-id="${type.cuisine.cuisine_id}" />`);
    });
});

// on click of the submit button...
$("#submit").on("click", function(event) {
    event.preventDefault();
    // grab the currently selected cuisine in human speak
    var selected = $("#cuisine-choice").val();
    // user the human speak cuisine to find the special Zomato cuisine number
    // (hint: you'll need this for the final Zomato query!)
    alert($("#cuisines [value='" + selected + "']").data('cuisine-id'));

    // at this point in the game, you would now have both the lat/lon AND the cuisine id,
    // which should be everything needed for the AJAX calls to either 1) search for 
    // restaurants or 2) search for recipes 
})