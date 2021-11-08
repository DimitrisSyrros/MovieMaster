import './App.scss';
import './styles/_global.scss';
import MovieSearch from "./components/MovieSearch";
import {useContext, useEffect, useRef, useCallback} from "react";
import {StoreContext} from "./utils/store";
import {getGenres} from "./utils/apicalls";
import MovieList from "./components/MovieList";
import {getCachedGenres, setCachedGenres} from "./utils/genres-cache";
import useMovieFetch from "./useMovieFetch";

function App() {
    const {
        setGenres, pageNo, setPageNo,
        loading, setLoading,
        nowPlaying, setNowPlaying, totalPages,
        setMovieSearchName
    } = useContext(StoreContext);
    const containerRef = useRef(null)

    //1st fill of movies in theaters
    useEffect(() => {
        setLoading(true)
        const cachedGenres = getCachedGenres();
        if (cachedGenres) {
            setGenres(cachedGenres)
        } else {
            getGenres().then(response => {
                setCachedGenres(response)
                setGenres(response.genres)
            }).catch(e => console.warn("Error trying to fetch genres", {error: e}))
        }
    }, [])

    useMovieFetch();

    //find out when you reach the final movie of the page and change page
    const observer = useRef();
    const lastMovieRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && pageNo < totalPages) {
                setPageNo(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading])


    //fetch movies in theaters triggered by pressing the tab
    function handleClick(e) {
        e.preventDefault()
        if (nowPlaying === false) {
            setNowPlaying(true)
            setMovieSearchName("")
            setPageNo(1)
        }
    }

    return (
        <div className="App">
            <div className="app-layout">
                <h1>MOVIE<span className="color-text">MASTER</span></h1>
                <div className="app-header">
                    <button className="playing-now-btn"
                            onClick={e => handleClick(e)}
                            disabled={nowPlaying}
                    >Playing Now
                    </button>
                    <MovieSearch/>
                </div>
                <MovieList ref={lastMovieRef}/>
                <div className="box" ref={containerRef}>
                    {loading && <span>Loading...</span>}
                </div>
            </div>
        </div>
    );
}

export default App;
