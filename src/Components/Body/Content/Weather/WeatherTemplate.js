import style from './weatherStyle.module.css';

const WeatherTemplate = (props) => {
    const backgroundStyle = props.weather.backgroundStyle;
    const smokeStyle = ['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash', 'Squall', 'Tornado']
    return(
        <div 
            className={ 
                (backgroundStyle == 'Thunderstorm')? style.root +' '+ style.thunderstorm : 
                (backgroundStyle == 'Drizzle')? style.root +' '+ style.drizzle : 
                (backgroundStyle == 'Rain')? style.root +' '+ style.rain : 
                (backgroundStyle == 'Clear')? style.root +' '+ style.sunny : 
                (backgroundStyle == 'Snow')? style.root +' '+ style.snow : 
                (backgroundStyle == 'Clouds')? style.root +' '+ style.cloud : 
                (smokeStyle.includes(backgroundStyle))? style.root +' '+ style.smoke : ''
            } 
            >
            <div className={style.content}>
                <div className={style.header}>
                    <h3>{props.weather.city}</h3>
                </div>
                <div className={style.main}>
                    <p>{props.weather.temp} °C</p>
                </div>
                <div className={style.body}>
                    <ul>
                        <li><p>Clouds: {props.weather.clouds}%</p></li>
                        <li><p>Humidity: {props.weather.humidity}%</p></li>
                        <li><p>Wind: {props.weather.wind} m/s</p></li>
                        <li><p>Pressure: {props.weather.pressure} hpa</p></li>
                    </ul>
                </div>
                <div className={style.footer}>
                    <h4>{props.weather.description}</h4>
                </div>
            </div>
        </div>
    )
}

export default WeatherTemplate;
