//Typescript is the superset equivalent of Javascript.
declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');


//Title
class Title extends React.Component {
    render() {
        return (
            <div>
                <h1 className="title-container__title">Weather Finder</h1>
                <h3 className="title-container__subtitle">Find out temperature, conditions and more!</h3>
            </div>
        );
    }
};

//Weather
class Weather extends React.Component {
    render() {
        return (
            <div className="weather__info">
                {
                    this.props.city && this.props.country && <p className="weather__key">Location:
                    <span className="weather__value"> {this.props.city}, {this.props.country}</span>
                    </p>
                }

                {
                    this.props.temperature && <p className="weather__key"> Temperature:
                    <span className="weather__value"> {this.props.temperature}</span>
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
class Form extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder="City..."></input>
                <input type="text" name="country" placeholder="Country..."></input>
                <button>Get weather</button>
            </form>
        );
    }
};

class CSSClass extends React.Component {
    render() {
        return (
            <link rel="stylesheet" href="app.css" />
            );
    }
};

const API_KEY = '39a9c9e10d07c63dde01d21bbeca07c0';

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }


    getWeather = async function(e) {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        
        if (city && country) {
            console.log(data);

            this.setState({
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
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
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
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
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
