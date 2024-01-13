import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../screens/LoginScreen/firebase"
import { useDispatch } from "react-redux"
import { setUserFirebase } from '../redux/actions'


export default function useAuth() {
    const  [user, setUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(  setUserFirebase(user)  )
                setUser(user)
            } else {
                setUser(null)
            }
        })
        return unsub
    },[])
    return { user }
}