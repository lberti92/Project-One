// take in user input through zip code, then use google geo coder it and pass it in for location

// var zomatoURL = "https://developers.zomato.com/api/v2.1/search+cuisine+"+ cuisne + "&api_key=5f7e180716b2eb861d47aa1baa40e686=5"

// $.ajax({
//     url: queryURL, 
//     method: "GET"
// })


var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1901+East+Asbury,+Denver,+CO&key=AIzaSyBr1UF29gLIRNBbxHQG3ElsfeB0RV_dufg"

$.ajax({
    url: geoURL,
    method: "GET"
})
.then(function (response) {
    console.log(response)
});


