import { getCoordinatesApi, getWeatherApi } from '../../../Api/weatherApi';


let initialState = {
    backgroundStyle: '',
    city: '',
    description: '',
    temp: '',
    clouds: '',
    humidity: '',
    wind: '',
    pressure: '',
    lat: '',
    lon: '',
}

const weatherReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_CURRENT_WEATHER' : {
            return {
                ...state,
                backgroundStyle: action.payload.backgroundStyle,
                city: action.payload.city,
                description: action.payload.description,
                temp: action.payload.temp,
                clouds: action.payload.clouds,
                humidity: action.payload.humidity,
                wind: action.payload.wind,
                pressure: action.payload.pressure,
                lat: action.payload.lat,
                lon: action.payload.lon,
            }
        }
        default:
            return state;
    }
}

//AC`s
export const setCurrentWeatherAC = (weather) => {
    return {type: 'SET_CURRENT_WEATHER', payload: weather}
};

//thunks
export const getCoordinates = (city) => {
    return async(dispatch, getState) => {
        return await getCoordinatesApi(city)
        .then((resp) => {
            if(resp.statusText == 'OK'){
                dispatch(getWeather(resp.data[0].lat, resp.data[0].lon));
            }
            else{
                console.log('error')
            }
        })
    }
}

export const getWeather = (lat, lon) => {
    return async(dispatch, getState) => {
        return await getWeatherApi(lat, lon)
        .then((resp) => {
            if(resp.statusText == 'OK'){
                const weather = {
                    backgroundStyle: resp.data.weather[0].main,
                    city: resp.data.name,
                    description: resp.data.weather[0].description,
                    temp: resp.data.main.temp,
                    clouds: resp.data.clouds.all,
                    humidity: resp.data.main.humidity,
                    wind: resp.data.wind.speed,
                    pressure: resp.data.main.pressure,
                    lat: resp.data.coord.lat,
                    lon: resp.data.coord.lon,
                }
                dispatch(setCurrentWeatherAC(weather));
                // console.log(resp.data);
            }
            else{
                console.log('error')
            }
        })
    }
}

export default weatherReducer;
