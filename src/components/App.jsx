import { Component } from 'react';
// import movies from '../data/movies.json';
import { MoviesGallery } from './MoviesGaleery/MoviesGallery';
import { mapper } from 'utils/mapper';
import { Modal } from './Modal/Modal';
import { fetchApi } from 'api/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';
export class App extends Component {
  state = {
    // movies: mapper(movies),
    movies: [],
    currentImage: null,
    page: 1,
    isLoading: false,
    error: null,
    isShown: false,
  };

  // componentDidUpdate(_, prevState) {
  // const { movies } = this.state;
  // if (movies !== prevState.movies) {
  //   localStorage.setItem('movies', JSON.stringify(movies));
  // }
  // }

  componentDidUpdate(_, prevState) {
    const { isShown, page } = this.state;
    if ((prevState.isShown !== isShown && isShown) || prevState.page !== page) {
      this.fetchMovies();
    }
  }
  // componentDidMount() {
  //   const movies = localStorage.getItem('movies');
  //   if (movies) this.setState({ movies: JSON.parse(movies) });
  // }

  deleteMovie = idMovie => {
    const updateMovies = this.state.movies.filter(({ id }) => id !== idMovie);
    this.setState({
      movies: updateMovies,
    });
  };

  updateCurrentImage = data => {
    // console.log(data);
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  showFilms = () => {
    if (this.state.isShown) {
      this.setState({ movies: [] });
    }
    this.setState(prevState => ({ isShown: !prevState.isShown }));
  };

  fetchMovies = () => {
    const page = this.state.page;
    this.setState({ isLoading: true });

    fetchApi(page)
      .then(response =>
        this.setState(prevState => ({
          movies: [...prevState.movies, ...mapper(response.data.results)],
        }))
      )
      .catch(error => this.setState({ error: error.message }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { movies, currentImage, isShown, isLoading, error } = this.state;
    return (
      <>
        <Button
          text={!isShown ? 'Show movies' : 'Hide movies'}
          handlerClick={this.showFilms}
        />

        {isShown && (
          <>
            <MoviesGallery
              movies={movies}
              deleteMovies={this.deleteMovie}
              openModal={this.updateCurrentImage}
            />
            {!isLoading && !error && (
              <Button text="Load more" handlerClick={this.loadMore} />
            )}
            {isLoading && <Loader />}
            {error && <Notification message={error} />}
          </>
        )}
        {currentImage && (
          <Modal image={currentImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
