import { request } from "./requestService";

export const getMessages = async (page, limit) => {
    const { data } = await request({
        method: 'GET',
        url: `/message/messages/?page=${page}&limit=${limit}`
    });

    return data;
}
  
export const getMessageById = async (id) => {
  const { data } = await request({
      method: 'GET',
      url: `/message/${id}`
  });

  return data;
}

export const getAllMessages = async () => {
    const { data } = await request({
        method: 'GET',
        url: `/message/all/`
    });

    return data;
}

export const updateMessage = async (body)=>{
    await request({
      method: 'PUT',
      url: `/message`,
      data: body
    });
}

export const deleteMessage = async ()=>{
    await request({
      method: 'DELETE',
      url: `/message`
    });
}
