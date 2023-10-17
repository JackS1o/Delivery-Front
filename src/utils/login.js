import axios from 'axios';
import {API_URL} from '../../env';

export const userInformarion = async userInfo => {
  const {data} = await axios.post(`${API_URL}/api/v1/app/login`, {
    idInfo: userInfo.idInfo,
  });
  return data;
};
