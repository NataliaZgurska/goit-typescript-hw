import React, { FC } from 'react';
import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader: FC = () => {
  const props = {
    visible: true,
    height: 80,
    width: 80,
    color: '#4fa94d',
    ariaLabel: 'oval-loading',
  };
  return (
    <div className={css.loader}>
      <Oval {...props} />
    </div>
  );
};

export default Loader;
