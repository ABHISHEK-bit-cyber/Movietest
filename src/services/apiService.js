import axios from 'axios';

const API_BASE_URL = 'https://newsapi.org/v2/';
const API_KEY = '1d9149aa15034bf080d4d08b76f67990';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const constructUrl = (country, category, query, from, to, sortBy) => {
  let url = '';
  if(query) url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
  else url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  if (sortBy) url += `&sortBy=${sortBy}`;
  return url;
};

const fetchNews = async options => {
  try {
    const url = constructUrl(options.country, options.category, options.query, options.from, options.to, options.sortBy);
   
    const response = await apiService.get(url);
    return response.data.articles;
  } catch (error) {
    throw error;
  }
};

export {fetchNews};