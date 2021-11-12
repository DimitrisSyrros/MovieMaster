import React, {useContext} from "react";
import Movie from "./Movie";
import {StoreContext} from "../utils/store";
import Navbar from "./Navbar";
import '../App.scss';
import '../styles/_global.scss';
import MovieSearch from "./MovieSearch";

const WatchList = () => {
    const {watchList} = useContext(StoreContext);
    return (
        <div>
            <Navbar/>
            <div className='app-layout'>
                <div className="app-header">
                    <MovieSearch/>
                </div>
                <section className="basic-grid">
                    {
                        watchList.length > 0 &&
                        watchList.map((movie, index) => {
                            return <Movie key={`${movie.id}-${movie.name}`} movie={movie}/>
                        })
                    }
                </section>
            </div>
        </div>
    );
}

export default WatchList;