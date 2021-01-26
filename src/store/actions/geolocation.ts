import * as actionTypes from './actionTypes';

export const getLocationWeather = () => {
    return (dispatch: any) => {
        navigator.geolocation.getCurrentPosition((position: any) => {
            const language: string = localStorage.getItem('i18nextLng') || 'en';
            const coordinates: string = `${position.coords.latitude},${position.coords.longitude}&language=${language}`;
            fetch(`${process.env.REACT_APP_URL_LOCATION}?apikey=${process.env.REACT_APP_APIKEY}&q=${coordinates}`)
                .then(res => res.json())
                .then(res => {
                    const location: string = `${res.LocalizedName}, ${res.Country.LocalizedName}`;
                    fetch(`${process.env.REACT_APP_URL_CONDITIONS}/${res.Key}?apikey=${process.env.REACT_APP_APIKEY}&language=${language}`)
                        .then(res => res.json())
                        .then(res => {
                            const weather: string = `${res[0].WeatherText}&${res[0].Temperature.Metric.Value} C`;
                            dispatch(getLocationWeatherSuccess(location, weather))
                        })
                        .catch(err => dispatch(getLocationWeatherFailed()))
                })
                .catch(err => dispatch(getLocationWeatherFailed()))
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