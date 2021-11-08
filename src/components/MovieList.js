import React, {forwardRef, useContext} from "react";
import '../App.scss';
import '../styles/_global.scss';
import Movie from "./Movie";
import {StoreContext} from "../utils/store";

const MovieList = forwardRef((props, lastMovieRef) => {


    const {movies} = useContext(StoreContext);
    return (
        <section className="basic-grid">
            {
                movies.length > 0 &&
                movies.map((movie, index) => {
                    if (movies.length === index + 1)
                        return <Movie key={`${movie.id}-${movie.name}`} ref={lastMovieRef} movie={movie}/>
                    else
                        return <Movie key={`${movie.id}-${movie.name}`} movie={movie}/>
                })
            }
        </section>
    )
})

export default MovieList;