import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, openModal }) => {
  console.log(images);
  return (
    <ul className={css.galleryList}>
      {Array.isArray(images) &&
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

// return <p>'Nothing was found. Try to change your request 🤷‍♀️'</p>;
