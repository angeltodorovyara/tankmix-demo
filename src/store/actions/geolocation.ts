import * as actionTypes from './actionTypes';

export const getLocationWeather = () => {
    return (dispatch: any) => {
        navigator.geolocation.getCurrentPosition((position: any) => {
            const baseURL: string = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition'
            const apiKey: string = 'OlQZWfzAJd52tODy4jquHVS9GGIoC3Dy'
            const language: string = localStorage.getItem('i18nextLng') || 'en';
            const coordinates: string = `${position.coords.latitude},${position.coords.longitude}&language=${language}`;
            // fetch(`${baseURL}/search?apikey=${apiKey}&q=${coordinates}`)
            //     .then(res => res.json())
            //     .then(res => {
            //         const location: string = `${res.LocalizedName}, ${res.Country.LocalizedName}`;
            //         fetch(`https://dataservice.accuweather.com/currentconditions/v1/${res.Key}?apikey=${apiKey}&language=${language}`)
            //             .then(res => res.json())
            //             .then(res => {
            //                 const weather: string = `${res[0].WeatherText}&${res[0].Temperature.Metric.Value} C`;
            //                 dispatch(getLocationWeatherSuccess(location, weather))
            //             })
            //             .catch(err => dispatch(getLocationWeatherFailed()))
            //     })
            //     .catch(err => dispatch(getLocationWeatherFailed()))
        }, () => dispatch(getLocationWeatherFailed()), { enableHighAccuracy: true });
    }
}

const getLocationWeatherSuccess = (location: string, weather: string) => {
    return {
        type: actionTypes.GEOLOCATION_SUCCESS,
        location,
        weather
    }
}

const getLocationWeatherFailed = () => {
    return {
        type: actionTypes.GEOLOCATION_FAILED
    }
}