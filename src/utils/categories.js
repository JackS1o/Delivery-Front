import axios from 'axios';
import { API_URL } from '../../env';

export const getcategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/app/category/partner/652c364b91b66ee6366f608f`)
    return response;
  } catch (error) {
    console.log(error);
  }
}