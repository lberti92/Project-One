

var geoAPI = "AIzaSyB5t0syv4UGzWvOzQYa6iTy1kAwFB_2n5Y";
var address = "1901 East Asbury, Denver, CO";

var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + geoAPI;

$.ajax({
    url: geoURL,
    method: "GET",
})
    .then(function (response) {
        console.log(response)
        console.log(response.results[0].geometry.location.lat);
        console.log(response.results[0].geometry.location.lng);

        var lat = response.results[0].geometry.location.lat;
        var lon = response.results[0].geometry.location.lng;

        // ZOMATO
        var zomatoKey = "5f7e180716b2eb861d47aa1baa40e686"

        // // NOTE: you can only run the code below once you have the geocoded lat/lon from Google Geocoder...
        // // for that reason, you'll likely run this code in the .then for the geocoder API call:

        // // api query link to grab all cuisine types based on location (lat/lon, in this case)
        var cuisinesQuery = "https://developers.zomato.com/api/v2.1/cuisines?lat=" + lat + "&lon=" + lon;
        console.log("cruisine lat " + lat);
        console.log("cruisine lng " + lon)

        $.ajax({
            method: "GET",
            url: cuisinesQuery,
            // the Zomato API is expecting the 'user-key' to be passed in as a header
            beforeSend: function (request) {
                request.setRequestHeader("user-key", zomatoKey);
            },
            // after the cuisine data comes back from the API...
        }).then(function (response) {
            console.log(response);
            // loop through all the cuisines in the response; for each one, make an 'option' for the
            // data-list (in the HTML above)... the text of the option is the cuisine, but there's
            // also a 'data-cuisine-id' on each that is the number the Zomato API needs for the
            // final query
            response.cuisines.forEach(function (type) {
                $("#cuisines").append(`<option value="${type.cuisine.cuisine_name}" data-cuisine-id="${type.cuisine.cuisine_id}" />`);
            });

            // on click of the submit button...
            $("#submit").on("click", function (event) {
                event.preventDefault();
                // grab the currently selected cuisine in human speak
                var selected = $("#cuisine-choice").val();
                console.log("selected " + selected);
                // user the human speak cuisine to find the special Zomato cuisine number
                // (hint: you'll need this for the final Zomato query!)
                // alert($("#cuisines [value='" + selected + "']").data('cuisine-id'));
                // at this point in the game, you would now have both the lat/lon AND the cuisine id,
                // which should be everything needed for the AJAX calls to either 1) search for 
                // restaurants or 2) search for recipes 
                console.log("restaurant lat " + lat);
                console.log("restaurant lng " + lon);
                console.log("restaurant cruisine " + selected);

                // All have been resolved (or rejected), do your thing
                // After submit button has been clicked and we have received the "selected id" then 
                //Restaurants (Zomato) or Recipes (Endamam) will need to be displayed
                var restaurantQuery = "https://developers.zomato.com/api/v2.1/search?count=5&lat=" + lat + "&lon=" + lon + "&cuisines=" + selected;
                $.ajax({
                    url: restaurantQuery,
                    method: "GET",
                    async: false,
                    beforeSend: function (request) {
                        request.setRequestHeader("user-key", zomatoKey);
                    },
                }).then(function (response) {
                    console.log(response);

                    //create a var array
                    // console.log(response.restaurants[0].restaurant.name);
                    // console.log(response.restaurants[0].restaurant.url);
                    // console.log(response.restaurants[0].restaurant.location.address);

                   
                    for (var i = 0; i < response.restaurants.length; i++) {
                 
                        console.log(response.restaurants[i].restaurant.name);
        
                    };

                });

                // edamam search result from selected cuisine tab limited to 5 recipes
                var edamamQueryURL = "https://api.edamam.com/search?q=" + selected + "&to=5&app_id=e4946987&app_key=ee70be41f697b3bd702e4e02fc258d39";

                // returns title (label), image and original recipe link (url)
                $.ajax({
                    url: edamamQueryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    // console.log(response.hits[0].recipe.label);
                    // console.log(response.hits[0].recipe.image);
                    // console.log(response.hits[0].recipe.url);
                    // console.log(response.hits[1].recipe.label);
                    // console.log(response.hits[1].recipe.image);
                    // console.log(response.hits[1].recipe.url);
                    // console.log(response.hits[2].recipe.label);
                    // console.log(response.hits[2].recipe.image);
                    // console.log(response.hits[2].recipe.url);
                    // console.log(response.hits[3].recipe.label);
                    // console.log(response.hits[3].recipe.image);
                    // console.log(response.hits[3].recipe.url);
                    // console.log(response.hits[4].recipe.label);
                    // console.log(response.hits[4].recipe.image);
                    // console.log(response.hits[4].recipe.url);
                    for (var i = 0; i < response.hits.length; i++) {
                        console.log(response.hits[i].recipe.label);
                    }
                });

            });
        });

    });



