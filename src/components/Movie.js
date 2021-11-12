import React, {forwardRef, useState, useContext, useEffect} from "react";
import '../App.scss';
import '../styles/_global.scss';
import {getMovieDetails} from "../utils/apicalls";
import {StoreContext} from "../utils/store";

const Movie = forwardRef(({movie}, lastMovieRef) => {
    const [trailerUrl, setTrailerUrl] = useState("")
    const [similar, setSimilar] = useState([])
    const [expand, setExpand] = useState(false)
    const {
        genres, setNowPlaying,
        setMovieSearchName,
        setPageNo, watchList,
        setWatchList
    } = useContext(StoreContext);

    const [stored, setStored] = useState(watchList.find(o => o.id === movie.id) !== undefined);

    useEffect(()=>{
        localStorage.setItem('watchList', JSON.stringify(watchList));
    },[watchList])

    function addToWatchList() {
        if (watchList.length <= 20) {
            setWatchList(prevState => [...prevState, movie])
            setStored(true)
        }else {
            alert("Sorry you can only store up to 20 movies on your watchList remove one or clear the list.")
        }
    }

    function removeFromWatchList() {
        setWatchList(watchList.filter(item => item.id !== movie.id ))
        setStored(false)
    }

    function movieClicked() {
        if (expand === false) {
            getMovieDetails(movie.id).then((response) => {
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

    function whenTapped(e) {
        e.preventDefault();
        setExpand(true)
        document.getElementById(movie.id).scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }

    return (
        <div className={`card${expand === true ? "-expanded" : ""}`} ref={lastMovieRef}
             id={movie.id}>
            {expand === true && <button className="return" onClick={returnClicked}>x</button>}
            <div className={`movie-preview-wrapper${expand === true ? "-expanded" : ""}`}>
                <div className={`poster-wrapper${expand === true ? "-expanded" : ""}`} >
                    {
                        movie.poster_path ?
                            <img className="poster" width="300" height="400" loading="lazy"
                                 src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                 alt={`${movie.title} Poster`} onTouchEnd={(e)=> whenTapped(e)}/> :
                            <div className="poster-filler" onTouchEnd={(e)=> whenTapped(e)}/>
                    }
                    {
                        !stored && !expand &&
                        <img className="add-to-watchlist" src={process.env.PUBLIC_URL + '/plus.png'} loading="lazy" onClick={()=>addToWatchList()}
                             alt={`${movie.title} Add to watch list`} width="20" height="20"/>
                    }
                    {
                        stored && !expand &&
                        <img className="watchlist-added" src={process.env.PUBLIC_URL + '/check.png'} loading="lazy" onClick={()=>removeFromWatchList()}
                             alt={`${movie.title} Added to watch list`} width="20" height="20"/>
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
                                 movieClicked()
                                 setExpand(true)
                             }}>View More</button>}
                </div>
            </div>
            {expand &&
            <div className="movie-details">
                <iframe className="movie-trailer" title={`${movie.title} Trailer`} width="50%" height="400"
                        src={trailerUrl}>
                </iframe>
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