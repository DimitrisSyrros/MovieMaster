import React, {useContext} from "react";
import "../styles/navbar.scss";
import {StoreContext} from "../utils/store";
import {Link} from "react-router-dom";

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

    function FocusOnSearch(e) {
        e.preventDefault()
        document.getElementById("movie-search-bar").scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
        document.getElementById("movie-search-bar").focus();
    }

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="logo">
                    <p className="nav-link">
                        <img className="movie-master-logo" src={process.env.PUBLIC_URL + '/logo192.png'}
                             alt="MovieMaster Logo" height='60' width='60'/>
                        <strong className='link-text'>MOVIE<strong className="color-text">MASTER</strong></strong>
                    </p>
                </li>

                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <img className='nav-icon' src={process.env.PUBLIC_URL + '/popcorn.png'}
                             alt="Now Playing Icon"
                             height='50' width='50'/>
                        <button className="link-text"
                                onClick={(e)=>{fetchPlayNow(e)}}
                                disabled={nowPlaying}
                        >Movies Playing Now
                        </button>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/watchList" className="nav-link">
                        <img className='nav-icon' src={process.env.PUBLIC_URL + '/movie-frame.png'}
                             alt="Watch-List Icon" height='50' width='50'/>
                        <span className="link-text">Your WatchList</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link" onClick={(e) => {
                        FocusOnSearch(e)
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