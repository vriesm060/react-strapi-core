import React, { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import c from 'classnames';

import { getCollection } from '../../state/Collection';
import { CollectionType } from '../../types';

interface Props {
  type: string;
  fields?: string[];
  exclude?: boolean;
  children: (collection: CollectionType) => ReactNode;
};

const Collection: React.FC<Props> = ({ type, fields, exclude, children }) => {
  const { status, data, error } = useQuery(['collection', type], () => {
    return getCollection(type, fields, exclude);
  });

  const classNames = c(
    'Collection',
    `Collection--${type}`,
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

export default Collection;