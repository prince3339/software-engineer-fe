import React from "react";

const Movies = ({movies, handleClick}) => {
  return (
    <div className="movies-list">
      {movies?.map((movie, index) => (
        <div className="movie" key={movie.title}>
          <div>
            <img src={movie.image} height="100px" alt={movie.title}/>
          </div>
          <span>
            <button className="movie-title" onClick={()=> {
              handleClick(movie, index);
            }}>
              {movie.title}
            </button>
          </span>
          <br />
          <span>
            {movie.comment}
          </span>
          <br />
          <br />
        </div>
      ))}
    </div>
  )
}

export default Movies;
