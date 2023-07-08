import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export const Context = createContext()

const ContextProvider =({children}) => {
    const [currentUser, setCurrentUser] = useState()
    const [user, setUser] = useState('')

    useEffect(() => {
        
        const unsub = onAuthStateChanged(auth, user => {
            try {
                setCurrentUser(user)
            } catch (error) {
                
            }
        })

        return(
        () => {
            unsub()
        }
        )
    }, [])

    //course list
    const courseList = [
        //college of sciene
        [
            {
                id: 0,
                course: 'computer science'
            },
            {
                id: 1,
                course: 'mathematics'
            },
            {
                id: 3,
                course: 'chemistry'
            },
            {
                id: 4,
                course: 'physics'
            },
            {
                id: 5,
                course: 'theoritical and applied biology'
            },
        ],

        //college of engineering
        [
            {
                id: 6,
                course: 'electrical engineering'
            },
            {
                id: 6,
                course: 'mechanical engineering'
            },
            {
                id: 6,
                course: 'telecommunication engineering'
            },
            {
                id: 6,
                course: 'material engineering'
            },
            {
                id: 6,
                course: 'computer engineering'
            }
        ],

        //college of humanity and social sciences
        [
            {
                id: 7,
                course: 'commercial law'
            },
            {
                id: 6,
                course: 'private law'
            },
            {
                id: 6,
                course: 'public law'
            },
            {
                id: 6,
                course: 'economics'
            },
            {
                id: 6,
                course: 'services management'
            },
            {
                id: 6,
                course: 'accounting and finance'
            }
        ],

        //college of art and built environment
        [
            {
                id: 6,
                course: 'architecture'
            },
            {
                id: 6,
                course: 'industrial art'
            },
            {
                id: 6,
                course: 'painting and sculpture'
            },
            {
                id: 6,
                course: 'planning'
            },
            {
                id: 6,
                course: 'communication design'
            }
        ],

        //college of health science
        [
            {
                id: 6,
                course: 'anatomy'
            },
            {
                id: 6,
                course: 'herbal medicine'
            },
            {
                id: 6,
                course: 'nursing'
            },
            {
                id: 6,
                course: 'medicine'
            },
            {
                id: 6,
                course: 'pharmaceutics'
            }
        ],

        //college of agriculture and natural resources
        [
            {
                id: 6,
                course: 'animal science'
            },
            {
                id: 6,
                course: 'crop science'
            },
            {
                id: 6,
                course: 'agroforestry'
            },
            {
                id: 6,
                course: 'social forestery'
            },
            {
                id: 6,
                course: 'soil science'
            }
        ]
    ]

    const contextValues = {
        currentUser,
        setUser,
        user,
        courseList
    }

    return(
        <Context.Provider value={contextValues}>
            {children}
        </Context.Provider>
    )

}

export default ContextProvider