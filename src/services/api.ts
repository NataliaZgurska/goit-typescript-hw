import axios from 'axios';

const MY_ACCESS_KEY = 'r5X1Oa10oS9-BERhXbh0nWixL3GFYc5WhGNcDvhdj7k';
axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${MY_ACCESS_KEY}`;

export const getImagesByQuery = async <T>(
  query: string,
  page = 1,
  per_page = 12
): Promise<T> => {
  const { data } = await axios.get('search/photos', {
    params: { query, page, per_page },
  });
  console.log('api', data);
  return data;
};
