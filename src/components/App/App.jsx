import React, { Component } from 'react';
import 'modern-normalize';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import { Button } from '../Button/Button';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    items: [],
    isLoading: false,
    isLoadMoreBtnHidden: false,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true, isLoadMoreBtnHidden: false });

      const BASE_URL = 'https://pixabay.com/api/';
      const MY_KEY = '32804952-bc7fa4c68d10a619b16622bc9';
      try {
        const resp = await axios.get(
          `${BASE_URL}?q=${this.state.searchValue}&page=${this.state.page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        let totalHits = resp.data.totalHits;

        if (totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            }
          );
          this.setState({ isLoading: false, items: [] });
          return;
        } else {
          if (this.state.page === 1) {
            this.setState({ items: [...resp.data.hits] });
          } else {
            this.setState(prevState => ({
              items: [...prevState.items, ...resp.data.hits],
            }));
          }

          this.setState({ isLoading: false });
        }

        if (this.state.page * 12 >= totalHits) {
          this.setState({ isLoadMoreBtnHidden: true });
          toast.success("You've reached the end of search results.", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleFormSubmit = searchValue => {
    this.setState({ searchValue, page: 1 });
  };

  btnLoadMoreClick = () => {
    this.setState({ isLoading: true });
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { items, isLoading, isLoadMoreBtnHidden } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && (
          <div className={css.vortexWrapper}>
            <Loader />
          </div>
        )}

        <ImageGallery items={items} />

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

        {items.length !== 0 && (
          <div hidden={isLoadMoreBtnHidden} className={css.vortexWrapper}>
            {!isLoading ? (
              <Button onClick={this.btnLoadMoreClick} />
            ) : (
              <Loader />
            )}
          </div>
        )}
      </>
    );
  }
}
