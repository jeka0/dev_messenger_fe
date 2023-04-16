import { request } from "./requestService";

export const getChats = async () => {
    const { data } = await request({
        method: 'GET',
        url: `/chat/all`
    });

    return data;
}
  
export const getChatById = async (id) => {
  const { data } = await request({
      method: 'GET',
      url: `/chat/${id}`
  });

  return data;
}

export const createChat = async (body) => {
  await request({
    method: 'POST',
    url: '/chat/create',
    data: body,
  });
};
