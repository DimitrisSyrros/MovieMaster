MovieMaster is a website that helps users find movies.

The objective was to create a movie catalog where users can check the movies of the week, 
search for movies and view details about them. 
The project was developed with create-react-app and had the Movie DB (MDB) JSON API for a data source. 
The global application state is created using React’s built-in features: React Hooks and the Context API. 
Styling was done with SCSS(CSS Grid, Flexbox).
The react-router-dom v6 is also used for navigating purposes.

In order for this project to run you need .env file
with the api key as a value for this variable REACT_APP_MOVIEDB_API_KEY

Basic Flows:
  
  Flow 1: In Theaters
MovieMaster implements “infinite scrolling”, meaning that It starts with a list of 20 movies (1 page) and each time users scroll near the bottom of the page another 20 movies are loaded and added to the list.
Each movie in the list is described by some basic information: {Poster, Title, Year of Release, Genre(s), Vote Average and Overview}

Movie Fetching
Movie fetching is implemented by a custom React Hook that is triggered either by search or by utilizing the Intersection Observer API which is used in the implementation of the infinite scrolling.

Genres Fetching
Genres are fetched separately as an object array with two values in each object an id and a name which has every available genre for the movie list. Each movie on the movie list has a list of genre ids which correspond to specific names on the aforementioned genre array for rendering to the user.
Genre fetching is triggered once for each session and then cached in sessionStorage for reducing API calls.
  
  Flow 2: Search for Movies

When users want to search for a movie, they just have to type part of its title inside the search box. Searching is triggered 500 mseconds after user’s last input. Infinite scrolling is implemented here as well. After searching for movies the user can be redirected to the in Theaters section either by clicking the Playing Now tab or by clearing the search box. Create React App has built-in Lodash, which has the debounce function that is used for this flow.

  Flow 3: View Movie Details

Either while searching for a specific title or browsing the “in theaters” movies, MovieMaster offers the ability to click on a movie in the list, expand it in place and view more information about it. Movie details provided are Video Trailer (if any), Reviews(up to 2) and similar Movies.

  Flow 4: WatchList
Users can add or remove movies from their watchlist by pressing the icon on the top right corner of each movie poster. They can also see all their movies saved on their watchlist by navigating to that page from the navbar. Moviemaster saves to the localStorage up to 20 movies that users may want to view later again.

  Flow 5: (Mini-Flow) Similar Movies
When a user is in movie details he can click one of the similar movies and automatically search for that movie title.
