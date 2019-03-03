import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MovieItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <>
        <li className="Main__item" key={item.id}>
          <Link to={`/` + item.id}>
            <div className="Main__item-poster">
              {' '}
              {item.poster_path ? (
                <img
                  className="Main__item-poster-img"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt="poster"
                />
              ) : (
                <h3 className="Main__item-poster--unfound">{item.title}</h3>
              )}
              <div className="Main__item-poster-snippet-block-hide">
                <div className="Main__item-poster-snippet">
                  {item.overview || item.title}
                </div>
                <div>...</div>
              </div>
            </div>
            <div className="Main__item-info">
              <div className="Main__item-title">{item.title}</div>
              <div className="Main__item-year">
                {item.release_date.split('-')[0]}
              </div>
            </div>
          </Link>
        </li>
      </>
    );
  }
}
