import { FETCH_URL } from './constants';

export const getData = async () => {
  const response = await fetch(FETCH_URL);
  const data = await response.json();
  return data;
}

export const a = 2;