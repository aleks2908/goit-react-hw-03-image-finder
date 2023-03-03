import css from './ImageGallery.module.css';
import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Vortex } from 'react-loader-spinner';
import { Button } from '../Button/Button';

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
      console.log('зміна пошуку на ', this.props.searchValue);
      this.setState({ page: 1 });
      if (this.state.page !== 1) {
        return;
      }
    }

    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevState.page !== this.state.page
    ) {
      //   console.log('prevProps.page', prevProps.page);
      //   console.log('this.props.page', this.props.page);

      console.log('prevState.page', prevState.page);
      console.log('this.state.page', this.state.page);

      console.log('**отрисовка**');

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
          //   alert('ПЕРЕБОР!!!');
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
    // console.log('btnLoadMoreClick');
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const items = this.state.items;
    // console.log('items: ', items);
    // console.log(this.state.items.length);

    return (
      <>
        {/* {this.state.showModal && <Modal />} */}
        {this.state.isLoading && (
          <div className={css.vortexWrapper}>
            <Vortex
              visible={true}
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
          </div>
        )}
        <ul className={css.ImageGallery}>
          {items.map(item => (
            <ImageGalleryItem
              key={item.id}
              //   onImageClick={this.onImageClick}
              item={item}
            />
          ))}
        </ul>

        {this.state.items.length !== 0 && (
          <div
            hidden={this.state.isLoadMoreBtnHidden}
            className={css.vortexWrapper}
          >
            {!this.state.isLoading ? (
              <Button
                // disabled={this.state.isLoadMoreBtnDisable}
                onClick={this.btnLoadMoreClick}
              />
            ) : (
              <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
              />
            )}
          </div>
        )}
      </>
    );
  }
}
