import Nes from '@hapi/nes/lib/client';

const api_url =
  process.env.NODE_ENV === 'production'
    ? 'https://api-hex.herokuapp.com'
    : 'ws://localhost:3000';

export const api = new Nes.Client(api_url);
