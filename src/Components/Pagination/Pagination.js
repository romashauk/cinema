import React, { Component } from 'react';

export default class Pagination extends Component {
  render() {
    const {
      getFilm,
      currentPage,
      quantityPages,
      sort,
      searchQuery,
      id,
    } = this.props;
    const buttons = [];
    const start = Math.max(1, currentPage - 5);
    const end = Math.min(quantityPages, currentPage + 5);

    for (let i = start; i < end; i++) {
      buttons.push(i);
    }

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
            {currentPage !== 1 && currentPage > 6 ? (
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
            ) : null}

            {currentPage >= 7 ? (
              <div className="Pagination__nav-btn">...</div>
            ) : (
              ''
            )}
            {buttons.map((item, index) => {
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
              hidden={buttons.length === 0}
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
