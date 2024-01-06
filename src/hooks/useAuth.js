import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../screens/LoginScreen/firebase"


export default function useAuth() {
    const  [user, setUser] = useState(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            console.log(user)
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
        return unsub
    },[])
    return { user }
}