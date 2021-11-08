const apiKey =process.env.REACT_APP_MOVIEDB_API_KEY;

export function search(movieName, pageNo){
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=${pageNo}&include_adult=false`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw res
            }
        });
}

export function fetchNowPlaying(pageNo){
    return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNo}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw res
            }
        });
}

export async function getMovieDetails(id){
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=reviews,similar,videos`)
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw res
            }
        });
}

export async function getGenres(){
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw res
            }
        });
}