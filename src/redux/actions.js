export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE';
export const GET_GENRES_REQUEST = 'GET_GENRES_REQUEST';
export const GET_GENRES_SUCCESS = 'GET_GENRES_SUCCESS';
export const GET_GENRES_FAILURE = 'GET_MOVIES_FAILURE';
export const GET_MOVIEBYID_REQUEST = 'GET_MOVIEBYID_REQUEST';
export const GET_MOVIEBYID_SUCCESS = 'GET_MOVIEBYID_SUCCESS';
export const GET_MOVIEBYID_FAILURE = 'GET_MOVIEBYID_FAILURE';

export function getFilm(currentPage, searchQuery, id, sort) {
  const dataURl =
    !sort && !searchQuery
      ? `https://api.themoviedb.org/3/discover/movie?api_key=debadca3a2c163df2dfbed23bec2cb9f&language=en-US&sort_by=original_title.asc&include_adult=false&include_video=false&page=${currentPage}${
          id ? `&with_genres=${id}` : ''
        }`
      : `https://api.themoviedb.org/3${
          searchQuery ? `/search/movie` : '/discover' && sort ? '' : '/discover'
        }${
          sort && !searchQuery ? `/discover/movie` : ''
        }?api_key=debadca3a2c163df2dfbed23bec2cb9f&language=en-US&sort_by=${
          sort === 'top_rated'
            ? 'vote_average.desc'
            : 'original_title' ||
              (sort && sort !== 'top_rated' && sort === 'popular')
            ? 'popularity.desc'
            : 'original_title.asc'
        }&include_adult=false&include_video=false${
          searchQuery ? `&query=${searchQuery}` : ''
        }&page=${currentPage}${
          sort === 'top_rated' ? `&vote_count.gte=100` : ''
        }${id ? `&with_genres=${id}` : ''}`;
  return dispatch => {
    dispatch({ type: GET_MOVIES_REQUEST });

    fetch(dataURl)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failed to load Movies');
        }

        return response.json();
      })
      .then(dataJson => {
        dispatch({
          type: GET_MOVIES_SUCCESS,
          movies: dataJson,
          searchQuery,
          id,
          sort,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_MOVIES_FAILURE,
          error: error.message,
        });
      });
  };
}

export function getGenres() {
  const dataURl =
    'https://api.themoviedb.org/3/genre/movie/list?api_key=debadca3a2c163df2dfbed23bec2cb9f&language=en-US';
  return dispatch => {
    dispatch({ type: GET_GENRES_REQUEST });

    fetch(dataURl)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failed to load Movies');
        }

        return response.json();
      })
      .then(dataJson => {
        dispatch({
          type: GET_GENRES_SUCCESS,
          genres: dataJson,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_GENRES_FAILURE,
          error: error.message,
        });
      });
  };
}

export function getMovieById(id) {
  const dataURl = `https://api.themoviedb.org/3/movie/${id}?api_key=debadca3a2c163df2dfbed23bec2cb9f&language=en-US`;
  return dispatch => {
    dispatch({ type: GET_MOVIEBYID_REQUEST });

    fetch(dataURl)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failed to load Movies');
        }

        return response.json();
      })
      .then(dataJson => {
        dispatch({
          type: GET_MOVIEBYID_SUCCESS,
          movieById: dataJson,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_MOVIEBYID_FAILURE,
          error: error.message,
        });
      });
  };
}
