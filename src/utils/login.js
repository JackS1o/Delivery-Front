import axios from 'axios';
import {API_URL} from '../../env';

export const userInformarion = async (userInfo) => {
  console.log(userInfo.idToken);
  const {data} = await axios.post(`${API_URL}/api/v1/app/login-google`, {
    token: userInfo.idToken,
  });
  return data;
};
