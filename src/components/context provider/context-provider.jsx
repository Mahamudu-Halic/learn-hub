import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

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
                course: 'computer science'
            },
            {
                course: 'mathematics'
            },
            {
                course: 'chemistry'
            },
            {
                course: 'physics'
            },
            {
                course: 'theoritical and applied biology'
            },
            {
                course: 'environmental science'
            },
        ],

        //college of engineering
        [
            {
                course: 'electrical engineering'
            },
            {
                course: 'mechanical engineering'
            },
            {
                course: 'telecommunication engineering'
            },
            {
                course: 'material engineering'
            },
            {
                course: 'computer engineering'
            },
            {
                course: 'aerospace engineering'
            }
        ],

        //college of humanity and social sciences
        [
            {
                course: 'commercial law'
            },
            {
                course: 'private law'
            },
            {
                course: 'public law'
            },
            {
                course: 'economics'
            },
            {
                course: 'services management'
            },
            {
                course: 'social work and sociology'
            },
            {
                course: 'accounting and finance'
            }
        ],

        //college of art and built environment
        [
            {
                course: 'architecture'
            },
            {
                course: 'industrial art'
            },
            {
                course: 'painting and sculpture'
            },
            {
                course: 'planning'
            },
            {
                course: 'communication design'
            }
        ],

        //college of health science
        [
            {
                course: 'anatomy'
            },
            {
                course: 'herbal medicine'
            },
            {
                course: 'nursing'
            },
            {
                course: 'medicine'
            },
            {
                course: 'pharmaceutics'
            }
        ],

        //college of agriculture and natural resources
        [
            {
                course: 'animal science'
            },
            {
                course: 'crop science'
            },
            {
                course: 'agroforestry'
            },
            {
                course: 'social forestery'
            },
            {
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