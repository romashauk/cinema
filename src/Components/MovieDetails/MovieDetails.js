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
  render() {
    const { movieById, moviesLoading } = this.props;
    if (!moviesLoading || !movieById) {
      return <Loader />;
    }
    if (moviesLoading && movieById) {
      return (
        <section className="details">
          <div className="container">
            <Link className="details__btn" to="/">
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
                <h2>Rate:</h2>
                <p className="details__rated">
                  {this.rateCreater(movieById.vote_average)}
                </p>
              </div>
              <div className="details__title">
                <h2>Country:</h2>
                <p>
                  {typeof movieById['production_countries'] == !undefined
                    ? movieById.production_countries[0].name
                    : false}
                </p>
              </div>
              {movieById.runtime ? (
                <div className="details__title">
                  <h2>Runtime:</h2>
                  <p>{movieById.runtime} min</p>
                </div>
              ) : null}

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
  const { movieById, moviesLoading } = state;

  return {
    movieById,
    moviesLoading,
  };
};
export default connect(mapStateToProps)(MovieDetails);
