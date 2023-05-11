import { request } from "./requestService";

export const getUserEducations = async (id) => {
  const { data } = await request({
      method: 'GET',
      url: `/education/user/${id}`
  });

  return data;
}

export const createEducation = async (body) => {
  await request({
    method: 'POST',
    url: '/education/create',
    data: body,
  });
};

export const deleteEducation = async (id) =>{
  await request({
    method: 'DELETE',
    url: `/education/${id}`
  });
}
