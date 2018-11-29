import axios from 'axios';

const axiosOrder = axios.create({
  baseURL: 'https://react-my-burger-c7122.firebaseio.com/'
});

export default axiosOrder;