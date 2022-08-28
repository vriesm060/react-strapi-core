import { API_URL, GENERIC_FIELDS } from '../../config/constants';
import { Entity } from '../../types';

/**
 * Fetches a single entity of a Strapi content type.
 * 
 * @param {string} type - Strapi content type.
 * @param {number} id - Optional ID of the entity.
 * @param {string[]} fields - Optional scalar type fields (e.g. strings, dates, numbers, booleans, etc.).
 * @param {string[]} populate - Optional Strapi specific types (e.g. media, relation, component, dynamiczone, etc.).
 * @returns {Entity} - Entity object.
 */
export const getSingleEntity = (type: string, id?: number, fields: string[] = [], populate: string[] = []) => {
  // Generate the field params combining the generic fields and the specified fields.
  const fieldParams = fields
    .concat(GENERIC_FIELDS)
    .map((value, i) => `fields[${i}]=${value}`)
    .join('&');
  
  // Generate the populate params if they are specified, otherwise fetch them all.
  const populateParams = populate.length > 0
    ? populate
      .map((value, i) => `populate[${i}]=${value}`)
      .join('&')
    : 'populate=%2A';
  
  // Generate the url.
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