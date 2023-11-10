import axios from 'axios';
import {API_URL} from '../../env';

export const userInformarion = async (userInfo) => {
  const {data} = await axios.post(`${API_URL}/api/v1/app/login-google`, {
    token: userInfo.idToken,
  }).catch((error) => {
    console.log(error);
  });
  return data;
};
