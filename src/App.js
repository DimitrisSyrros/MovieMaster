import './App.scss';
import './styles/_global.scss';
import MovieSearch from "./components/MovieSearch";
import {useContext, useEffect, useRef, useCallback} from "react";
import {StoreContext} from "./utils/store";
import {getGenres} from "./utils/apicalls";
import MovieList from "./components/MovieList";
import {getCachedGenres, setCachedGenres} from "./utils/genres-cache";
import useMovieFetch from "./useMovieFetch";
import Navbar from "./components/Navbar";

function App() {
    const {
        setGenres, pageNo, setPageNo,
        loading, setLoading, totalPages
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


    return (
        <div className="App">
            <Navbar/>
            <div className="app-layout">
                <div className="app-header">
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
