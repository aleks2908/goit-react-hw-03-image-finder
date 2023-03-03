import React, { Component } from 'react';
import 'modern-normalize';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    searchValue: '',
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchValue={this.state.searchValue} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  }
}
