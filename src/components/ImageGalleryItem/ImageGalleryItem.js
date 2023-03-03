import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  // onImageClick = value => {
  //     // console.log('показать модалку');
  //     this.setState({ showModal: true });
  //     //   console.log(value);
  //     //   console.log(this.props.item.largeImageURL);
  //     //   console.log(this.props.item.tags);
  //     // this.setState({ isLoading: true });
  //     // console.log('btnLoadMoreClick');
  //     // this.setState(prevState => ({
  //     //   page: prevState.page + 1,
  //     // }));
  // };

  // export const ImageGalleryItem = ({
  //   onImageClick,
  //   item: { webformatURL, tags, largeImageURL },
  // }) => {
  //   // console.log(id);

  toggleModal = () => {
    // console.log(this.state.showModal);
    this.setState(state => ({
      showModal: !state.showModal,
    }));
    // console.log(this.state.showModal);
  };

    
  render() {
    return (
      <>
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            image={this.props.item.largeImageURL}
            tag={this.props.item.tags}
          />
        )}
        <li onClick={this.toggleModal} className={css.ImageGalleryItem}>
          <img
            className={css.ImageGalleryItemImage}
            src={this.props.item.webformatURL}
            alt={this.props.item.tags}
          />
        </li>
      </>
    );
  }
}
