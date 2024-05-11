import React, { FC } from 'react';
import css from './LoadMoreBtn.module.css';

type LoadMoreBtnProps = {
  loadMore: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ loadMore }) => {
  return (
    <div className={css.btnContainer}>
      <button onClick={loadMore} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
