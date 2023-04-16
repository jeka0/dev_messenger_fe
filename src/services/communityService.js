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
//
export const getUserPosts = async (id, page, limit) => {
  const { data } = await request({
      method: 'GET',
      url: `/post/posts/user/${id}/?page=${page}&limit=${limit}`
  });
  
  return data;
}
//
export const createPost = async (body) => {
  await request({
    method: 'POST',
    url: '/community/create',
    data: body,
  });
};
