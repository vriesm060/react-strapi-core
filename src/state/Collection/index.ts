import { API_URL } from '../../config/constants';
import { CollectionType } from '../../types';

export const getCollection = (
  type: string,
  fields: string[] = [],
  exclude: boolean = false,
) => {
  const url = API_URL + '/' + type;

  return fetch (url)
    .then((response) => response.json())
    .then(({ data, error }): CollectionType => {
      if (!data || error) {
        throw error.message;
      }

      return {
        type,
        entities: data,
      };
    })
    .catch((error) => {
      throw new Error(error);
    });
};