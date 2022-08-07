import React, { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import c from 'classnames';

import { getSingle } from '../../state/Single';
import { Entity } from '../../types';

interface Props {
  type: string;
  id?: number;
  fields?: string[];
  exclude?: boolean;
  children: (entity: Entity) => ReactNode;
};

const Single: React.FC<Props> = ({ type, id, fields, exclude, children }) => {
  const { status, data, error } = useQuery(['single', type, id], () => {
    return getSingle(type, id, fields, exclude);
  });

  console.log(data);

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