import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

class MovieDetails extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(actions.getMovieById(id));
  }
  render() {
    const { movieById, getFilm } = this.props;
    if (!this.props.moviesLoading || !movieById) {
      return <Loader />;
    }
    if (this.props.moviesLoading && movieById) {
      return (
        <section className="details">
          <div className="container">
            <Link className="details__btn" onClick={() => getFilm(1)} to={`/`}>
              <button>Back</button>
            </Link>
            {movieById.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w400${movieById.poster_path}`}
                alt="poster"
              />
            ) : (
              <div className="details__poster">
                <h2>{movieById.title}</h2>
              </div>
            )}

            <div className="details__information">
              <div className="details__title">
                <h2>Name:</h2>
                <p>{movieById.title}</p>
              </div>
              <div className="details__title">
                <h2>Year:</h2>
                <p>{movieById.release_date.split('-')[0]}</p>
              </div>
              <div className="details__title">
                <h2>Country:</h2>
                <p>
                  {typeof movieById['production_countries'] == !undefined
                    ? movieById.production_countries[0].name
                    : false}
                </p>
              </div>
              <div className="details__title">
                <h2>Runtime:</h2>
                <p>{movieById.runtime} min</p>
              </div>
              <div className="details__title">
                <h2>Genres:</h2>
                <p>
                  {movieById.genres.map(item => {
                    return <div key={item.id}>{item.name}</div>;
                  })}
                </p>
              </div>
            </div>
            <div className="main">
              <h2>About Movie:</h2>
              <p>{movieById.overview}</p>
            </div>
          </div>
        </section>
      );
    }
  }
}
const mapStateToProps = state => {
  const { movieById, moviesLoading, getFilm } = state;

  return {
    movieById,
    moviesLoading,
    getFilm,
  };
};
export default connect(mapStateToProps)(MovieDetails);
