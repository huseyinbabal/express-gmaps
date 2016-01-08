var express = require("express");
var GoogleMapsAPI = require("googlemaps");
var path = require("path");

var app = express();

app.get("/", function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/search', function(req, res, next) {
    var address = req.query.address;

    var publicConfig = {
        key: process.env.API_KEY,
        stagger_time:       1000,
        encode_polylines:   false,
        secure:             false
    };
    var gmAPI = new GoogleMapsAPI(publicConfig);

    var geocodeParams = {
        "address":    address
    };

    gmAPI.geocode(geocodeParams, function(err, result){
        if (err) {
            res.json({
                success: false,
                data: err
            });
        } else {
            res.json({
                success: true,
                data: result
            })
        }
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server is running...");
});
