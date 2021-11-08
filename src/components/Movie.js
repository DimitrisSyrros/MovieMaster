import React, {forwardRef, useState, useContext} from "react";
import '../App.scss';
import '../styles/_global.scss';
import {getMovieDetails} from "../utils/apicalls";
import {StoreContext} from "../utils/store";
import MovieBasicInfo from "./MovieBasicInfo";

const Movie = forwardRef(({movie}, lastMovieRef) => {
    const [trailerUrl, setTrailerUrl] = useState("")
    const [reviews, setReviews] = useState([])
    const [similar, setSimilar] = useState([])
    const [expand, setExpand] = useState(false)
    const {
        genres,
        setNowPlaying,
        setMovieSearchName,
        setPageNo
    } = useContext(StoreContext);

    function movieClicked() {
        if (expand === false) {
            getMovieDetails(movie.id).then((response) => {
                setReviews(response.reviews.total_results !== 0 ? response.reviews.results.slice(0, 2) : [])
                let trailer = response.videos.results.length !== 0 ? response.videos.results.find((el) => el.type === "Trailer") : {};
                if (trailer) setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`)
                setSimilar(response.similar.results.length !== 0 ? response.similar.results.slice(0, 8) : [])
                setExpand(true)
                document.getElementById(movie.id).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            })
        }
    }

    function returnClicked() {
        setExpand(false)
        setTimeout(() => {
            document.getElementById(movie.id).scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            });
        }, 200)
    }

    function similarMovieSearch(e, title) {
        e.preventDefault()
        setNowPlaying(false)
        setPageNo(1)
        setMovieSearchName(title)

    }

    return (
        <div className={`card${expand === true ? "-expanded" : ""}`} ref={lastMovieRef} onClick={movieClicked}
             id={movie.id}>
            {expand === true && <button className="return" onClick={returnClicked}>x</button>}
            <div className={`movie-preview-wrapper${expand === true ? "-expanded" : ""}`}>
                <div className={`poster-wrapper${expand === true ? "-expanded" : ""}`}>
                    {
                        movie.poster_path ?
                            <img className="poster" width="300" height="400" loading="lazy" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                 alt={`${movie.title} Poster`}/> :
                            <div className="poster-filler"/>
                    }
                    <span
                        className={`vote-average${expand === true ? "-expanded" : ""}`}>{movie.vote_average ? movie.vote_average : " - "}</span>
                </div>
                <h3 className="movie-title">{movie.title}</h3>
                <div className={`movie-basic-info${expand === true ? "-expanded" : ""}`}>
                    <h4 className="movie-release">Released: {movie.release_date ? movie.release_date.substring(0, 4) : "-"}</h4>
                    <div className="movie-genres">Genres:
                        {movie.genre_ids.length > 0 && genres.length > 0 &&
                        movie.genre_ids.map((id, index) => {
                            let genre = genres.find(genre => genre.id === id)
                            if (index === movie.genre_ids.length - 1)
                                return <span> {genre.name}</span>
                            else
                                return <span> {genre.name},</span>

                        })}</div>
                    <div className={"movie-overview-container"}>
                        <p className="movie-overview">{movie.overview ? movie.overview : ""}</p>
                    </div>
                    {<button className={`view-more-btn`}
                             onClick={() => {
                                 setExpand(true)
                             }}>View More</button>}
                </div>
            </div>
            {expand &&
            <div className="movie-details">
                <iframe className="movie-trailer" title={`${movie.title} Trailer`} width="50%" height="400"
                        src={trailerUrl}>
                </iframe>
                <h5>Reviews</h5>
                {reviews !== [] && reviews.map(review =>
                    <div className="review-author">{review.author}:
                        <span className="review-content">{review.content}</span>
                    </div>
                )}
                <h5>Similar Titles</h5>
                <div className="similar-movies-grid">
                    {similar !== [] && similar.map(similar =>
                        <div className="similar-grid-item" onClick={(e) => similarMovieSearch(e, similar.title)}>
                            {
                                similar.poster_path ?
                                    <img className="similar-movie-poster"
                                         src={`https://image.tmdb.org/t/p/w200/${similar.poster_path}`}
                                         alt={`${similar.title} Poster`}/> :
                                    <div className="similar-movie-poster-filler"/>
                            }
                            <p className="similar-movie-title">{similar.title} </p>
                        </div>
                    )}
                </div>
            </div>
            }
        </div>

    );
})

export default Movie;