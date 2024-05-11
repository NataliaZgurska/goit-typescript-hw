import React, { FC } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { IImage } from '../App/App.types';
import css from './ImageGallery.module.css';

type ImageGalleryProps = {
  images: IImage[] | null;
  openModal: (item: IImage | null) => void;
};
const ImageGallery: FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={css.galleryList}>
      {Array.isArray(images) &&
        images.length > 0 &&
        images.map(item => {
          return (
            <li className={css.galleryItem} key={item.id}>
              <ImageCard image={item} openModal={openModal} />
            </li>
          );
        })}
    </ul>
  );
};
export default ImageGallery;
