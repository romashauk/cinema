import React, { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div className="loader__container">
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
