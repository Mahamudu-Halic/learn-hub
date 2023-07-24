import { createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Context = createContext()

const ContextProvider =({children}) => {
    const [currentUser, setCurrentUser] = useState()
    const [user, setUser] = useState('')
    const navigate = useNavigate()

    //google authentication
    const handleGoogleAuth = account => {
        signInWithPopup(auth, provider)
        .then( async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            account === 'register' && await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                description: '',
                schoolEmail: '',
                program: '',
                phoneNumber: '',
                level: ''
            })
            
            navigate('/')
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

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
                course: 'logistics and supply chain management'
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
        courseList,
        handleGoogleAuth
    }

    return(
        <Context.Provider value={contextValues}>
            {children}
        </Context.Provider>
    )

}

export default ContextProvider