import css from './Modal.module.css';
import React, { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      //   console.log('EscapeEscapeEscape');
      this.props.onClose();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

    handleBackdropClick = e => {
    //   console.log('handleBackdropClick');
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={this.props.image} alt={this.props.tags} />
        </div>
      </div>
    );
  }
}
