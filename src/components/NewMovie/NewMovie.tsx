import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { pattern } from './ValidUrlPattern';

type Props = {
  onAdd: (movie: Movie) => void,
  movies: Movie[],
};

export const NewMovie:React.FC<Props> = ({ onAdd, movies }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isMovieValid = title && imgUrl && imdbUrl && imdbId;

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
  };

  const checkDuplicate = (
    newMovie: Movie,
    currentMovies: Movie[],
  ) => currentMovies.some(movie => movie.imdbId === newMovie.imdbId);

  const isValidUrl = (value: string) => !!value.match(pattern);

  const handleSubmit = () => {
    if (!isValidUrl(imgUrl) || !isValidUrl(imdbUrl)) {
      setImgUrl(!isValidUrl(imdbUrl) ? 'Invalid URL' : imgUrl);
      setImdbUrl(!isValidUrl(imdbUrl) ? 'Invalid URL' : imdbUrl);

      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (checkDuplicate(newMovie, movies)) {
      // eslint-disable-next-line no-alert
      alert('This movie is already added!');

      return;
    }

    onAdd(newMovie);
    setCount(current => current + 1);
    clearForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        required
        onChange={(newValue: string) => setTitle(newValue)}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue: string) => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={(newValue: string) => setImgUrl(newValue)}
        validate={isValidUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={(newValue: string) => setImdbUrl(newValue)}
        validate={isValidUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={(newValue: string) => setImdbId(newValue)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isMovieValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
