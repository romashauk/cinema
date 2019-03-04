import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';

class MovieView extends Component {
  state = {
    currentPage: 1,
    quantityPage: 1000,
  };
  getFilm = (...args) => {
    this.props.dispatch(actions.getFilm(...args));
  };
  rateCreater = rate => {
    const rateRes = [];
    let rateRound = Math.floor(rate);
    for (let i = 0; i < rateRound; i++) {
      rateRes.push(1);
    }
    if (rate - rateRound >= 0.5) {
      rateRes.push(2);
    }
    if (Math.round(rate) < 9 || rate < 8) {
      let min = Math.ceil(9 - rate);
      for (let i = 0; i < min; i++) {
        rateRes.push(0);
      }
      if (rate - rateRound >= 0.5) {
        rateRes.pop();
      }
    }
    return (
      <>
        {rate === 0
          ? null
          : rateRes.map(item =>
              item === 1 ? (
                <i class="fas fa-star" />
              ) : <i class="fas fa-star-half-alt" /> || item === 0 ? (
                <i class="far fa-star" />
              ) : null
            )}
      </>
    );
  };
  componentDidMount() {
    const { dispatch, searchQuery, id, sort } = this.props;
    dispatch(actions.getFilm(this.state.currentPage, searchQuery, id, sort));
    dispatch(actions.getGenres());
  }
  render() {
    const { quantityPage } = this.state;
    const { results } = this.props.movies;
    const { moviesLoading, movies, genres } = this.props;
    if (!moviesLoading) {
      return <Loader />;
    }
    if (results) {
      return (
        <div className="container">
          <Header {...this.props} getFilm={this.getFilm} />
          <div className="wrapper">
            <Sidebar getFilm={this.getFilm} data={genres} {...this.props} />

            <div className="Main">
              <div className="Main__movies">
                {results.length !== 0 ? (
                  <ul className="Main__list">
                    {results.map(item => (
                      <MovieItem
                        {...this.props}
                        getFilm={this.getFilm}
                        key={item.id}
                        item={item}
                        voteAverage={item.vote_average}
                        rateCreater={this.rateCreater}
                      />
                    ))}
                  </ul>
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          </div>
          {movies.total_pages === 1 ? null : (
            <Pagination
              currentPage={movies.page}
              {...this.props}
              quantityPages={
                movies.total_pages > 1000 ? quantityPage : movies.total_pages
              }
              getFilm={this.getFilm}
            />
          )}
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  const {
    genres,
    movies,
    moviesLoading,
    moviesError,
    id,
    searchQuery,
    sort,
  } = state;

  return {
    movies,
    moviesLoading,
    moviesError,
    genres,
    id,
    searchQuery,
    sort,
  };
};
export default connect(mapStateToProps)(MovieView);
