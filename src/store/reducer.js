const initialState = {
    favorites: JSON.parse(localStorage.getItem('Favorites')) || [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_FAV':
            let newFav = state.favorites.concat([action.id]);
            localStorage.setItem('Favorites', JSON.stringify(newFav));
            return {
                ...state,
                favorites: newFav
            }
        case 'DEL_FAV':
            let updatedFav = state.favorites.filter(el=>el!==action.id);
            localStorage.setItem('Favorites', JSON.stringify(updatedFav));
            return {
                ...state,
                favorites: updatedFav,
            }
        default: 
            return state
    }
}

export default reducer;