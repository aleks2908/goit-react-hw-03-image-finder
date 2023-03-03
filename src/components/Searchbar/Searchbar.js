import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import React, { Component } from 'react';
import { toast } from 'react-toastify';

// export const Searchbar = ({ searchValue }) => {
export class Searchbar extends Component {
  state = { searchValue: '' };

  handleChange = event => {
    // console.log(event.currentTarget.value);
    this.setState({
      searchValue: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    // console.log(event);
    event.preventDefault();
    if (this.state.searchValue.trim() === '') {
      // alert('123');
      toast.warn('Please enter something', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      return;
    }
    this.props.onSubmit(this.state.searchValue.trim());
    this.setState({ searchValue: '' });
  };

  // notify = () => toast('Wow so easy!');

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <span>
              <ImSearch className={css.buttonIcon} />
            </span>
          </button>

          <input
            onChange={this.handleChange}
            className={css.input}
            type="text"
            value={this.state.searchValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
