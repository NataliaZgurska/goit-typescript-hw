import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useState,
} from 'react';
import { ChangeEvent, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

type SearchBarProps = { onSetSearchQuery: (query: string) => void };

const SearchBar: FC<SearchBarProps> = ({ onSetSearchQuery }) => {
  const [value, setValue] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const query = value.trim();
    if (!query.length) {
      toast.error('Please enter search query', {
        icon: '🤔 ✍️',
        style: {
          borderRadius: '10px',
          background: '#808080',
          color: 'yellow',
        },
      });
      return;
    }
    onSetSearchQuery(query);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <header className={css.headerContainer}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.formInput}
          type="text"
          value={value}
          onChange={handleChange}
          // autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" aria-label="Search" className={css.formBtn}>
          🔍
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={true} />
    </header>
  );
};

export default SearchBar;
