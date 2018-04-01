import React from 'react';

import Titles from "./components/Titles";
import Form from "./components/Form.js";
import Weather from "./components/Weather"

const API_KEY = "nope";



class App extends React.Component {
// State is an object that lives within 
// a compoenent and is responsible for keeping 
// track of changing data within a component.
// contains key value pairs.
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined

  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
    const data = await api_call.json();
    if(city && country){
      // Do NOT directly manipulate the state
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      });
  }
}

  render() {
    return(
       <div className="wrapper">
         <div className="main">
           <div className="container">
             <div className="row">
             <div className="col-md-5 col-xs-12 title-container">
             <Titles />
             </div>
             <div className="col-md-5 col-xs-12 form-container">
                <Form getWeather={this.getWeather} />
                <Weather 
                  // Pull from state
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                  />
             </div>

             </div>
           </div>
         </div>
       </div>
    )
  }
};



export default App;
