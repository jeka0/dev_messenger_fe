import axios from 'axios';

const baseUrl = 'http://localhost:3020/api';

export const axiosInstance = axios.create({
  withCredentials: true,
});

export const getSessionFromStorage = () => {
    try{
        const data = localStorage.getItem('tokens');
        return data? JSON.parse(data) : "";
    }catch { return "" }
}

// фабрика создания запросов
export const request = async ({
  headers = {},
  method = 'GET',
  url,
  data,
  params,
}) => {
  // получили токен
  const { accessToken } = getSessionFromStorage() || {};
  // если есть токен то добавили его в header
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  // формируем параметры запроса
  const options = {
    headers,
    method,
    data,
    params,
    url: baseUrl + url,
  };

  try {
    // выполняем запрос
    const result = await axiosInstance(options);

    return result;
  } catch (error) {
    console.error(error);

    throw error;
  }
};