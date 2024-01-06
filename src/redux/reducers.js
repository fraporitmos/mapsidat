import { NEW_PLACE } from "./actions";

const initialState = {
    places: []
}

function placesReducer(state = initialState, action){
    switch(action.type){
        case NEW_PLACE:
            const arrayNewPlaces = state.places.filter(
                place => place.title !== action.payload.title
            )
            return {
                ...state,
                places: [...arrayNewPlaces, action.payload]
            }
        default:
            return state
    }
}

export default placesReducer