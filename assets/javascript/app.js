

var geoAPI = "AIzaSyBr1UF29gLIRNBbxHQG3ElsfeB0RV_dufg";
var geoAPI2 = "AIzaSyAoCyFHVjRHTcxhvoWxkgFC7G6fpCXn2-I";
var geoAPI3= "AIzaSyCwUotoEzIyv1ZHQWPqiLJ4PjShrUMGgdA";
var geoAPI4= "AIzaSyB5t0syv4UGzWvOzQYa6iTy1kAwFB_2n5Y";


$(document).ready(function () {
    $('.cuisines').hide();
});

$("#submitLoc").on("click", function (event) {
    event.preventDefault();
    var address = $("#cuisine-location").val();
    console.log(address);
    var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + geoAPI4;
    $(".cuisines").toggle();

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
                        mytable = $('<table></table>').attr({ id: "basicTable",class:"table table-hover"});

                        for (var i = 0; i < response.restaurants.length; i++) {
                            var restName = response.restaurants[i].restaurant.name;
                            var restURL = response.restaurants[i].restaurant.url;
                            var restAddress = response.restaurants[i].restaurant.location.address;
                            console.log(response.restaurants[i].restaurant.name);
                            console.log(response.restaurants[i].restaurant.url);
                            console.log(response.restaurants[i].restaurant.location.address);

             
                                var row = $("<div>").addClass("row justify-content-around col-4").attr({"style":"18rem"})
                                // // var image = $("<img>").addClass("card-img-top").attr("src", recipeCards[i].image)
                                row.append(response.restaurants[i].restaurant.name);
                              
                                // var cardBody=$("<div>").addClass("card-body")
                                // var title = $("<h5>").addClass("card-title").text(recipeCards[i].name)
                                // var description = $("<p>").addClass("card-text").text(recipeCards[i].description)
                                // var link = $("<a>").addClass("btn brn-link").attr({"href":recipeCards[i].link ,"role":"button", "target":"blank"}).text("Get the recipe")
                              
                              
                                // cardBody.append(title).append(description).append(link)
                                // card.append(cardBody)
                        };

                        // for (var i = 0; i < response.restaurants.length; i++) {
                        //     var row = $("<div>").addClass("row justify-content-around col-4").attr({"style":"18rem"})
                        //     // var image = $("<img>").addClass("card-img-top").attr("src", recipeCards[i].image)
                        //     row.append(restaurant.name);
                          
                        //     var cardBody=$("<div>").addClass("card-body")
                        //     var title = $("<h5>").addClass("card-title").text(recipeCards[i].name)
                        //     var description = $("<p>").addClass("card-text").text(recipeCards[i].description)
                        //     var link = $("<a>").addClass("btn brn-link").attr({"href":recipeCards[i].link ,"role":"button", "target":"blank"}).text("Get the recipe")
                          
                          
                        //     cardBody.append(title).append(description).append(link)
                        //     card.append(cardBody)


                                          //     <div class="row justify-content-around">
                    //     <div class="col-4">
                    //       One of two columns
                    //     </div>
                    //     <div class="col-4">
                    //       One of two columns
                    //     </div>
                    //   </div>
                          
                        });

  

               

                    // edamam search result from selected cuisine tab limited to 5 recipes
                    var edamamQueryURL = "https://api.edamam.com/search?q=" + selected + "&to=5&app_id=e4946987&app_key=ee70be41f697b3bd702e4e02fc258d39";

                    // returns title (label), image and original recipe link (url)
                    $.ajax({
                        url: edamamQueryURL,
                        method: "GET"
                    }).then(function (response) {
                        console.log(response);
                        for (var i = 0; i < response.hits.length; i++) {
            
                            var recipeName = (response.hits[i].recipe.label);
                            var recipeImage = (response.hits[i].recipe.image);
                            var recipeURL = (response.hits[i].recipe.url);

                            console.log(recipeName);
                            console.log(recipeImage);
                            console.log(recipeURL);

                         

                            var row = $("<tr></tr>").addClass("justify-content-around col-4").addClass("card mb3").attr({"style":"18rem"})
                            
                          
                            var cardBody =$("<div>").addClass("card-body");
                            var label = $("<h5>").addClass("card-title").text(recipeName);
                            var image = $("<p>").addClass("card-text").text(recipeImage);
                            var url = $("<a>").addClass("btn brn-link").attr({"href":recipeURL,"role":"button", "target":"blank"}).text("Get the recipe");
                        //   console.log(label);
                        //   console.log(image);
                        //   console.log(url);
                          console.log(recipeName[i].label)
                          
                            cardBody.append(label).append(image).append(url);
                            row.append(cardBody);

                            $("#searchSum").append(row);
                        }
                    });
                    

                });
            });

        });
});



