import { api } from './api';

export const selectField = roomId => (rowIndex, fieldIndex) => () =>
  api.request({
    method: 'POST',
    path: `/room/${roomId}/select-field`,
    payload: {
      rowIndex,
      fieldIndex,
      client: api.id,
    },
  });
