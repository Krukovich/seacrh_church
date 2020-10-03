import { FETCH_URL, CITY_INFO_KEY } from './constants';

export const getData = async () => {
  const response = await fetch(FETCH_URL);
  const data = await response.json();
  return data;
}

export const getCityInfo = async (cityName) => {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${ CITY_INFO_KEY }&q=${ cityName }`);
  const data = await response.json();
  return data;
}
