import { request, getSessionFromStorage, axiosInstance } from "./requestService";

export const reqLogin = async (body) => {
  const { data } = await request({
    method: 'POST',
    url: '/auth/login',
    data: body,
  });
  localStorage.setItem('tokens', JSON.stringify(data));
};

export const reqRegister = async (body) => {
  await request({
    method: 'POST',
    url: '/auth/register',
    data: body,
  });
};

export const reqRefresh = async ()=>{
  const { refreshToken } = getSessionFromStorage() || {};

  const { data } = await request({
    method: 'POST',
    url: '/auth/refresh',
    data: { refreshToken },
  })

  localStorage.setItem('tokens', JSON.stringify(data));
  return data;
}

axiosInstance.interceptors.response.use(
  (res) => {
      return res;
  },
  async (err) => {
    const originalConfig = err.config;
    originalConfig.headers = { ...originalConfig.headers } ;
    
    if (err.response && err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
    
      try {
        const { accessToken } = await reqRefresh();
        originalConfig.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalConfig);
      } catch (_error) {
          return Promise.reject(err);
      }
    }
    
    return Promise.reject(err);
  }
);
