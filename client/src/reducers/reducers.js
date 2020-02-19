import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_DIRECTORS, SET_GENRES } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      SET_FILTER:
        return action.value;
      default:
        return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function directors(state = [], action) {
  switch (action.type) {
    case SET_DIRECTORS:
      return action.value;
    default:
      return state;
  }
}

function genres(state = [], action) {
  switch (action.type) {
    case SET_GENRES:
      return action.value;
    default:
      return state;
  }
}

/*
function moviesApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    movies: movies(state.movies, action),
    directors: directors(state.directors, action),
    genres: genres(state.genres, action)
  }
}
*/

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  directors,
  genres
});

export default moviesApp;
