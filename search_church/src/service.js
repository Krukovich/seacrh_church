import { CITY_INFO_KEY } from './constants';

export const getData = async (latitude, longitude) => {
  const response = await fetch(`https://apiv4.updateparishdata.org/Churchs/?lat=${ latitude }&long=${ longitude }&pg=1`);
  const data = await response.json();
  return data;
}

export const getCityInfo = async (cityName) => {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${ CITY_INFO_KEY }&q=${ cityName }`);
  const data = await response.json();
  return data;
}
