import axios from 'axios';
import { API_URL } from '../../env';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/app/products/partner/654aab76f8e3ccd6dfe3926a`)
    return response;
  } catch (error) {
    console.log(error);
  }
}