import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// We should avoid circular dependencies
// This index.js file is being used/imported in App.js and vice versa
// What we can do is, we can create a separate API folder and move all the API/methods there.
import App from './App';

// In real application data will be fetched in a asynchronous way
// Use it like a async function with a Promise so that in future in can just update the data source
export function getWatchedMovies() {
	var movies = localStorage.getItem('movies-watched');

	if (!movies) {
		return [];
	} else {
		return JSON.parse(movies);
	}
}

// In real application data will be fetched in a asynchronous way
// Use it like a async function with a Promise so that in future in can just update the data source
export function getAllMovies() {
	var movies = localStorage.getItem('movies-all');

	if (!movies) {
		return [
		{
			title: 'The Avengers',
			image: 'http://d21lz9b0v8r1zn.cloudfront.net/wp-content/uploads//2012/03/detail.jpg',
			comment: 'New York blows up in this!'
		},
		{
			title: 'Dark City',
			image: 'https://i.chzbgr.com/full/5569379584/hA96709E0/',
			comment: 'This looks mysterious. Cool!'
		},
		{
			title: 'Hot Tub Time Machine',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7vNmphIcVhEcybvSvMgbTkV6EE2twHBNanKvgDx3ZS7Ivn6Dtg',
			comment: 'Someone said this was fun. Maybe!'
		},
		];
	} else {
		return JSON.parse(movies);
	}
}


// In real application data will be saved/stored in a asynchronous way
// Use it like a async function with a Promise
// Add method's responsibilty should be only adding not fetch + add
// Since we don't have real backend API at this point, what we can do is pass the modified data from the component and just store it here
// Another important thing is that, we should not explicitly call render method here
// React should update the UI when you use useState hook

export function add(title, description, image) {
	var movie = {};
	movie.title = title;
	movie.description = description;
	movie.image = image;

	var movies = getAllMovies();
	movies.push(movie);

	localStorage.setItem('movies-all', JSON.stringify(movies));

	render();
}


// In real application data will be saved/stored in a asynchronous way
// Use it like a async function with a Promise
// Add method's responsibilty should be only adding not fetch + add
// Since we don't have real backend API at this point, what we can do is pass the modified data from the component and just store it here
// Another important thing is that, we should not explicitly call render method here
// React should update the UI when you use useState hook
export function addWatchedMovie(title, description, image) {
	var movie = {};
	movie.title = title;
	movie.description = description;
	movie.image = image;

	var movies = getWatchedMovies();
	movies.push(movie);

	localStorage.setItem('movies-watched', JSON.stringify(movies));

	render();
}


// In real application data will be removed/stored in a asynchronous way
// Use it like a async function with a Promise
// Add method's responsibilty should be only adding not fetch + add
// Since we don't have real backend API at this point, what we can do is pass the modified data from the component and just store it here
// Another important thing is that, we should not explicitly call render method here
// React should update the UI when you use useState hook

export function removeWatchedMovie(title) {
	var movies = getWatchedMovies();

	// Instead of looping on every removal, use splice method and useState hook
	for (var i = 0; i < movies.length; i++) {
	   if (!movies[i]) continue;
		if (movies[i].title == title) {
			movies[i] = null
		}
	}

	localStorage.setItem('movies-watched', JSON.stringify(movies));

	render();
}

// Instead of wrapping it in render function, we can simplty use ReactDOM.render since it won't be reuse
function render() {
	ReactDOM.render(<App movies={getAllMovies()} watched={getWatchedMovies()} />, document.getElementById('root'))
}

render();
