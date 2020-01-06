import Nes from '@hapi/nes/lib/client';

export const api = new Nes.Client('ws://localhost:3000');

const sessionId = window.sessionStorage.getItem('clientId');
if (!sessionId) {
  window.sessionStorage.setItem('clientId', api.id);
}

export const clientId = sessionId || api.id;
