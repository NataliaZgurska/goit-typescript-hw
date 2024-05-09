import { useEffect, useState } from 'react';

import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';
import { getImagesByQuery } from '../../services/api';
import { IImage } from './App.types';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

function App() {
  const [images, setImages] = useState<IImage[] | null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnLoadMore, setBtnLoadMore] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<IImage[] | null>(null);

  useEffect(() => {
    // if (query.length === 0) return;
    if (!query) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getImagesByQuery<{
          total_pages: number;
          results: IImage[];
        }>(query, page);
        setImages(prevImages =>
          // if (Array.isArray(prevImages)){}
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
    if (searchTerm !== query) {
      setQuery(searchTerm);
      setIsError(false);
      setImages(null);
      setPage(1);
      setTotalPages(0);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // type OpenModalType = (id: string) => void;
  const openModal = (id: string) => {
    if (images !== null) {
      setModalImage(images ? images.filter(image => image.id === id) : null);
      setModalIsOpen(true);
      document.body.classList.add('modal-open');
    }
  };

  // type CloseModalType = () => void;
  const closeModal = () => {
    setModalIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <>
      {/* <SearchBar onSetSearchQuery={onSetSearchQuery} toast={toast} /> */}
      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {images !== null && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {/* {btnLoadMore && <LoadMoreBtn loadMore={loadMore} images={images} />} */}
      {totalPages > page && <LoadMoreBtn loadMore={loadMore} />}
      <ImageModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        modalImage={modalImage}
      />
    </>
  );
}

export default App;
//   const fetchImages = async () => {
//     try {
//       setIsLoading(true);
//       const data = await getImagesByQuery(query, page);
//       setImages(prevImages =>
//         prevImages ? [...prevImages, ...data.results] : data.results
//       );

//       setBtnLoadMore(data.total_pages > page);
//     } catch (error) {
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   fetchImages();
// }, [query, page]);
