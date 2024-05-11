import React, { FC } from 'react';
import Modal from 'react-modal';
import { IImage } from '../App/App.types';
import css from './ImageModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

type ImageModalProps = {
  closeModal: () => void;
  modalIsOpen: boolean;
  modalImg: IImage | null;
};

const ImageModal: FC<ImageModalProps> = React.memo(
  ({ closeModal, modalIsOpen, modalImg }) => {
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {modalImg && (
            <div>
              <div className={css.imgContainer}>
                <img
                  className={css.modalImg}
                  src={modalImg.urls.regular}
                  alt={modalImg.alt_description}
                />
              </div>
              <p className={css.modalDescription}>{modalImg.alt_description}</p>
            </div>
          )}
        </Modal>
      </div>
    );
  }
);

export default ImageModal;
