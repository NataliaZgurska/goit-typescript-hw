import { useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { getImagesByQuery } from '../../services/api';
import { IImage } from './App.types';

function App() {
  const [images, setImages] = useState<IImage[] | null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<IImage | null>(null);

  const fetchImages = async (query: string, page: number) => {
    try {
      setIsLoading(true);
      setIsError(false);

      type ApiResponse = {
        total_pages: number;
        results: IImage[];
      };
      const data = await getImagesByQuery<ApiResponse>(query, page);

      setImages(prevImages =>
        prevImages ? [...prevImages, ...data.results] : data.results
      );

      setTotalPages(data.total_pages);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
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

  const openModal = (item: IImage | null) => {
    if (item !== null) {
      setModalIsOpen(true);
      setModalImg(item);
      document.body.classList.add('modal-open');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <>
      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      {isError && <ErrorMessage />}
      {images !== null && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {totalPages > page && <LoadMoreBtn loadMore={loadMore} />}
      {isLoading && <Loader />}
      <ImageModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        modalImg={modalImg}
      />
    </>
  );
}

export default App;
