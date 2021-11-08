import React, {useState} from "react";

const MovieBasicInfo = (props) => {
    return (
        <div className={`movie-basic-info${props.expand === true ? "-expanded" : ""}`}>
            <h3 className="movie-title">{props.movie.title}</h3>
            <h4 className="movie-release">Released: {props.movie.release_date ? props.movie.release_date.substring(0, 4) : "-"}</h4>
            <div className="movie-genres">Genres:
                {props.movie.genre_ids.length > 0 && props.genres.length > 0 &&
                props.movie.genre_ids.map((id, index) => {
                    let genre = props.genres.find(genre => genre.id === id)
                    if (index === props.movie.genre_ids.length - 1)
                        return <span> {genre.name}</span>
                    else
                        return <span> {genre.name},</span>

                })}</div>
            <div className={"movie-overview-container"}>
                <p className="movie-overview">{props.movie.overview ? props.movie.overview : ""}</p>
            </div>
            {<button className={`view-more-btn`}
                     onClick={() => {
                         props.setExpand(true)
                     }}>View More</button>}
        </div>
    );
}
export default MovieBasicInfo