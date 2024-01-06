export const NEW_PLACE = "NEW_PLACE";


export const savePlace = objectPlace => dispatch => {
    dispatch({
        type: NEW_PLACE,
        payload: objectPlace
    })
}