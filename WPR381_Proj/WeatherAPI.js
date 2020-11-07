exports.getWeather = async function (e) {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    unit = e.target.elements.unitType.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${unit}`);
    const data = await api_call.json();

    if (city && country) {
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
}