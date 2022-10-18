import { Component } from 'react';
import style from '../Modal/Modal.module.css';
export class Modal extends Component {
  closeByEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEscape);
  }

  render() {
    const {
      image: { src, alt },
      closeModal,
    } = this.props;
    return (
      <div className={style.backdrop} onClick={this.closeByBackdrop}>
        <div className={style.modal}>
          <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
          <button
            className={style.closeButton}
            type="button"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}
