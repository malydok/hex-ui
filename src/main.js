import App from './App.svelte';
import Nes from '@hapi/nes/lib/client';

const client = new Nes.Client('ws://localhost:3000');
const start = async () => {
  await client.connect();
  client.subscribe('/', update => {
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
