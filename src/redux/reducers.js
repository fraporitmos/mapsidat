import { NEW_PLACE, SET_USER } from "./actions";

const initialState = {
    places: [],
    user_firebase: null
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
            break;
       
        case SET_USER:
            return {
                ...state,
                user_firebase: action.payload
            }
            break;
        default:
            return state
    }
}

export default placesReducer