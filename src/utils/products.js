import axios from 'axios';
import { API_URL } from '../../env';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/app/products/partner/6543f0512f79c9c684582d92`)
    return response;
  } catch (error) {
    console.log(error);
  }
}