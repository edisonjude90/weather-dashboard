import React, {Component} from 'react';
import {
    Card,
    CardImg,
    CardBody,
    Row,
    Col,
    Button
} from 'reactstrap';

import iconWindSpeed from '../../icons/windspeed.jpeg';
import iconHumidity from '../../icons/humidity.png';
import constantVal from '../../constants/constants';

function convertKelvinToCelsius(tempValue){

    const celsius = Math.round(10*(tempValue -273.15)) / 10 ;
    return celsius;

}

class WeatherCards extends Component{

    constructor(props){
        super(props);
        this.OnRemoveCity = this.OnRemoveCity.bind(this);
    }

    OnRemoveCity(cityName){
        this.props.removeCity(cityName);
    }

    render(){

        const wCityInfo = this.props.weatherinfo; 
        const cardIcon = constantVal.weatherIconApiUrl + wCityInfo.weather[0].icon + ".png";
        const celsiusValue = convertKelvinToCelsius(wCityInfo.main.temp);
        const cityName = wCityInfo.name;
        const weatherDesc = wCityInfo.weather[0].description;
        const humidityPercent = wCityInfo.main.humidity;
        const speedValue = wCityInfo.wind.speed;

        return(

            <Card className = "card-place-weather" >
                <div className = "clearfix">
                    <div className="img-weather">
                        <CardImg src = {cardIcon} alt = "img" />
                    </div>
                    <span className="deg-celcius-val">{ celsiusValue }<span><sup>°</sup>C</span></span>
                </div>
                <CardBody>    
                    <Row>
                        <Col> 
                            <h2>{ cityName }</h2>
                            <h5>{ weatherDesc } </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className = "img-humidity">
                                <CardImg src = {iconHumidity} alt = "img" />
                            </div>
                            <span className = "humidity-percent-val" >{humidityPercent} %</span>    
                        </Col>
                        <Col>
                            <div className = "img-wind-speed">
                                <CardImg src = {iconWindSpeed} alt = "img" />
                            </div>
                            <span className = "wind-speed-val" >{speedValue} m/s</span>
                        </Col>    
                    </Row>     
                    <Row>
                        <Col>
                            <Button onClick = { () => (this.OnRemoveCity(cityName)) } >Remove</Button>
                        </Col>
                    </Row>    
                </CardBody>        
            </Card>

        );

    }

}

export default WeatherCards;