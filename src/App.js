import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Movies from './components/Movies';

import { addWatchedMovie, add, removeWatchedMovie, getWatchedMovies, getAllMovies } from './api';


function App() {
  const [movie, setMovie] = useState({
    title: '',
    imageUrl: '',
    comment: ''
  });
  const [allMovies, setAllMovies] = useState([]);
  const [allWatchedMovies, setAllWatchedMovies] = useState([]);

  const addMovies = ()=> {
    const allUpdatedMovies = [...allMovies, movie]
    setAllMovies(allUpdatedMovies);
    add({
      movies: allUpdatedMovies
    });
  }

  const addWatchList = useCallback((watchedMovie)=> {
    console.log(watchedMovie);
    const updatedWatchedMovies = [...allWatchedMovies, watchedMovie]
    setAllWatchedMovies(updatedWatchedMovies);
    addWatchedMovie({
      movies: updatedWatchedMovies
    });
  }, [allWatchedMovies])

  const removeWatchList = useCallback((watchedMovie, movieIndex)=> {
    const removedMovies = allWatchedMovies?.splice(movieIndex, 1);
    console.log('Removed Movie', removedMovies)
    setAllWatchedMovies([...allWatchedMovies]);
    removeWatchedMovie({
      movies: allWatchedMovies
    });
  }, [allWatchedMovies])

  useEffect(()=> {
    const getData = ()=> {
      const allMovies = getAllMovies();
      const allWatchedMovies = getWatchedMovies();

      setAllMovies(allMovies);
      setAllWatchedMovies(allWatchedMovies);
    }
    getData();
  }, [])

  return (
    <div className="App">
      <h1>Codest Movies!</h1>
      <h1>Add movie!</h1>

      <form onSubmit={(e)=> {
        e.preventDefault();
        addMovies();
      }}>
        <b>TITLE:<br /><input type="text" required onChange={(e)=> setMovie({...movie, title: e.target.value})} /></b><br />
        <b>IMAGE URL:<br /><input type="url" required onChange={(e)=> setMovie({...movie, imageUrl: e.target.value})} /></b><br />
        <b>COMMENT:<br /><input type="text" onChange={(e)=> setMovie({...movie, comment: e.target.value})} /></b><br />

        <button className='button' type="submit">ADD MOVIE</button>
      </form>


      <h1>Watchlist:</h1>


      <Movies movies={allMovies} handleClick={addWatchList} />

      <h1>Already watched:</h1>

      <Movies movies={allWatchedMovies} handleClick={removeWatchList} />
    </div>
  );
}

export default App;
