// Require
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;



// GET
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

// POST (User search for a city)
app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "";
    const units = "metric"
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + units;
   https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
  
        const weather = JSON.parse(data);
        const temp = weather.main.temp;
        const description = weather.weather[0].description;
        const icon = weather.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        // write
        res.write("<p>The weather is currently " + description + "</p>");
        res.write("<h1>The temperature in " + query + " is " + temp +" degree Celcius</h1>");
        res.write("<img src=" + imageURL + " />");

        // send
        res.send()
    })
})
})





app.listen(port, function() {
    console.log("Server is running on port : " + port);
})