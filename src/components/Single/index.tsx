import React, { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import c from 'classnames';

import { getSingleEntity } from '../../state/Single';
import { Entity } from '../../types';

interface Props {
  type: string;
  id?: number;
  fields?: string[];
  populate?: string[];
  children: (entity: Entity) => ReactNode;
};

const Single: React.FC<Props> = ({ type, id, fields, populate, children }) => {
  const { status, data, error } = useQuery(['single', type, id], () => {
    return getSingleEntity(type, id, fields, populate);
  });

  const classNames = c(
    'Single',
    `Single--${type}`,
    (id && `Single--${type}--${id}`),
  );

  return (
    <div className={classNames}>
      {status === 'loading' && (
        <div>Loading...</div>
      )}
      {status === 'error' && (
        <div>Error...</div>
      )}
      {status === 'success' && (
        children(data)
      )}
    </div>
  );
};

export default Single;