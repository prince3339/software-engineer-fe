import React from 'react';
import './App.css';

import { addWatchedMovie, add, removeWatchedMovie, getWatchedMovies, getAllMovies } from './index.js';

// Move this component to a seprate file and define which props it accepts
const getMoviesComponents = (movies) => {
  // Instead of passing movies in this function, better to make this function a react component and get the data here
  // And store it using react state, better to use useState
  var components = [];

  movies.forEach(function(movie) {
    // Intead of pushing html elements to array, we should use react component and it's return method
    components.push(
      <div className="all">
        <div>
          {/* Try to write semantic html tag */}
          {/* Add alt attribute */}
          <img src={movie.image} height="100px" />
        </div>
        <span>
          {/* Since there is no route, instead of using anchor tag, use a button */}
          <a className="movie-watched" href="#" onClick={function() { addWatchedMovie(movie.title, movie.comment, movie.image) }}>
            {movie.title}
          </a>
        </span>
        <br />
        <span>
          {movie.comment}
        </span>
        <br />
        <br />
      </div>
    )
  })

  return components;
}

// Move this component to a seprate file and define which props it accepts
function getWatchedMoviesComponents(movies) {
  // Instead of passing movies in this function, better to make this function a react component and get the data here
  // And store it using react state, better to use useState
  var components = [];
 // Intead of pushing html elements to array, we should use react component and it's return method
  movies.forEach(function(movie) {
    components.push(movie && (
      <div className="watched">
        <div>
          {/* Try to write semantic html tag */}
          {/* Add alt attribute */}
          <img src={movie.image} height="100px" />
        </div>
        <span>
          {/* Since there is no route, instead of using anchor tag, use a button */}
          <a className="movie-watched" href="#" onClick={function() { removeWatchedMovie(movie.title) }}>
            {movie.title}
          </a>
        </span>
        <br />
        <span>
          {movie.comment}
        </span>
        <br />
        <br />
      </div>
    ))
  })

  return components;
}

function App(props) {
  return (
    <div className="App">
      <h1>Codest Movies!</h1>
      <h1>Add movie!</h1>
      
      {/* Since we are using a form, we should use html form element and wrap the inputs in it */}

      {/* in onChange method instead of storing value in a global variable, use react hook useState */}

      <b>TITLE:<br /><input type="text" onChange={function(e) { title = e.target.value; }} /></b><br />
      <b>IMAGE URL:<br /><input type="text" onChange={function(e) { image = e.target.value; }} /></b><br />
      <b>COMMENT:<br /><input type="text" onChange={function(e) { comment = e.target.value; }} /></b><br />

      {/* Since it's a button for better semantic element, use a button element and type can be submit if you use it inside a form */}
      <input type="button" onClick={function(e) { add(title, image, comment); }} value="ADD MOVIE" />

      <h1>Watchlist:</h1>

      {/* Instead of calling functions use a seprate react component for movies */}
      {getMoviesComponents(getAllMovies())}

      <h1>Already watched:</h1>

      {/* Instead of calling functions use a seprate react component for watched movies */}
      {getWatchedMoviesComponents(getWatchedMovies())}
    </div>
  );
}

// As we are using reactjs, we should not use global variable like this for storing data
// There is a better approach for that
// Better to use react state, use useState hook inside component
var title = '';
var image = '';
var comment = '';

export default App;
