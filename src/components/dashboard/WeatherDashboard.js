import React, {Component} from 'react';
import {
    Jumbotron,
    Row,
    Col,
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

import wData from '../../data/data';
import constantVal from '../../constants/constants';
import WeatherCards from './WeatherCards';

function handleWeatherApiRequest(cityName){

    const wApiUrl = constantVal.weatherApi + cityName + "&appid=" + constantVal.appid;
    return new Promise((resolve,reject)=>{

        fetch(wApiUrl).then((res)=>(
            resolve(res.json())
        )).catch((err)=>(
            reject(err)
        ));

    });

}

class WeatherDashboard extends Component {

    constructor(props){
        super(props);
        let weatherPinnedCity = JSON.parse(window.localStorage.getItem("weatherPinnedCity"));
        weatherPinnedCity = (weatherPinnedCity === null) ? [] : weatherPinnedCity;    

        this.state = {
            searchTxtVal:'',
            pinnedCity:weatherPinnedCity,
            WeatherInfo:[],
            notFound:false   
        };

        this.HandleOnPinnedCity = this.HandleOnPinnedCity.bind(this);
        this.HandleOnChange = this.HandleOnChange.bind(this);
        this.HandleOnRemoveCity = this.HandleOnRemoveCity.bind(this);

    }

    HandleOnPinnedCity(){

        const cityNameText = this.state.searchTxtVal;
        var getCityWeatherInfo = handleWeatherApiRequest(cityNameText)

        getCityWeatherInfo.then((res)=>{

            if (res.cod == 200){

                this.setState((prevState)=>({
                    pinnedCity:prevState.pinnedCity.concat(cityNameText),
                    WeatherInfo:prevState.WeatherInfo.concat(res),
                    searchTxtVal:'',
                    notFound:false
                }),()=>(
                    window.localStorage.setItem("weatherPinnedCity",JSON.stringify(this.state.pinnedCity))
                ));

            }else{
                this.setState({
                    notFound:true
                });
            }

        }).catch((err)=>{
            console.log("error");
        });

    }

    HandleOnChange(e){
        this.setState({
            searchTxtVal:e.target.value,
            notFound:false
        });
    }

    HandleOnRemoveCity(cityName){
    
        const removeCityIndex = this.state.pinnedCity.indexOf(cityName.toLowerCase());
        const pinnedCity = this.state.pinnedCity.slice();
        pinnedCity.splice(removeCityIndex,1);
        const weatherInfo = this.state.WeatherInfo.slice();
        weatherInfo.splice(removeCityIndex,1);
        
        this.setState({
            pinnedCity:pinnedCity,
            WeatherInfo:weatherInfo
        },()=>( window.localStorage.setItem("weatherPinnedCity",JSON.stringify(this.state.pinnedCity)) ));
        
    }

    render(){

        let weatherInfo = this.state.WeatherInfo;

        const WeatherCardsBlock = weatherInfo.map((item,index)=>(
            <Col key = { index } >    
                <WeatherCards weatherinfo = { item } removeCity = {this.HandleOnRemoveCity} />
            </Col>
        )); 

        return(
            <div>
                <Jumbotron>
                    <Row>
                        <Col>
                            {(this.state.pinnedCity.length < 5) && 
                                <InputGroup>
                                    <Input placeholder = "Search and Pin" value = { this.state.searchTxtVal } onChange = { this.HandleOnChange } />
                                    <InputGroupAddon addonType = "append">
                                        <Button onClick = { this.HandleOnPinnedCity } > Pin </Button>
                                    </InputGroupAddon>  
                                </InputGroup>
                            }                
                            {(this.state.notFound === true) &&
                                    <div>
                                        Could not find the city - { this.state.searchTxtVal }
                                    </div>
                            } 
                        </Col>
                    </Row>
                    <Row>
                       { WeatherCardsBlock }
                    </Row>
                </Jumbotron>
            </div> 
        );   

    }

    componentDidMount(){

        const weatherInfo = this.state.pinnedCity.map((cityName)=>(
            handleWeatherApiRequest(cityName)
        ));
        
        Promise.all(weatherInfo).then((res)=>(
            this.setState({
                WeatherInfo:res
            })
        ));
    }

}

export default WeatherDashboard;

