import React, {useState, useContext, useCallback} from "react";
import '../App.scss';
import '../styles/_global.scss';
import '../styles/movie.scss';
import '../styles/movie-search.scss';
import {StoreContext} from "../utils/store";
import _ from "lodash";

function MovieSearch() {
    const [movieName, setMovieName] = useState("")
    const {
        setMovieSearchName,
        setPageNo,
        setNowPlaying,

    } = useContext(StoreContext);


    const debouncedCallApi = useCallback(
        _.debounce((text) => {
            setNowPlaying(false)
            setPageNo(1)
            setMovieSearchName(text)
        }, 1000), []);

    const handleChange = event => {
        const {value: text} = event.target;
        setMovieName(text)
        debouncedCallApi(text)
    }

    return (
        <div className="search-container">
            <input name="movie"
                   className="movie-search"
                   placeholder="Search a movie"
                   type="text"
                   autoComplete="off"
                   onChange={e => handleChange(e)}
            />
        </div>
    );
}

export default MovieSearch;