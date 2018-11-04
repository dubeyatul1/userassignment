import * as ActionTypes from './ActionTypes'; 
import { baseUrl } from '../baseUrl';


export const countryLoading = () => ({
    type: ActionTypes.COUNTRIES_LOADING
});

export const loadCountrySuccess = (countries) => ({
    type: ActionTypes.LOAD_COUNTRIES_SUCCESS,
    countries
});
export const fetchCountries = () => (dispatch) => { 
    dispatch(countryLoading(true));
    return fetch(baseUrl+'countries/')
        .then(response => response.json())
        .then(countries => dispatch(loadCountrySuccess(countries)));
}