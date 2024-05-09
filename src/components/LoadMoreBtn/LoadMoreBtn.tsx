import React, { FC } from 'react';
import { MouseEventHandler } from 'react';
import css from './LoadMoreBtn.module.css';
type LoadMoreBtnProps = { loadMore: MouseEventHandler<HTMLButtonElement> };
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
//  {
//    images.length > 0 && (
//      <button onClick={loadMore} type="button">
//        Load more
//      </button>
//    );
//  }
