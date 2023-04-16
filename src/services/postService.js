import { request } from "./requestService";

export const getPosts = async (page, limit) => {
    const { data } = await request({
        method: 'GET',
        url: `/post/posts/?page=${page}&limit=${limit}`
    });

    return data;
}
  
export const getPostById = async (id) => {
  const { data } = await request({
      method: 'GET',
      url: `/post/${id}`
  });

  return data;
}

export const getCommunityPosts = async (id) => {
  const { data } = await request({
      method: 'GET',
      url: `/post/community/${id}`
  });
  
  return data;
}

export const createPost = async (body) => {
  await request({
    method: 'POST',
    url: '/post',
    data: body,
  });
};

export const addLike = async (id)=>{
  const { data } = await request({
    method: 'PUT',
    url: `/post/like/${id}`,
  });

  return data;
}

export const deleteLike = async (id)=>{
  const { data } = await request({
    method: 'DELETE',
    url: `/post/like/${id}`,
  });
  
  return data;
}
