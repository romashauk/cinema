import React, { Component } from 'react';

export default class Pagination extends Component {
  paginationItems = [];

  createPaginationBtns = () => {
    this.paginationItems = [];
    for (let i = this.props.currentPage; i < this.props.currentPage + 5; i++) {
      this.paginationItems.push(i);
    }
    for (let i = this.props.currentPage; i >= this.props.currentPage - 5; i--) {
      this.paginationItems.unshift(i);
    }

    this.paginationItems = this.paginationItems.filter((item, index) => {
      if (
        this.paginationItems.indexOf(item) === index &&
        item > 1 &&
        item < this.props.quantityPages - 1
      ) {
        return true;
      }
    });
  };

  render() {
    const {
      getFilm,
      currentPage,
      quantityPages,
      sort,
      searchQuery,
      id,
    } = this.props;
    this.createPaginationBtns();
    return (
      <>
        <div className="Pagination">
          <div className="Pagination__nav">
            <button
              className="Pagination__nav-btn front"
              disabled={currentPage === 1 ? true : false}
              onClick={() => {
                getFilm(currentPage - 1, searchQuery, id, sort);
              }}
            >
              Prev
            </button>
            <div
              className={`Pagination__nav-btn ${
                currentPage === 1 ? 'Pagination__nav-btn--active' : ''
              }`}
              onClick={() => {
                getFilm(1, searchQuery, id, sort);
              }}
            >
              1
            </div>

            {currentPage >= 5 ? (
              <div className="Pagination__nav-btn">...</div>
            ) : (
              ''
            )}
            {this.paginationItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`Pagination__nav-btn ${
                    currentPage === item ? 'Pagination__nav-btn--active' : ''
                  }`}
                  onClick={() => {
                    getFilm(item, searchQuery, id, sort);
                  }}
                >
                  {item}
                </div>
              );
            })}

            {currentPage <= quantityPages - 5 ? (
              <div className="Pagination__nav-btn">...</div>
            ) : (
              ''
            )}

            <div
              hidden={this.paginationItems.length === 0}
              className={`Pagination__nav-btn ${
                currentPage === quantityPages
                  ? 'Pagination__nav-btn--active'
                  : ''
              }`}
              onClick={() => {
                getFilm(this.props.quantityPages, searchQuery, id, sort);
              }}
            >
              {quantityPages}
            </div>
            <button
              className="Pagination__nav-btn front"
              disabled={currentPage === quantityPages ? true : false}
              onClick={() => {
                getFilm(currentPage + 1, searchQuery, id, sort);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}
