import {useContext, useEffect} from "react";
import {StoreContext} from "./utils/store";
import {fetchNowPlaying, search} from "./utils/apicalls";

export default function useMovieFetch() {
    const {
        movieSearchName, pageNo,
        setLoading, nowPlaying, setMovies, setTotalPages
    } = useContext(StoreContext)

    useEffect(() => {
        setMovies([])
    }, [movieSearchName])

    useEffect(() => {
        setLoading(true)
        if (nowPlaying === true || movieSearchName === "") {
            fetchNowPlaying(pageNo)
                .then((data) => {
                    setMovies(prevState => [...prevState, ...data.results])
                    setTotalPages(data.total_pages)
                    setLoading(false)
                }).catch(() => {
                alert("Something went wrong please try again! hook now")
            })
        } else if (nowPlaying === false && movieSearchName !== "") {

            search(movieSearchName, pageNo)
                .then((data) => {
                    setMovies(prevState => [...prevState, ...data.results])
                    setTotalPages(data.total_pages)
                    setLoading(false)
                }).catch(() => {
                console.warn("Something went wrong please try again! hook search", movieSearchName)
            })
        }

    }, [movieSearchName, pageNo])
}