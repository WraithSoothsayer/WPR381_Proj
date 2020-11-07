var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

let weatherAPI = require("./WeatherAPI");
let bodyParser = require("body-parser");

app.set('port', process.env.PORT || 1337);
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/process", (req, res) => {
    state = {
        maxTemp: undefined,
        minTemp: undefined,
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    if (req.body.city && req.body.country) {
        console.log(data);

        this.setState({
            maxTemp: data.main.temp_max,
            minTemp: data.main.temp_min,
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: ""
        });
    }
    else {
        this.setState({
            maxTemp: undefined,
            minTemp: undefined,
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: "Please enter values into both fields"
        });
    }
    res.render("index.html", { data: state });
})

app.listen(app.get('port'), function () {
    console.log('listening');
});