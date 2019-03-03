import React, { Component } from 'react';

export default class Header extends Component {
  state = {
    searchValue: '',
  };
  searchFilmByName = e => {
    this.setState({
      searchValue: e.target.value,
    });
  };
  render() {
    const { searchValue } = this.state;
    const { getFilm } = this.props;
    return (
      <div className="header">
        <div className="header__logo" onClick={() => getFilm(1)} />
        <form className="header__field">
          <input
            onChange={this.searchFilmByName}
            value={searchValue}
            type="text"
            placeholder="Search..."
          />
          <button
            onClick={e => {
              e.preventDefault();
              getFilm(1, searchValue);
            }}
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
