import style from './weatherStyle.module.css';
import { Container } from 'react-bootstrap';
import WeatherTemplate from './WeatherTemplate';
import CityForm from './CityForm';
import { useSelector } from 'react-redux';
import { getCurrentWeather } from '../../../../Redux/Slices/Weather/weatherSelector';


const Weather = () => {
    const weather = useSelector(getCurrentWeather);

    return(
        <Container>
            <div className={style.mainContainer}>
                <CityForm />
            </div> 
            <div className={style.mainContainer}>
                {weather.city?<WeatherTemplate weather={weather}/>: 'Please select a city'}
            </div>: 
        </Container>  
    )
}

export default Weather;