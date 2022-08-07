import { API_URL } from '../config/constants';
import { Entity } from '../types';

export const getSingle = (
  type: string,
  id: number | null = null,
  fields: string[] = [],
  exclude: boolean = false,
) => {
  const url = API_URL + '/' + type + (id ? '/' + id : '');

  return fetch (url)
    .then((response) => response.json())
    .then(({ data, error }): Entity => {
      if (!data || error) {
        throw error.message;
      }

      return {
        type,
        id,
        ...data.attributes,
      };
    })
    .catch((error) => {
      throw new Error(error);
    })
};