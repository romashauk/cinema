import initialState from './initialState';
import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_GENRES_REQUEST,
  GET_GENRES_SUCCESS,
  GET_GENRES_FAILURE,
  GET_MOVIEBYID_FAILURE,
  GET_MOVIEBYID_SUCCESS,
  GET_MOVIEBYID_REQUEST,
} from './actions';

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_REQUEST:
      return {
        ...state,
        moviesLoading: false,
      };

    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.movies,
        moviesLoading: true,
        searchQuery: action.searchQuery,
        id: action.id,
        sort: action.sort,
      };

    case GET_MOVIES_FAILURE:
      return {
        ...state,
        moviesLoading: true,
        moviesError: action.error,
      };
    case GET_GENRES_REQUEST:
      return {
        ...state,
        moviesLoading: false,
      };

    case GET_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.genres,
        moviesLoading: true,
      };

    case GET_GENRES_FAILURE:
      return {
        ...state,
        moviesLoading: true,
        moviesError: action.error,
      };
    case GET_MOVIEBYID_REQUEST:
      return {
        ...state,
        moviesLoading: false,
      };

    case GET_MOVIEBYID_SUCCESS:
      return {
        ...state,
        movieById: action.movieById,
        moviesLoading: true,
      };

    case GET_MOVIEBYID_FAILURE:
      return {
        ...state,
        moviesLoading: true,
        moviesError: action.error,
      };

    default:
      return state;
  }
};
export default reducers;
