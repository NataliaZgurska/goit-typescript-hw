import React, { FC } from 'react';
import { IImage } from '../App/App.types';
import css from './ImageCard.module.css';

type ImageCardProps = {
  image: IImage;
  openModal: (item: IImage | null) => void;
};

const ImageCard: FC<ImageCardProps> = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image);
  };
  return (
    <div className={css.imgContainer}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={handleClick}
        className={css.imgPicture}
      />
    </div>
  );
};

export default ImageCard;
