import 'modern-normalize';
import { Searchbar } from '../Searchbar/Searchbar';
import React, { Component } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Vortex } from 'react-loader-spinner';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchValue: '',
    // page: 1,
  };

  handleFormSubmit = searchValue => {
    // console.log(searchValue);
    this.setState({ searchValue });
  };

  render() {
    // toast('Wow so easy!');
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchValue={this.state.searchValue}
          // page={1}
        />
        {/* <div className={css.vortexWrapper}>
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
        </div> */}
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
