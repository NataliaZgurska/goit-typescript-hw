import React, { FC } from 'react';
import { IImage } from '../App/App.types';
import css from './ImageCard.module.css';

type ImageCardProps = { image: IImage; openModal: (id: string) => void };

const ImageCard: FC<ImageCardProps> = ({ image, openModal }) => {
  console.log('image', image);
  return (
    <div className={css.imgContainer}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => openModal(image.id)}
        className={css.imgPicture}
      />
    </div>
  );
};

export default ImageCard;
