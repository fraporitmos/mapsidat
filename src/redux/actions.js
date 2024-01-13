export const NEW_PLACE = "NEW_PLACE";

export const SET_USER = "SET_USER";

export const savePlace = objectPlace => dispatch => {
    dispatch({
        type: NEW_PLACE,
        payload: objectPlace
    })
}


export const setUserFirebase = objectUser => dispatch => {
    dispatch({
        type: SET_USER,
        payload: objectUser
    })
}