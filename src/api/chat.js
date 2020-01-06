import { api } from './api';

export const sendMessage = roomId => message =>
  api.request({
    method: 'POST',
    path: `/room/${roomId}/add-message`,
    payload: {
      message,
      client: api.id,
    },
  });
