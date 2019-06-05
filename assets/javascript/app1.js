
var locationURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=denver&types=geocode&key=AIzaSyBr1UF29gLIRNBbxHQG3ElsfeB0RV_dufg";


// $.ajax({
//     url: locationURL,
//     method: "GET",
// }).then(function (response) {    
//     console.log(response)
//     });


    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=UK&key=AIzaSyAoCyFHVjRHTcxhvoWxkgFC7G6fpCXn2-I', 
        type: 'GET',
        success: function(res) {
            alert(res.status); //responds with "OK"
            console.log(res);
        }
    });