import Nes from '@hapi/nes/lib/client';

const api_url =
  '__buildEnv__' === 'production'
    ? 'wss://api-hex.herokuapp.com/'
    : 'ws://localhost:3000';

export const api = new Nes.Client(api_url);
