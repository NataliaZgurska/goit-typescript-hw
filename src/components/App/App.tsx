import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';
import { getImagesByQuery } from '../../services/api';
import { IImage } from './App.types';

function App() {
  const [images, setImages] = useState<IImage[] | null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [btnLoadMore, setBtnLoadMore] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<IImage[] | null>(null);

  useEffect(() => {
    if (query.length === 0) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await getImagesByQuery(query, page);
        setImages(prevImages =>
          prevImages ? [...prevImages, ...data.results] : data.results
        );

        setBtnLoadMore(data.total_pages > page);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onSetSearchQuery = (searchTerm: string) => {
    setQuery(searchTerm);
    setIsError(false);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (id: string) => {
    if (images !== null) {
      setModalImage(images ? images.filter(image => image.id === id) : null);
      setModalIsOpen(true);
      document.body.classList.add('modal-open');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <>
      <SearchBar onSetSearchQuery={onSetSearchQuery} toast={toast} />
      {isError && <ErrorMessage />}
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {btnLoadMore && <LoadMoreBtn loadMore={loadMore} images={images} />}
      <ImageModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        modalImage={modalImage}
      />
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}

export default App;
