import React, {useState} from "react";

export const StoreContext = React.createContext(null)

const StoreProvider = ({children}) => {
    const [movies, setMovies] = useState([]);
    const [nowPlaying, setNowPlaying] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    const [movieSearchName, setMovieSearchName] = useState("")
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(false)
    const store = {
        movies, setMovies,
        nowPlaying, setNowPlaying,
        pageNo, setPageNo,
        totalPages, setTotalPages,
        movieSearchName, setMovieSearchName,
        genres, setGenres,
        loading, setLoading
    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default StoreProvider;