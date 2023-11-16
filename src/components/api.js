import axios from 'axios';

export const fetchPrizes = async () => {
  const response = await axios.get('https://api.nobelprize.org/v1/prize.json');
  return response.data;
};