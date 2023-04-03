import { request } from "./requestService";

export const getUser = async ()=>{
    const { data } = await request({
      method: 'GET',
      url: '/user/'
    });
  
    return data;
}

export const getUserById = async (id)=>{
  const { data } = await request({
    method: 'GET',
    url: `/user/${id}`
  });
  
  return data;
}

export const updateUser = async (body)=>{
  await request({
    method: 'PUT',
    url: `/user`,
    data: body
  });
}
