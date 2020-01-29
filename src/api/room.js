import { api } from './api';

export const createRoom = async () => {
  const { payload } = await api.request('/room/create');
  return payload.roomId;
};

export const getRoom = roomId => api.request(`/room/${roomId}`);

export const getRooms = () => api.request(`/room`);

export const connectToRoomList = onUpdate => api.subscribe(`/room`, onUpdate);
export const disconnectFromRoomList = () => api.unsubscribe(`/room`);

export const connectToRoom = (roomId, onUpdate) =>
  api.subscribe(`/room/${roomId}`, onUpdate);
export const disconnectFromRoom = roomId => api.unsubscribe(`/room/${roomId}`);
