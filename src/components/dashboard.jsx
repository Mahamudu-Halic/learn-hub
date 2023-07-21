import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth, db } from "../firebase"
import { signOut } from "firebase/auth"
import { Context } from "./context-provider"
import { doc, getDoc } from 'firebase/firestore'
const dashboard = [
    {
        id: 1,
        url: '',
        title: 'Overview',
        icon: 'fa-solid fa-house'
    },
    {
        id: 2,
        url: '/courses',
        title: 'Courses',
        icon: 'fa-solid fa-book'

    },
    // {
    //     id: 3,
    //     url: '/favorite',
    //     title: 'Favorite',
    //     icon: "fa-solid fa-star"
    // },
    // {
    //     id: 4,
    //     url: '/add-new-course',
    //     title: 'Add New Course',
    //     icon: 'fa-solid fa-plus'
    // },
    {
        id: 5,
        url: '/upload-material',
        title: 'Upload Material',
        // icon: 'fa-solid fa-file-arrow-up'
        icon: 'fa-solid fa-upload'
    },
    {
        id: 6,
        url: '/settings',
        title: 'Settings',
        icon: 'fa-solid fa-gear'
    },
]

const Dashboard = () => {
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const {currentUser, user, setUser} = useContext(Context)
    // console.log('dashboard', currentUser)
    const handleClick = e => {
        setActive(!active)
    }

    const logout = () => {
        signOut(auth)
        navigate('/')
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUser(docSnap.data())
                } else {
                console.log("No such document!");
                }
            } catch (error) {
                console.log('dashboard getuser', error)
            }
        }

        return (() => {getUser()})
    }, [])

    return(
        <>
        <div className="navbar">
            <i className="hamburger fa-solid fa-bars" onClick={handleClick}></i>
            <h3 className="title">Learn<span>Hub</span> <i className="fa-solid fa-book-open"></i></h3>
        </div>
        <div className={`dashboard ${active && 'active'}`}>
            <div className="dash-head">
                <h1 className="title">Learn<span>Hub</span></h1>
                <i className="fa-solid fa-close" onClick={handleClick}></i>
            </div>
            {
                dashboard.map(({id, url, title, icon}) => {
                    return(
                        <Link
                        key={id}
                        to={url}
                        className={`${window.location.pathname === `/learn-hub${url}` ? 'active' : ''}`}
                        onClick={() => handleClick(url)}
                        >
                            <i className={icon}></i>
                            {title}
                        </Link>
                    )
                })
            }

            <div className="bottom">
                <span className="user">
                    <i className="fa-solid fa-user"></i>
                    {user.displayName}
                </span>
                <button className="logout"onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    logout
                </button>
                <p>Halic&copy;2023</p>
            </div>

        </div>
        </>
    )
}

export default Dashboard