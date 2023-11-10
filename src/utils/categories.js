import axios from 'axios';
import { API_URL } from '../../env';

export const getcategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/app/categories/partner/654aab76f8e3ccd6dfe3926a`)
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}