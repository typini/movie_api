export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_DIRECTORS = 'SET_DIRECTORS';
export const SET_GENRES = 'SET_GENRES';

export function setMovies(value) {
  return { type: SET_MOVIES, value  };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setDirectors(value) {
  return { type: SET_DIRECTORS, value };
}

export function setGenres(value) {
  return { type: SET_GENRES, value };
}
