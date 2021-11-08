export const getCachedGenres = () => {
    try{
        const genres = sessionStorage.getItem('genres')
        return JSON.parse(genres)
    }catch (e) {
        console.warn('Failed to fetch genres from cache', {error: e})
    }
}

export const setCachedGenres = (response) => {
    try{
        sessionStorage.setItem('genres', JSON.stringify(response.genres));
    }catch (e) {
        console.warn('Failed to save genres to cache', {error: e})
    }
}