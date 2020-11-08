//Typescript is the superset equivalent of Javascript.
declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

//let weatherData = require("./server");

//Title
class Title extends React.Component {
    render() {
        return (
            <div>
                <h1 className="title-container__title">Web Weather</h1>
                <h3 className="title-container__subtitle">Get your weather on the go!</h3>
            </div>
        );
    }
};

let unit = "";
let sign = "";

//let ThunderStormIcon = require( './weather icons/01W.svg');
//let RainIcon = require( './weather icons/02W.svg');
//let SnowIcon = require( './weather icons/03W.svg');
//let ClearIcon = require( './weather icons/04W-DAY.svg');
//let CloudsIcon = require( './weather icons/05W.svg');

//Weather
class Weather extends React.Component {
    render() {
        if (unit == "metric") {
            sign = "C";
        }
        else {
            sign = "F";
        }
        return (
            <div className="weather__info">                
                {
                    this.props.maxTemp && <p className="weather__key"> Max temperature:
                    <span className="weather__value"> {this.props.maxTemp}&deg;{sign}</span>
                    </p>
                }

                {
                    this.props.minTemp && <p className="weather__key"> Min temperature:
                    <span className="weather__value"> {this.props.minTemp}&deg;{sign}</span>
                    </p>
                }

                {
                    this.props.city && this.props.country && <p className="weather__key">Location:
                    <span className="weather__value"> {this.props.city}, {this.props.country}</span>
                    </p>
                }

                {
                    this.props.temperature && <p className="weather__key"> Temperature:
                    <span className="weather__value"> {this.props.temperature}&deg;{sign}</span>
                    </p>
                }

                {
                    this.props.humidity && <p className="weather__key"> Humidity:
                    <span className="weather__value"> {this.props.humidity}</span>
                    </p>
                }

                {
                    this.props.description && <p className="weather__key"> Conditions:
                    <span className="weather__value"> {this.props.description}</span>
                    </p>
                }
     

                {
                    this.props.error && <p className="weather__error"> {this.props.error}</p>
                }
            </div>
        );
    }
};



//Form
class Form extends React.Component
{
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder="City..."></input>
                <input type="text" name="country" placeholder="Country..."></input>
                <select name="unitType" id="metric">
                    <option value="metric">Metric</option>
                    <option value="imperial">Imperial</option>
                </select>
                <button>Get weather</button>
            </form>
        );
    }
};

class CSSClass extends React.Component {
    render() {
        return (
            <link rel="stylesheet" href="app.css" type="text/css"/>
            );
    }
};

const API_KEY = '39a9c9e10d07c63dde01d21bbeca07c0';

class App extends React.Component
{
    state = {
        maxTemp: undefined,
        minTemp: undefined,
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        //weatherIcon: '',
        error: undefined
    }

    getWeather = async function (e)
    {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        unit = e.target.elements.unitType.value;

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${unit}`);
        const data = await api_call.json();

       // let weatherId = data.data.weather[0].id;

        if (city && country)
        {
            console.log(data);

            //if (weatherId <= 232) {
            //    this.setState({ weatherIcon: ThunderStormIcon })
            //} else if (weatherId >= 300 && weatherId <= 531) {
            //    this.setState({ weatherIcon: RainIcon });
            //} else if (weatherId >= 600 && weatherId <= 622) {
            //    this.setState({ weatherIcon: SnowIcon });
            //} else if (weatherId === 800) {
            //    this.setState({ weatherIcon: ClearIcon });
            //} else if (weatherId >= 801 && weatherId <= 804) {
            //    this.setState({ weatherIcon: CloudsIcon });
            //}

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
              //  weatherIcon: '',
                error: "Please enter values into both fields"
            });
        }
    }

    render() {
        return (
            <div>
                <CSSClass />
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Title />
                                </div>
                                <div className="col-xs-7 form-container">
                                    <Form getWeather={this.getWeather.bind(this)} />
                                    <Weather
                                        maxTemp={this.state.maxTemp}
                                        minTemp={this.state.minTemp}
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                       // weatherIcon={this.state.weatherIcon}
                                        error={this.state.error} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));
