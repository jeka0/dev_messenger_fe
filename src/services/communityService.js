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

export const deleteCommunity = async (id) =>{
  await request({
    method: 'DELETE',
    url: `/community/${id}`
  });
}

export const joinUserToCommunity = async (id)=>{
  const { data } =await request({
    method: 'POST',
    url: `/community/join/${id}`
  });

  return data;
}

export const leaveUserTheCommunity = async (id)=>{
  const { data } =await request({
    method: 'POST',
    url: `/community/leave/${id}`
  });

  return data;
}
