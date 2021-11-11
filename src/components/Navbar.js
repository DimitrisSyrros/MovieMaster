import React, {useContext} from "react";
import "../styles/navbar.scss";
import {StoreContext} from "../utils/store";

const Navbar = () => {
    const {
        setPageNo,
        nowPlaying, setNowPlaying,
        setMovieSearchName
    } = useContext(StoreContext);

    //fetch movies in theaters triggered by pressing the tab
    function fetchPlayNow(e) {
        e.preventDefault()
        if (nowPlaying === false) {
            setNowPlaying(true)
            setMovieSearchName("")
            setPageNo(1)
        }
    }

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="logo">
                    <a href="#" className="nav-link">
                        <img className="movie-master-logo" src={process.env.PUBLIC_URL + '/logo192.png'}
                             alt="MovieMaster Logo" height='60' width='60'/>
                        <span className='link-text'>MOVIE<strong className="color-text">MASTER</strong></span>
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <img className='nav-icon' src={process.env.PUBLIC_URL + '/popcorn.png'}
                             onClick={event => fetchPlayNow(event)} alt="Now Playing Icon"
                             height='50' width='50'/>
                        <button className="link-text"
                                onClick={e => fetchPlayNow(e)}
                                disabled={nowPlaying}
                        >Movies Playing Now
                        </button>
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <img className='nav-icon' src={process.env.PUBLIC_URL + '/movie-frame.png'}
                             alt="Watch-List Icon" height='50' width='50'/>
                        <span className="link-text">Your WatchList(Under Construction)</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link" onClick={(e) => {
                        document.getElementById("movie-search-bar").scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest"
                        });
                    }}>
                        <img className='nav-icon' src={process.env.PUBLIC_URL + '/search.png'} alt="Search Icon"
                             height='50' width='50'/>
                        <span className="link-text">Search</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;