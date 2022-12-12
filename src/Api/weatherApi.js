import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/',
})



export const getCoordinatesApi = (city) => {
    return instance.get(`geo/1.0/direct?q=${city}&limit=1&appid=1bb607bb667c4ffb929aa76af5233b5f`);
}

export const getWeatherApi = (lat, lon) => {
    return instance.get(`data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=1bb607bb667c4ffb929aa76af5233b5f`);
}