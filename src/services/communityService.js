import { request } from "./requestService";

export const getCommunitys = async () => {
    const { data } = await request({
        method: 'GET',
        url: `/community/all`
    });

    return data;
}
  
export const getCommunityById = async (id) => {
  const { data } = await request({
      method: 'GET',
      url: `/community/${id}`
  });

  return data;
}

export const createCommunity = async (body) => {
  await request({
    method: 'POST',
    url: '/community/create',
    data: body,
  });
};
