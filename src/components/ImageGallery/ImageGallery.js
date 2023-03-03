import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import css from './ImageGallery.module.css';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    searchValue: '',
    page: 1,
    items: [],
    isLoading: false,
    isLoadMoreBtnHidden: false,
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ page: 1 });
      if (this.state.page !== 1) {
        return;
      }
    }

    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true, isLoadMoreBtnHidden: false });

      const BASE_URL = 'https://pixabay.com/api/';
      const MY_KEY = '32804952-bc7fa4c68d10a619b16622bc9';
      try {
        const resp = await axios.get(
          `${BASE_URL}?q=${this.props.searchValue}&page=${this.state.page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
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
        {isLoading && (
          <div className={css.vortexWrapper}>
            <Loader />
          </div>
        )}

        <ul className={css.ImageGallery}>
          {items.map(item => (
            <ImageGalleryItem key={item.id} item={item} />
          ))}
        </ul>

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

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
