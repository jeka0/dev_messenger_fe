import { request } from "./requestService";

export const getUserSkills = async (id) => {
  const { data } = await request({
      method: 'GET',
      url: `/skill/user/${id}`
  });

  return data;
}

export const createSkill = async (body) => {
  await request({
    method: 'POST',
    url: '/skill/create',
    data: body,
  });
};

export const deleteSkill = async (id) =>{
  await request({
    method: 'DELETE',
    url: `/skill/${id}`
  });
}
