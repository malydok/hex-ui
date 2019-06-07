import { api } from './api';

export const createRoom = async () => {
  const response = await api.request('/room/create');
  const { roomId } = response.payload;
  return roomId;
};

export const connectToRoom = async (roomId, onUpdate) => {
  api.subscribe(`/room/${roomId}`, onUpdate);
};
