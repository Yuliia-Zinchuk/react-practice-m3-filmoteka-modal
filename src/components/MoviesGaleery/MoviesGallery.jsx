export const MoviesGallery = ({ movies, deleteMovies, openModal }) => {
  return (
    <ul>
      {movies.map(({ id, title, votes, image }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Votes:{votes}</p>
            <button
              type="button"
              onClick={() => {
                openModal({ src: image, alt: title });
              }}
            >
              Open poster
            </button>
            <button
              type="button"
              onClick={() => {
                deleteMovies(id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
