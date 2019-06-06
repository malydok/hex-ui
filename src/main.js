import App from './App.svelte';
import Nes from '@hapi/nes/lib/client';

const client = new Nes.Client('ws://localhost:3000');
const start = async () => {
  await client.connect();

  const response = await client.request('/room/create');
  const { roomId, playerId } = response.payload;

  client.subscribe(`/room/${roomId}`, update => {
    console.log(update);
  });
};
start();

const app = new App({
  target: document.body,
  props: {
    name: 'world',
  },
});

export default app;
