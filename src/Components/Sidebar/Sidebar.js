import React, { Component } from 'react';
import Loader from '../Loader/Loader';
export default class Sidebar extends Component {
  render() {
    const { genres } = this.props.data;
    const { getFilm, id, sort } = this.props;
    if (!genres) {
      return <Loader />;
    }
    if (genres) {
      return (
        <div className="SideBar">
          <div className="sorted__btn">
            {' '}
            <button onClick={top_rated => getFilm(1, null, id, `top_rated`)}>
              Top Rated
            </button>
            <button onClick={popular => getFilm(1, null, id, 'popular')}>
              Popular
            </button>
          </div>

          <h2>Genres:</h2>
          <ul className="sideBarList">
            {this.props.data.genres.map(item => {
              return (
                <li
                  onClick={() => getFilm(1, null, item.id, sort)}
                  key={item.id}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}
