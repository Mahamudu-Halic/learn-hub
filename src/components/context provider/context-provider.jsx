import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export const Context = createContext()

const ContextProvider =({children}) => {
    const [courses, setCourses] = useState([{
        title: 'comp science'
    }])
    const [newCourse, setNewCourses] = useState()

    const [currentUser, setCurrentUser] = useState()
    const [user, setUser] = useState('')

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })

        return(
        () => {
            unsub()
        }
        )
    }, [])

    const contextValues = {
        courses,
        setCourses,
        newCourse,
        setNewCourses,
        currentUser,
        setUser,
        user
    }

    return(
        <Context.Provider value={contextValues}>
            {children}
        </Context.Provider>
    )

}

export default ContextProvider