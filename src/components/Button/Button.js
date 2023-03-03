import css from './Button.module.css';

export const Button = props => {
  // console.log(id);
  return (
    <button
      // disabled={props.disabled}
      onClick={props.onClick}
      className={css.Button}
      type="button"
    >
      Load more
    </button>
  );
};
