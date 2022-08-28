import { API_URL } from '../../config/constants';
import { Entity } from '../../types';

export const getSingle = (
  type: string,
  id?: number,
  fields: string[] = [],
  populate: string[] = [],
) => {
  const metaFields = ['createdAt', 'updatedAt', 'publishedAt'];
  const fieldParams = fields.concat(metaFields).map((value, i) => `fields[${i}]=${value}`).join('&');
  const populateParams = populate.length > 0 ? populate.map((value, i) => `populate[${i}]=${value}`).join('&') : 'populate=%2A';
  const url = API_URL + '/' + type + (id ? '/' + id : '') + '?' + fieldParams + '&' + populateParams;

  return fetch (url)
    .then((response) => response.json())
    .then(({ data, error }): Entity => {
      if (!data || error) {
        throw error.message;
      }

      return {
        type,
        id: data.id,
        ...data.attributes,
      };
    })
    .catch((error) => {
      throw new Error(error);
    })
};