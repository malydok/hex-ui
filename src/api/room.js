import { api } from './api';

export const createRoom = async () => {
  const response = await api.request('/room/create');
  const { roomId } = response.payload;
  return roomId;
};

export const getRoom = roomId => api.request(`/room/${roomId}`);

export const connectToRoom = async (roomId, onUpdate) => {
  await api.subscribe(`/room/${roomId}`, onUpdate);
  const response = await getRoom(roomId);
  return response.payload;
};
