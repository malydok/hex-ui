import Nes from '@hapi/nes/lib/client';

export const api = new Nes.Client('ws://localhost:3000');

export const connect = async () => {
  await api.connect();
};
