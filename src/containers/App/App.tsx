import React from 'react';
import c from 'classnames';

import { Single } from '../../components';

const App = () => {
  const className = c('App');

  return (
    <div className={className}>
      <Single type="complaints" id={1}>
        {(entity) => (
          <div>Single of type {entity.type} and id {entity.id}</div>
        )}
      </Single>
    </div>
  );
};

export default App;
