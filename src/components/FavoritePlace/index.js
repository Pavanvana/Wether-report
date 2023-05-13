import {Component} from 'react'

import './index.css'

class FavoritePlace extends Component{
    state = {
        temp: "",
        cityname: "",
        weatherImg: ""
    }

    componentDidMount = () => {
        this.getWetherReport()
    }

    getWetherReport = async () => {
        const {eachPlace} = this.props
        const {place} = eachPlace
        const apikey = "0af51ad90c53822d9bf1381557e1fb25";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}&units=metric`
        const options = {
            method: 'Get'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok){
            const temp = Math.round(data.main.temp)
            const cityname = data.name

            const weather = data.weather[0].main
            var weatherImg = ""
            if(weather === "Clouds"){
                var weatherImg = "https://res.cloudinary.com/daflxmokq/image/upload/v1683970963/clouds_m52inv.png"
            }else if (weather === "Clear"){
                var weatherImg = "https://res.cloudinary.com/daflxmokq/image/upload/v1683970736/clear_thujux.png"
            }else if (weather === "Rain"){
                var weatherImg = "https://res.cloudinary.com/daflxmokq/image/upload/v1683971038/rain_wfere4.png"
            }else if (weather === "Snow"){
                var weatherImg = "https://res.cloudinary.com/daflxmokq/image/upload/v1683971050/snow_ncugah.png"
            }else if (weather === "Mist"){
                var weatherImg = "https://res.cloudinary.com/daflxmokq/image/upload/v1683971020/mist_ljptru.png"
            }else if (weather === "Haze"){
                var weatherImg = "https://res.cloudinary.com/daflxmokq/image/upload/v1683970982/drizzle_ra2d9s.png"
            }

            this.setState({temp,weatherImg,cityname})
        }else{
            alert(data.message)
        }
    }

    render() {
        const {temp,weatherImg,cityname} = this.state 
        return(
            <>
              {cityname !== "" && 
                <li className='list-item'>
                    <img className='weather-img' src={weatherImg} alt="weather-img"/>
                    <p className='temp-num'>{temp}°C</p>
                    <h1 className='city-name'>{cityname}</h1>
                </li>
              }
            </>
        )
    }
}

export default FavoritePlace